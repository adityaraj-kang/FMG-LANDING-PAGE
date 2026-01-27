import { Component, type ErrorInfo, type ReactNode } from 'react';
import { WarningCircle } from '@phosphor-icons/react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    name?: string;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(`ErrorBoundary [${this.props.name || 'Root'}]:`, error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center p-8 bg-zinc-950/50 rounded-2xl border border-white/10 text-center">
                    <WarningCircle size={48} className="text-red-500 mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
                    <p className="text-white/60 mb-4 text-sm max-w-md">
                        {this.state.error?.message || 'An unexpected error occurred.'}
                    </p>
                    <button
                        onClick={() => {
                            this.setState({ hasError: false, error: null });
                            window.location.reload();
                        }}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm transition-colors"
                    >
                        Reload Component
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
