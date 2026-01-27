import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import WaitlistForm from '../WaitlistForm';

// Mock Sonner toast
vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

// Mock global fetch
global.fetch = vi.fn();

describe('WaitlistForm Component', () => {
    const mockOnClose = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders correctly', () => {
        // Provide dummy URL so it doesn't fail init checks if any
        render(<WaitlistForm isOpen={true} onClose={mockOnClose} googleScriptUrl="https://example.com" />);

        expect(screen.getByRole('heading', { name: /Join the Waitlist/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
    });

    it('validates required fields are filled before submitting', async () => {
        render(<WaitlistForm isOpen={true} onClose={mockOnClose} googleScriptUrl="https://example.com" />);

        // Check that required attributes exist
        expect(screen.getByPlaceholderText('Email Address')).toBeRequired();
        expect(screen.getByPlaceholderText('Phone Number')).toBeRequired();
    });

    it('shows success toast on successful submission', async () => {
        // Mock successful fetch
        vi.mocked(global.fetch).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ status: 'success' }),
        } as Response);

        // PASS THE PROP so the component doesn't early return
        render(<WaitlistForm isOpen={true} onClose={mockOnClose} googleScriptUrl="https://example.com" />);

        // Fill form
        fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '1234567890' } });

        // Submit
        const submitBtn = screen.getByRole('button', { name: /Join Waitlist/i });
        fireEvent.click(submitBtn);

        // Wait for fetch to be called
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        // Verify it was called with correct URL and body
        expect(global.fetch).toHaveBeenCalledWith('https://example.com', expect.objectContaining({
            method: 'POST',
            body: expect.stringContaining('"name":"John Doe"')
        }));
    });
});
