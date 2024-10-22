import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PropertyPage from '@/app/properties/[propertyId]/page';
import { PropertyProvider } from '@/context/PropertyContext';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/properties/1',
    query: { propertyId: '1' },
  })),
  usePathname: jest.fn(() => '/properties/1'),
}));

let mockParams;
let mockProperty1;
let mockProperty2;

describe('PropertyPage', () => {
  beforeEach(() => {
    mockParams = { propertyId: '1' };
    mockProperty1 = [
      {
        id: '1',
        name: 'mockName',
        spaces: [
          {
            name: 'mockName',
            imagePath: 'mockImagePath'
          }
        ]
      }
    ];
    mockProperty2 = [
      {
        id: '1',
        name: 'mockName',
        address: {
          street: '440 S Anaheim Blvd',
          unitNumber: '10',
          city: 'Anaheim',
          state: 'CA',
          zipCode: '92805',
          country: 'United States'
        },
        spaces: []
      }
    ];
  });

  it('should show no property exists', () => {
    const mockProperties = [];

    render(
      <PropertyProvider properties={mockProperties}>
        <PropertyPage params={mockParams}/>
      </PropertyProvider>
    );

    const displayMessage = screen.getByText('*No Property Exists*');
    expect(displayMessage).toBeInTheDocument();
  });

  it('should have no image of space', () => {
    const mockProperties = [
      {
        id: '1',
        name: 'mockName',
        spaces: []
      }
    ];

    render(
      <PropertyProvider properties={mockProperties}>
        <PropertyPage params={mockParams}/>
      </PropertyProvider>
    );

    const displayMessage1 = screen.getByText('*No Property Address*');
    const displayMessage2 = screen.getByText('*No Image of Space*');
    expect(displayMessage1).toBeInTheDocument();
    expect(displayMessage2).toBeInTheDocument();
  });

  it('should show address with unit number', () => {
    render(
      <PropertyProvider properties={mockProperty2}>
        <PropertyPage params={mockParams}/>
      </PropertyProvider>
    );

    const displayMessage1 = screen.getByText('mockName');
    expect(displayMessage1).toBeInTheDocument();
  });

  it('should show address without unit number', () => {
    mockProperty2[0].address.unitNumber = '';

    render(
      <PropertyProvider properties={mockProperty2}>
        <PropertyPage params={mockParams}/>
      </PropertyProvider>
    );

    const displayMessage1 = screen.getByText('mockName');
    expect(displayMessage1).toBeInTheDocument();
  });

  it('should show image, link, and alt', () => {
    render(
      <PropertyProvider properties={mockProperty1}>
        <PropertyPage params={mockParams}/>
      </PropertyProvider>
    );

    const displayMessage = screen.getByText('View All Spaces');
    expect(displayMessage).toBeInTheDocument();
  });

  it('should show image, link, and no alt', () => {
    mockProperty1[0].spaces[0].name = '';

    render(
      <PropertyProvider properties={mockProperty1}>
        <PropertyPage params={mockParams}/>
      </PropertyProvider>
    );
    const displayMessage = screen.getByText('View All Spaces');
    expect(displayMessage).toBeInTheDocument();
  });

  it('should trigger the router push when button is clicked', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(
      <PropertyProvider properties={mockProperty1}>
        <PropertyPage params={mockParams}/>
      </PropertyProvider>
    );

    const button = screen.getByText('View All Spaces');

    await userEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith('/properties/1/spaces');
    expect(mockPush).toHaveBeenCalledTimes(1);
  });
});
