declare namespace JSX {
    interface IntrinsicElements {
        'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { 'agent-id': string }, HTMLElement>;
    }
}

interface ImportMetaEnv {
    readonly VITE_ELEVENLABS_AGENT_ID: string
    readonly VITE_WAITLIST_SCRIPT_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
