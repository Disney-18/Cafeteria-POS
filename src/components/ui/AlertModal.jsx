import Modal from './Modal';
import Button from './Button';

const TYPES = {
  success: { icon: 'check_circle', color: 'text-green-500', bg: 'bg-green-50' },
  error: { icon: 'error', color: 'text-red-500', bg: 'bg-red-50' },
  warning: { icon: 'warning', color: 'text-amber-500', bg: 'bg-amber-50' },
  info: { icon: 'info', color: 'text-blue-500', bg: 'bg-blue-50' }
};

export default function AlertModal({
  open,
  onClose,
  type = 'info',
  title,
  message,
  confirmText = 'Aceptar',
  cancelText,
  onConfirm
}) {
  const config = TYPES[type] || TYPES.info;

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="p-6 text-center">
        <div
          className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${config.bg}`}
        >
          <span className={`material-icons text-4xl ${config.color}`}>
            {config.icon}
          </span>
        </div>
        <h3 className="mb-2 text-lg font-bold text-coffee-800">{title}</h3>
        {message && (
          <p className="mb-6 text-sm text-coffee-600 whitespace-pre-line">
            {message}
          </p>
        )}
        <div className="flex justify-center gap-3">
          {cancelText && (
            <Button variant="outline" onClick={onClose}>
              {cancelText}
            </Button>
          )}
          <Button
            variant={type === 'error' ? 'danger' : 'primary'}
            onClick={() => {
              onConfirm?.();
              onClose?.();
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
