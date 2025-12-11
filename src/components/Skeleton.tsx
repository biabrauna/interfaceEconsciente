import './Skeleton.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export function Skeleton({ width = '100%', height = '20px', borderRadius = '4px', className = '' }: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius }}
      aria-label="Carregando..."
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-header">
        <Skeleton width="44px" height="44px" borderRadius="50%" />
        <div className="skeleton-user-info">
          <Skeleton width="120px" height="16px" />
          <Skeleton width="80px" height="14px" />
        </div>
      </div>
      <Skeleton width="100%" height="400px" borderRadius="0" />
      <div className="skeleton-actions">
        <Skeleton width="80px" height="36px" borderRadius="8px" />
      </div>
    </div>
  );
}

export function SkeletonProfile() {
  return (
    <div className="skeleton-profile">
      <Skeleton width="120px" height="120px" borderRadius="50%" className="skeleton-avatar" />
      <Skeleton width="200px" height="28px" className="skeleton-name" />
      <div className="skeleton-stats">
        <Skeleton width="80px" height="60px" borderRadius="12px" />
        <Skeleton width="80px" height="60px" borderRadius="12px" />
        <Skeleton width="80px" height="60px" borderRadius="12px" />
      </div>
      <Skeleton width="100%" height="100px" borderRadius="12px" />
    </div>
  );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-list-item">
          <Skeleton width="40px" height="40px" borderRadius="50%" />
          <div className="skeleton-list-content">
            <Skeleton width="60%" height="16px" />
            <Skeleton width="40%" height="14px" />
          </div>
        </div>
      ))}
    </>
  );
}
