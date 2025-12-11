import React from 'react';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        background: 'rgba(26, 33, 26, 0.5)',
        borderRadius: '16px',
        border: '2px dashed rgba(255, 255, 255, 0.1)',
        minHeight: '250px',
      }}
    >
      <div
        style={{
          fontSize: '4rem',
          marginBottom: '1rem',
          opacity: 0.6,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: '1.3rem',
          fontWeight: '600',
          color: 'white',
          margin: '0 0 0.8rem 0',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '1rem',
          color: 'rgba(255, 255, 255, 0.7)',
          margin: '0 0 1.5rem 0',
          lineHeight: '1.6',
          maxWidth: '400px',
        }}
      >
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          style={{
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(135deg, #EE9300 0%, #ff9e00 100%)',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(238, 147, 0, 0.3)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(238, 147, 0, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(238, 147, 0, 0.3)';
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
