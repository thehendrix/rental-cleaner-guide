import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('should have Home Page text', () => {
    render(<HomePage />);

    const myElement = screen.getByText('Home Page!!!!!');

    expect(myElement).toBeInTheDocument(myElement);
  });
});
