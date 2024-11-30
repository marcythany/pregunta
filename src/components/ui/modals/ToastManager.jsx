import { useState, useEffect } from 'react';
import ToastComponent from './Toast.jsx';

// Store para os toasts (usando um objeto para manter o estado entre re-renders)
const toastStore = {
  toasts: [],
  listeners: new Set(),
  
  addToast(toast) {
    this.toasts.push(toast);
    this.notify();
  },
  
  removeToast(id) {
    const index = this.toasts.findIndex(t => t.id === id);
    if (index !== -1) {
      this.toasts.splice(index, 1);
      this.notify();
    }
  },
  
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },
  
  notify() {
    this.listeners.forEach(listener => listener(this.toasts));
  }
};

export function addToast(message, type = 'info', duration = 3000, position = 'bottom-right') {
  const id = Date.now();
  const toast = { id, message, type, duration, position };
  
  toastStore.addToast(toast);
  
  if (duration > 0) {
    setTimeout(() => {
      toastStore.removeToast(id);
    }, duration);
  }

  return id;
}

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);
  
  useEffect(() => {
    return toastStore.subscribe((newToasts) => {
      setToasts([...newToasts]);
    });
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <ToastComponent 
          key={toast.id} 
          {...toast} 
          onClose={() => toastStore.removeToast(toast.id)} 
        />
      ))}
    </div>
  );
};

export { ToastContainer };
