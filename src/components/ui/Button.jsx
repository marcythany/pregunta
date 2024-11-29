import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '',
  disabled = false 
}) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors duration-200';
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-300',
    secondary: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 disabled:bg-gray-100 dark:disabled:bg-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white disabled:bg-red-300'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
