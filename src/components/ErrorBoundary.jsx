// eslint-disable-next-line react/prop-types
const ErrorBoundary = ({ children }) => {
  return (
    <div className="error-boundary">
      {children}
    </div>
  );
};

export default ErrorBoundary;