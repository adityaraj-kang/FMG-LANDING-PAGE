declare namespace JSX {
    interface IntrinsicElements {
        'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { 'agent-id': string }, HTMLElement>;
    }
}

interface ImportMetaEnv {
    readonly VITE_ELEVENLABS_AGENT_ID: string
    readonly VITE_WAITLIST_SCRIPT_URL: string
    readonly VITE_VENDOR_SCRIPT_URL: string
    readonly VITE_PUBLIC_POSTHOG_KEY: string
    readonly VITE_PUBLIC_POSTHOG_HOST: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}