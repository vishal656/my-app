import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Hero from '../../components/Hero';

/* ---------------- MOCK IMAGES ---------------- */
vi.mock('../../assets/hero1.webp', () => ({ default: 'hero1.webp' }));
vi.mock('../../assets/hero2.webp', () => ({ default: 'hero2.webp' }));
vi.mock('../../assets/hero3.webp', () => ({ default: 'hero3.webp' }));
vi.mock('../../assets/hero4.webp', () => ({ default: 'hero4.webp' }));

const renderHero = () =>
  render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>,
  );

describe('Hero component', () => {
  it('renders main heading and description', () => {
    renderHero();

    expect(
      screen.getByRole('heading', {
        name: /we are changing the way people shop/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/lorem ipsum, dolor sit amet consectetur adipisicing elit/i),
    ).toBeInTheDocument();
  });

  it('renders Our Products button with correct link', () => {
    renderHero();

    const link = screen.getByRole('link', { name: /our products/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/products');
  });

  it('renders carousel images with alt text', () => {
    renderHero();

    const images = screen.getAllByAltText('hero');

    expect(images).toHaveLength(4);
  });
});
