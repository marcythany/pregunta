import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 dark:text-gray-100 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
