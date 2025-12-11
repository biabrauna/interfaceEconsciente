import './ConfirmDialog.css';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  type = 'warning'
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-message">
        <div className={`confirm-dialog-icon ${type}`}>
          {type === 'danger' && '⚠️'}
          {type === 'warning' && '❓'}
          {type === 'info' && 'ℹ️'}
        </div>

        <h2 id="dialog-title" className="confirm-dialog-title">{title}</h2>
        <p id="dialog-message" className="confirm-dialog-message">{message}</p>

        <div className="confirm-dialog-actions">
          <button
            className="confirm-dialog-button cancel"
            onClick={onCancel}
            type="button"
          >
            {cancelText}
          </button>
          <button
            className={`confirm-dialog-button confirm ${type}`}
            onClick={() => {
              onConfirm();
              onCancel();
            }}
            type="button"
            autoFocus
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
