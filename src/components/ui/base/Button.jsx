import React from 'react';

export function Button(props) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className = '',
    href,
    onClick,
    ...otherProps
  } = props;

  const variants = {
    primary: 'bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white',
    secondary: 'bg-light-secondary hover:bg-light-secondary/90 dark:bg-dark-secondary dark:hover:bg-dark-secondary/90 text-white',
    danger: 'bg-error-light hover:bg-error-light/90 dark:bg-error-dark dark:hover:bg-error-dark/90 text-white',
    ghost: 'bg-transparent hover:bg-light-primary/10 text-light-text-primary dark:hover:bg-dark-primary/10 dark:text-dark-text-primary'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const baseClasses = `rounded-lg transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${variants[variant]} ${sizes[size]} ${className}`;

  const loadingSpinner = (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        onClick={onClick}
        {...otherProps}
      >
        {isLoading && loadingSpinner}
        {children}
      </a>
    );
  }

  return (
    <button
      className={baseClasses}
      disabled={isLoading}
      onClick={onClick}
      {...otherProps}
    >
      {isLoading && loadingSpinner}
      {children}
    </button>
  );
};
