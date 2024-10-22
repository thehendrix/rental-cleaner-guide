import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/about/page';

describe('AboutPage', () => {
  it('should have Home Page text', () => {
    render(<AboutPage />);

    const myElement = screen.getByText('About Page!!!!!');

    expect(myElement).toBeInTheDocument(myElement);
  });
});
