import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import HomeLayout from '../../pages/HomeLayout';

/* =========================
   MOCK react-router-dom
========================= */
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet">Outlet Content</div>,
    useNavigation: vi.fn(),
  };
});

/* =========================
   MOCK COMPONENTS
========================= */
vi.mock('../../components/Header', () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock('../../components/Navbar', () => ({
  default: () => <div data-testid="navbar">Navbar</div>,
}));

vi.mock('../../components/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

vi.mock('../../components/Loading', () => ({
  default: () => <div data-testid="loading">Loading...</div>,
}));

describe('HomeLayout – 100% coverage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders Header, Navbar, Outlet, and Footer when not loading', async () => {
    const { useNavigation } = await import('react-router-dom');

    (useNavigation as any).mockReturnValue({
      state: 'idle',
    });

    render(<HomeLayout />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();

    expect(screen.getByTestId('outlet')).toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('renders Loading component when navigation state is loading', async () => {
    const { useNavigation } = await import('react-router-dom');

    (useNavigation as any).mockReturnValue({
      state: 'loading',
    });

    render(<HomeLayout />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.queryByTestId('outlet')).not.toBeInTheDocument();
  });
});
