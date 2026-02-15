import { render, screen } from '@testing-library/react';
import CartTotals from '../../components/CartTotals';
import { useSelector } from 'react-redux';
import { formatPrice } from '../../utils';

// mock redux
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

// mock formatPrice so output is predictable
vi.mock('../../utils', () => ({
  formatPrice: vi.fn(),
}));

describe('CartTotals component', () => {
  beforeEach(() => {
    (useSelector as unknown as vi.Mock).mockImplementation((selector) =>
      selector({
        cartState: {
          cartTotal: 1000,
          shipping: 100,
          tax: 50,
          orderTotal: 1150,
        },
      })
    );

    (formatPrice as vi.Mock).mockImplementation((value: number) => `₹${value}`);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders all cart totals correctly', () => {
    render(<CartTotals />);

    // labels
    expect(screen.getByText('Subtotal')).toBeInTheDocument();
    expect(screen.getByText('Shipping')).toBeInTheDocument();
    expect(screen.getByText('Tax')).toBeInTheDocument();
    expect(screen.getByText('Order Total')).toBeInTheDocument();

    // values
    expect(screen.getByText('₹1000')).toBeInTheDocument();
    expect(screen.getByText('₹100')).toBeInTheDocument();
    expect(screen.getByText('₹50')).toBeInTheDocument();
    expect(screen.getByText('₹1150')).toBeInTheDocument();
  });

  it('calls formatPrice with correct values', () => {
    render(<CartTotals />);

    expect(formatPrice).toHaveBeenCalledWith(1000);
    expect(formatPrice).toHaveBeenCalledWith(100);
    expect(formatPrice).toHaveBeenCalledWith(50);
    expect(formatPrice).toHaveBeenCalledWith(1150);
  });
});
