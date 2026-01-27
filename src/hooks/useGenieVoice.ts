import { useConversation } from '@elevenlabs/react';
import { useState, useCallback } from 'react';

export function useGenieVoice() {
    const [status, setStatus] = useState<'idle' | 'connecting' | 'connected'>('idle');
    const [error, setError] = useState<string | null>(null);

    const conversation = useConversation({
        onConnect: () => {
            setStatus('connected');
            setError(null);
        },
        onDisconnect: () => setStatus('idle'),
        onMessage: () => { },
        onError: (error) => {
            console.error('Error:', error);
            setStatus('idle');
            // @ts-expect-error - Error type from SDK might not match explicitly but message exists
            setError(error?.message || 'Unknown conversation error');
        },
    });

    const startConversation = useCallback(async () => {
        try {
            setStatus('connecting');
            setError(null);

            // Request microphone permission explicitly to be safe, though SDK manages it
            await navigator.mediaDevices.getUserMedia({ audio: true });

            await conversation.startSession({
                agentId: import.meta.env.VITE_ELEVENLABS_AGENT_ID,
                connectionType: 'websocket'
            });
        } catch (error: unknown) {
            console.error('Failed to start conversation:', error);
            setStatus('idle');
            setError((error as Error)?.message || 'Failed to start conversation');
        }
    }, [conversation]);

    const stopConversation = useCallback(async () => {
        try {
            await conversation.endSession();
        } catch (error) {
            console.error("Failed to end session:", error);
        } finally {
            setStatus('idle');
            // Clear any errors when closing
            setError(null);
        }
    }, [conversation]);

    return {
        status,
        error,
        startConversation,
        stopConversation
    };
}
