import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PropertyPage from '@/app/properties/[propertyId]/page';
import { describe } from 'node:test';
import { PropertyProvider } from '@/context/PropertyContext';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/properties/1',
    query: { propertyId: '1' },
  })),
  usePathname: jest.fn(() => '/properties/1'),
}));

const mockParams = { propertyId: '1' };
const mockPropertiesWithSpaces = [
  {
    id: '1',
    name: 'mockName',
    spaces: [
      {
        'name': 'mockName',
        'imagePath': 'mockImagePath'
      }
    ]
  }
];

describe('PropertyPage', () => {
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
    const mockProperties = [
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

    render(
      <PropertyProvider properties={mockProperties}>
        <PropertyPage params={mockParams}/>
      </PropertyProvider>
    );

    const displayMessage1 = screen.getByText('mockName');
    expect(displayMessage1).toBeInTheDocument();
  });

  it('should show address without unit number', () => {
    const mockProperties = [
      {
        id: '1',
        name: 'mockName',
        address: {
          street: '440 S Anaheim Blvd',
          unitNumber: '',
          city: 'Anaheim',
          state: 'CA',
          zipCode: '92805',
          country: 'United States'
        },
        spaces: []
      }
    ];

    render(
      <PropertyProvider properties={mockProperties}>
        <PropertyPage params={mockParams}/>
      </PropertyProvider>
    );

    const displayMessage1 = screen.getByText('mockName');
    expect(displayMessage1).toBeInTheDocument();
  });

  it('should show image, alt and link', () => {
    render(
      <PropertyProvider properties={mockPropertiesWithSpaces}>
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
      <PropertyProvider properties={mockPropertiesWithSpaces}>
        <PropertyPage params={mockParams}/>
      </PropertyProvider>
    );

    const button = screen.getByText('View All Spaces');

    await userEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith('/properties/1/spaces');
    expect(mockPush).toHaveBeenCalledTimes(1);
  });
});
