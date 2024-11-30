import React from 'react';

export const Avatar = ({ 
  src, 
  alt, 
  size = 'md',
  className = '' 
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`relative rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700 ${sizes[size]} ${className}`}>
      <img
        src={src || '/default-avatar.png'}
        alt={alt || 'User avatar'}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
