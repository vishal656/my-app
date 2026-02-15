import { render, screen } from '@testing-library/react';
import Wrapper, { serviceData } from '../../components/Wrapper';

describe('Wrapper component', () => {
  it('renders all service cards', () => {
    render(<Wrapper />);

    // number of cards
    const titles = serviceData.map(item => item.title);
    titles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders all subtitles', () => {
    render(<Wrapper />);

    serviceData.forEach(item => {
      expect(
        screen.getAllByText(item.subtitle).length
      ).toBeGreaterThan(0);
    });
  });

  it('renders correct number of service sections', () => {
    const { container } = render(<Wrapper />);

    const cards = container.querySelectorAll('.shadow-md');
    expect(cards.length).toBe(serviceData.length);
  });

  it('applies correct background classes from serviceData', () => {
    const { container } = render(<Wrapper />);

    serviceData.forEach(item => {
      const card = container.querySelector(`.${item.bg}`);
      expect(card).toBeTruthy();
    });
  });
});
