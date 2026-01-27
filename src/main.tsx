import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PostHogProvider } from 'posthog-js/react'
import { Toaster } from 'sonner'
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary name="Root">
      <PostHogProvider
        apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
        options={{
          api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
          defaults: '2025-05-24',
          capture_exceptions: true,
          debug: import.meta.env.MODE === 'development',
          disable_session_recording: true,
          disable_surveys: true,
          autocapture: false,
        }}
      >
        <BrowserRouter>
          <App />
          <Toaster position="top-center" richColors theme="dark" />
        </BrowserRouter>
      </PostHogProvider>
    </ErrorBoundary>
  </StrictMode>,
)
