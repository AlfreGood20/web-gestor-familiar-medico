function ConfirmDialog({
  open,
  title = 'Confirmar acción',
  message,
  confirmLabel = 'Confirmar',
  loadingLabel = 'Procesando...',
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="modal modal-open" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
      <div className="modal-box max-w-md">
        <h3 id="confirm-dialog-title" className="text-lg font-bold text-[#19304a]">{title}</h3>
        <p className="py-4 text-slate-600">{message}</p>
        <div className="modal-action">
          <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={loading}>
            Cancelar
          </button>
          <button type="button" className="btn btn-error text-white" onClick={onConfirm} disabled={loading}>
            {loading && <span className="loading loading-spinner loading-xs" />}
            {loading ? loadingLabel : confirmLabel}
          </button>
        </div>
      </div>
      <button type="button" className="modal-backdrop" aria-label="Cerrar confirmación" onClick={onCancel} disabled={loading} />
    </div>
  );
}

export default ConfirmDialog;
