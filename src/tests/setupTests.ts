import '@testing-library/jest-dom';
import { vi } from 'vitest';

// fix: React Router + JSDOM + Form/useSubmit
HTMLFormElement.prototype.submit = vi.fn();

// silence toast warnings during tests
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));
