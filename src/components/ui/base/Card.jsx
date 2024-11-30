import React from 'react';

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-light-surface dark:bg-dark-surface rounded-lg shadow-md hover:shadow-lg border border-light-text-secondary/10 dark:border-dark-text-secondary/10 text-light-text-primary dark:text-dark-text-primary p-6 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};
