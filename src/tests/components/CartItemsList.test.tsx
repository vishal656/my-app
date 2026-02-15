import { render, screen } from '@testing-library/react';
import CartItemsList from '../../components/CartItemsList';
import { useSelector } from 'react-redux';

// mock CartItem so we only test the list
vi.mock('../../components/CartItem', () => ({
  default: ({ cartItem }: any) => (
    <div data-testid="cart-item">{cartItem.title}</div>
  ),
}));

// mock redux
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

describe('CartItemsList component', () => {
  const mockCartItems = [
    {
      cartID: '1',
      title: 'Product One',
    },
    {
      cartID: '2',
      title: 'Product Two',
    },
  ];

  beforeEach(() => {
    (useSelector as unknown as vi.Mock).mockImplementation((selector) =>
      selector({
        cartState: {
          cartItems: mockCartItems,
        },
      })
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders a CartItem for each cart item', () => {
    render(<CartItemsList />);

    const items = screen.getAllByTestId('cart-item');
    expect(items).toHaveLength(2);

    expect(screen.getByText('Product One')).toBeInTheDocument();
    expect(screen.getByText('Product Two')).toBeInTheDocument();
  });
});
