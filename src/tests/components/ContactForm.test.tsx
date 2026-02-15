import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../../components/ContactForm';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('ContactForm component', () => {
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders heading and form fields', () => {
    render(<ContactForm />);

    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email address *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('updates input values when typing', () => {
    render(<ContactForm />);

    const nameInput = screen.getByPlaceholderText('Name *') as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText('Email address *') as HTMLInputElement;
    const messageInput = screen.getByPlaceholderText('Your Message') as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: 'Vishal' } });
    fireEvent.change(emailInput, { target: { value: 'vishal@test.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello there!' } });

    expect(nameInput.value).toBe('Vishal');
    expect(emailInput.value).toBe('vishal@test.com');
    expect(messageInput.value).toBe('Hello there!');
  });

  it('submits form, shows alert, and clears inputs', () => {
    render(<ContactForm />);

    const nameInput = screen.getByPlaceholderText('Name *') as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText('Email address *') as HTMLInputElement;
    const messageInput = screen.getByPlaceholderText('Your Message') as HTMLTextAreaElement;
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'Vishal' } });
    fireEvent.change(emailInput, { target: { value: 'vishal@test.com' } });
    fireEvent.change(messageInput, { target: { value: 'Testing contact form' } });

    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith(
      `Thank You Vishal for Contacting Us.\n\nEmail: vishal@test.com\nMessage: Testing contact form`
    );

    // inputs cleared
    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(messageInput.value).toBe('');
  });
});
