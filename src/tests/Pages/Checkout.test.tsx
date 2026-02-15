import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import CheckoutForm from '../../components/CheckoutForm';

/* ---------------- submit mock ---------------- */

const submitSpy = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useSubmit: () => submitSpy,
  };
});

/* ---------------- helpers ---------------- */

const mockScriptLoad = (success = true) => {
  vi.spyOn(document, 'createElement').mockImplementation((tag: any) => {
    const el = document.createElementNS(
      'http://www.w3.org/1999/xhtml',
      tag,
    ) as any;

    if (tag === 'script') {
      setTimeout(() => {
        success ? el.onload?.() : el.onerror?.();
      }, 0);
    }
    return el;
  });
};

const renderForm = () => {
  const router = createMemoryRouter(
    [{ path: '/', element: <CheckoutForm /> }],
    { initialEntries: ['/'] },
  );

  render(<RouterProvider router={router} />);
};

/* ---------------- tests ---------------- */

describe('CheckoutForm – coverage booster tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    submitSpy.mockClear();
  });

  it('loads Razorpay script and opens checkout', async () => {
    const openSpy = vi.fn();

    (window as any).Razorpay = vi.fn().mockImplementation(function Razorpay() {
      this.open = openSpy;
    });

    mockScriptLoad(true);
    renderForm();

    fireEvent.click(screen.getByRole('button', { name: /pay now/i }));

    await waitFor(() => {
      expect(openSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('alerts when Razorpay SDK fails to load', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    mockScriptLoad(false);
    renderForm();

    fireEvent.click(screen.getByRole('button', { name: /pay now/i }));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Razorpay SDK failed to load',
      );
    });
  });

  it('handler submits form with payment id', async () => {
    let handlerFn: any;

    (window as any).Razorpay = vi.fn().mockImplementation(function Razorpay(options) {
      handlerFn = options.handler;
      this.open = vi.fn();
    });

    mockScriptLoad(true);
    renderForm();

    fireEvent.click(screen.getByRole('button', { name: /pay now/i }));

    await waitFor(() => {
      expect(handlerFn).toBeTypeOf('function');
    });

    handlerFn({ razorpay_payment_id: 'pay_test_123' });

    expect(submitSpy).toHaveBeenCalledTimes(1);
  });

  it('prevents double submission inside Razorpay handler', async () => {
    let handlerFn: any;

    (window as any).Razorpay = vi.fn().mockImplementation(function Razorpay(options) {
      handlerFn = options.handler;
      this.open = vi.fn();
    });

    mockScriptLoad(true);
    renderForm();

    fireEvent.click(screen.getByRole('button', { name: /pay now/i }));

    await waitFor(() => {
      expect(handlerFn).toBeTypeOf('function');
    });

    handlerFn({ razorpay_payment_id: 'pay_1' });
    handlerFn({ razorpay_payment_id: 'pay_2' });

    expect(submitSpy).toHaveBeenCalledTimes(1);
  });
});
