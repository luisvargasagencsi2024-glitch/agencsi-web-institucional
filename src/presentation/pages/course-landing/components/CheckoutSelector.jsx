import { ChevronRight, Loader2, Lock } from 'lucide-react';
import { getEnrollmentPrice } from '../enrollmentPricing';

export default function CheckoutSelector({
  modality,
  condition,
  onPay,
  isLoading = false,
}) {
  const amount = getEnrollmentPrice(modality, condition);
  const checkoutType = condition === 'Estudiante' ? 'estudiante' : 'general';
  const formatAmount = (value) => value.toLocaleString('es-PE', {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="checkout-flow">
      <aside className="checkout-summary ready" aria-label="Resumen para proceder con el pago">
        <div className="checkout-summary-copy">
          <span>Tu matrícula</span>
          <strong>{modality}</strong>
          <small>Tarifa {condition.toLowerCase()}</small>
        </div>

        <div className="checkout-total">
          <span>Total a pagar</span>
          <strong><small>S/</small>{formatAmount(amount)}</strong>
        </div>

        <button
          type="button"
          className="checkout-pay-button"
          onClick={() => onPay(modality, checkoutType)}
          disabled={isLoading}
        >
          {isLoading ? <><Loader2 size={18} className="spin" /> Preparando pago...</> : <>Pagar ahora <ChevronRight size={18} /></>}
        </button>

        <p><Lock size={13} aria-hidden="true" /> Serás dirigido a una página de pago segura.</p>
      </aside>

      {condition === 'Estudiante' && (
        <p className="checkout-student-note">La tarifa de estudiante requiere constancia o carné vigente.</p>
      )}
    </div>
  );
}
