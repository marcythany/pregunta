import LoadingSpinner from './LoadingSpinner';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon = null
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 relative';
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-sm',
    md: 'px-4 py-2 text-base rounded',
    lg: 'px-6 py-3 text-lg rounded-md'
  };
  const variants = {
    primary: 'bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-light-text-primary dark:text-dark-text-primary shadow-sm hover:shadow disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed',
    secondary: 'bg-light-surface hover:bg-light-surface/90 dark:bg-dark-surface dark:hover:bg-dark-surface/90 text-light-text-primary dark:text-dark-text-primary border border-light-text-secondary/10 dark:border-dark-text-secondary/10 shadow-sm hover:shadow disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed',
    danger: 'bg-error-light hover:bg-error-light/90 dark:bg-error-dark dark:hover:bg-error-dark/90 text-white shadow-sm hover:shadow disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <LoadingSpinner size="sm" className="mr-2" />
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      <span className={loading ? 'opacity-70' : ''}>{children}</span>
    </button>
  );
};

export default Button;
