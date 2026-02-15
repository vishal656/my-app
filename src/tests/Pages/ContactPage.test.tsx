import { render, screen, within } from '@testing-library/react';
import ContactPage from '../../pages/ContactPage';

// Mock ContactForm so we don't test its internals here
vi.mock('../../components/ContactForm', () => ({
  default: () => (
    <div data-testid="contact-form">Contact Form Component</div>
  ),
}));

describe('ContactPage – 100% coverage', () => {
  beforeEach(() => {
    render(<ContactPage />);
  });

  it('renders page title', () => {
    expect(
      screen.getByRole('heading', { name: /contact us/i })
    ).toBeInTheDocument();
  });

  it('renders Google Map iframe', () => {
    const iframe = screen.getByTitle('vishal-map');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('loading', 'lazy');
  });

  it('renders London store details', () => {
    const londonSection = screen
      .getByText('Store in London')
      .closest('div')!;

    expect(
      within(londonSection).getByText(/1418 River Drive/i)
    ).toBeInTheDocument();

    expect(
      within(londonSection).getByText(/United Kingdom/i)
    ).toBeInTheDocument();

    expect(
      within(londonSection).getByText(/admin@dummymail.com/i)
    ).toBeInTheDocument();

    expect(
      within(londonSection).getByText(/\+44 20 7123 4567/i)
    ).toBeInTheDocument();
  });

  it('renders India store details', () => {
    const indiaSection = screen
      .getByText('Store in India')
      .closest('div')!;

    expect(
      within(indiaSection).getByText(/Bandra Reclamation Rd/i)
    ).toBeInTheDocument();

    expect(
      within(indiaSection).getByText(/Maharashtra/i)
    ).toBeInTheDocument();

    expect(
      within(indiaSection).getByText(/contact@dummymail.com/i)
    ).toBeInTheDocument();

    expect(
      within(indiaSection).getByText(/\+44 20 7123 4567/i)
    ).toBeInTheDocument();
  });

  it('renders ContactForm component', () => {
    expect(
      screen.getByTestId('contact-form')
    ).toBeInTheDocument();
  });
});