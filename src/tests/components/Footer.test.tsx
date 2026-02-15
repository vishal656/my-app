import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer component', () => {
  it('renders brand name and logo', () => {
    render(<Footer />);

    expect(
      screen.getByText('VishalMegaMart')
    ).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<Footer />);

    expect(
      screen.getByText(/lorem ipsum dolor sit amet/i)
    ).toBeInTheDocument();
  });

  it('renders About Us section with links', () => {
    render(<Footer />);

    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Careers')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('renders Customer Care section with links', () => {
    render(<Footer />);

    expect(screen.getByText('Customer Care')).toBeInTheDocument();
    expect(screen.getByText('Help Center')).toBeInTheDocument();
    expect(screen.getByText('Returns & Refunds')).toBeInTheDocument();
  });

  it('renders Contact Us section with contact details', () => {
    render(<Footer />);

    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(
      screen.getByText(/washington square south/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/uilib.help@gmail.com/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/\+1 1123 456 780/i)
    ).toBeInTheDocument();
  });
});
