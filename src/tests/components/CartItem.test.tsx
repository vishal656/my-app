import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '../../components/CartItem';
import { useDispatch } from 'react-redux';
import { removeItem, editItem } from '../../features/cart/cartSlice';

// mock redux
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

// mock utils
vi.mock('../../utils', () => ({
  formatPrice: vi.fn(() => '$100.00'),
  generateAmountOptions: vi.fn(() => [
    <option key="1" value="1">1</option>,
    <option key="2" value="2">2</option>,
  ]),
}));

describe('CartItem component', () => {
  const dispatchMock = vi.fn();

  const cartItem = {
    cartID: 'abc123',
    title: 'test product',
    price: 10000,
    image: 'test.jpg',
    amount: 1,
    company: 'nike',
    productColor: '#000',
  };

  beforeEach(() => {
    (useDispatch as unknown as vi.Mock).mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders cart item details', () => {
    render(<CartItem cartItem={cartItem} />);

    expect(screen.getByText('test product')).toBeInTheDocument();
    expect(screen.getByText('nike')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByAltText('test product')).toBeInTheDocument();
  });

  it('dispatches removeItem when remove button is clicked', () => {
    render(<CartItem cartItem={cartItem} />);

    fireEvent.click(screen.getByText(/remove/i));

    expect(dispatchMock).toHaveBeenCalledWith(
      removeItem({ cartID: 'abc123' })
    );
  });

  it('dispatches editItem when quantity is changed', () => {
    render(<CartItem cartItem={cartItem} />);

    fireEvent.change(screen.getByLabelText(/quantity/i), {
      target: { value: '2' },
    });

    expect(dispatchMock).toHaveBeenCalledWith(
      editItem({ cartID: 'abc123', amount: 2 })
    );
  });
});
