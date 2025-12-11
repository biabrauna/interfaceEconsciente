import toast, { Toaster } from 'react-hot-toast';

// Configurações padrão dos toasts
const defaultToastOptions = {
  duration: 3000,
  position: 'top-center' as const,
  style: {
    background: '#363636',
    color: '#fff',
    borderRadius: '12px',
    padding: '12px 20px',
    fontSize: '15px',
    fontWeight: '500',
  },
};

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      ...defaultToastOptions,
      icon: '✅',
      style: {
        ...defaultToastOptions.style,
        background: 'linear-gradient(135deg, #00A335 0%, #00d444 100%)',
        boxShadow: '0 4px 20px rgba(0, 163, 53, 0.4)',
      },
    });
  },

  error: (message: string) => {
    toast.error(message, {
      ...defaultToastOptions,
      icon: '❌',
      duration: 4000,
      style: {
        ...defaultToastOptions.style,
        background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
        boxShadow: '0 4px 20px rgba(220, 38, 38, 0.4)',
      },
    });
  },

  loading: (message: string) => {
    return toast.loading(message, {
      ...defaultToastOptions,
      style: {
        ...defaultToastOptions.style,
        background: '#3b82f6',
      },
    });
  },

  info: (message: string) => {
    toast(message, {
      ...defaultToastOptions,
      icon: 'ℹ️',
      style: {
        ...defaultToastOptions.style,
        background: 'linear-gradient(135deg, #1A211A 0%, #2a3a2a 100%)',
        border: '2px solid #EE9300',
        boxShadow: '0 4px 20px rgba(238, 147, 0, 0.3)',
      },
    });
  },

  warning: (message: string) => {
    toast(message, {
      ...defaultToastOptions,
      icon: '⚠️',
      style: {
        ...defaultToastOptions.style,
        background: 'linear-gradient(135deg, #EE9300 0%, #ff9e00 100%)',
        boxShadow: '0 4px 20px rgba(238, 147, 0, 0.4)',
      },
    });
  },

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(
      promise,
      {
        loading: messages.loading,
        success: messages.success,
        error: messages.error,
      },
      {
        style: defaultToastOptions.style,
      }
    );
  },

  dismiss: (toastId?: string) => {
    toast.dismiss(toastId);
  },
};

// Componente Toaster para adicionar ao root
export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
          borderRadius: '12px',
          padding: '12px 20px',
          fontSize: '15px',
          fontWeight: '500',
        },
      }}
    />
  );
}
