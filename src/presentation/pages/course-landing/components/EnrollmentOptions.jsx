import { Check, ChevronRight, Loader2, Monitor, User } from 'lucide-react';

const plans = [
  {
    name: 'Semipresencial',
    icon: User,
    featured: true,
    note: 'Vacantes limitadas',
    features: [
      'Clases virtuales en vivo',
      '5 prácticas presenciales',
      'En laboratorio y sede hospitalaria',
      'Aula virtual durante 6 meses',
      'Certificación universitaria',
    ],
    prices: [
      { type: 'estudiante', label: 'Estudiante', amount: 150 },
      { type: 'general', label: 'Profesional', amount: 290 },
    ],
  },
  {
    name: 'Virtual',
    icon: Monitor,
    featured: false,
    note: 'Participa desde donde estés',
    features: [
      'Clases virtuales en vivo',
      'Teoría y práctica virtual',
      'Acceso al aula virtual por 6 meses',
      'Disponibilidad 24/7',
      'Certificación universitaria',
    ],
    prices: [
      { type: 'estudiante', label: 'Estudiante', amount: 90 },
      { type: 'general', label: 'Profesional', amount: 190 },
    ],
  },
];

export default function EnrollmentOptions({
  mode = 'page',
  onRequestForm,
  onSelect,
  isLoading = false,
  preferredModality = '',
  preferredCondition = '',
}) {
  const isCheckout = mode === 'checkout';

  return (
    <div className={`enrollment-module ${isCheckout ? 'checkout-mode' : 'page-mode'}`}>
      {plans.map((plan) => {
        const Icon = plan.icon;

        return (
          <article className={`enrollment-plan ${plan.featured ? 'featured' : ''}`} key={plan.name}>
            {plan.featured && <div className="plan-ribbon">Incluye 5 prácticas presenciales</div>}

            <div className="plan-header">
              <Icon size={32} aria-hidden="true" />
              <h3>Modalidad {plan.name}</h3>
            </div>

            <ul className="plan-features">
              {plan.features.map((feature) => (
                <li key={feature}><Check size={17} aria-hidden="true" /> {feature}</li>
              ))}
            </ul>

            <div className="plan-prices" aria-label={`Tarifas de la modalidad ${plan.name}`}>
              {plan.prices.map((price) => {
                const preferred = preferredModality === plan.name && (
                  (preferredCondition === 'Estudiante' && price.type === 'estudiante') ||
                  (preferredCondition === 'Profesional' && price.type === 'general')
                );

                if (isCheckout) {
                  return (
                    <button
                      type="button"
                      className={`price-choice ${preferred ? 'preferred' : ''}`}
                      onClick={() => onSelect(plan.name, price.type)}
                      disabled={isLoading}
                      key={price.type}
                    >
                      <span>{price.label}</span>
                      <strong><small>S/</small>{price.amount}</strong>
                      <span className="price-choice-action">
                        {isLoading ? <Loader2 size={15} className="spin" /> : 'Elegir'}
                      </span>
                    </button>
                  );
                }

                return (
                  <div className="price-summary" key={price.type}>
                    <span>{price.label}</span>
                    <strong><small>S/</small>{price.amount}</strong>
                  </div>
                );
              })}
            </div>

            {!isCheckout && (
              <button type="button" className="plan-cta" onClick={onRequestForm}>
                Reservar mi vacante <ChevronRight size={18} aria-hidden="true" />
              </button>
            )}

            <div className="plan-note">{plan.note}</div>
          </article>
        );
      })}
    </div>
  );
}
