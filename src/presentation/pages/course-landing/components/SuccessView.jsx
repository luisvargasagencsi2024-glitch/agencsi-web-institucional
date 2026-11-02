import React, { useEffect, useState } from 'react';
import { CheckCircle, ExternalLink, Loader2, X } from 'lucide-react';

export default function SuccessView({ checkoutData, onClose }) {
  const [loading, setLoading] = useState(true);
  const [lmsData, setLmsData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const enrollStudent = async () => {
      try {
        if (checkoutData.status === 'error') {
          throw new Error(checkoutData.message || 'No pudimos recuperar los datos del pago.');
        }

        const customerData = checkoutData.customerData || {};
        const fullNameParts = String(customerData.fullName || '').trim().split(/\s+/).filter(Boolean);
        const firstName = fullNameParts.shift() || '';
        const lastName = fullNameParts.join(' ');
        const email = String(customerData.email || '').trim().toLowerCase();
        const phone = String(customerData.phoneNumber || customerData.phone || '').trim();
        const documentId = String(customerData.documentId || customerData.document || '').trim();

        if (!email || !firstName || !lastName || !checkoutData.transactionId) {
          throw new Error('La sesión pagada no contiene todos los datos necesarios para matricular al estudiante.');
        }

        const paymentAmount = Number(checkoutData.amount) / 100;
        if (!Number.isFinite(paymentAmount) || paymentAmount <= 0) {
          throw new Error('La sesión pagada no contiene un monto válido.');
        }

        const courseId = import.meta.env.VITE_COURSE_ID;
        const crmApiUrl = import.meta.env.VITE_CRM_API_URL;
        const crmApiKey = import.meta.env.VITE_CRM_API_KEY;
        if (!courseId || !crmApiUrl || !crmApiKey) {
          throw new Error('La integración de matrícula no está configurada completamente.');
        }

      const payload = {
        customer: {
            email,
            firstName,
            lastName,
            phone,
            documentId,
            customFields: {
              professionalRegistration: customerData.professionalRegistration || '',
              academicLevel: customerData.academicLevel || '',
              institution: customerData.institution || '',
              profession: customerData.profession || '',
              modality: customerData.modality || '',
              condition: customerData.condition || ''
            },
          },
          courseId,
          subtotal: paymentAmount,
          total: paymentAmount,
          payment: {
            amount: paymentAmount,
            currency: checkoutData.currency,
            status: 'PAID',
            method: 'CREDIT_CARD',
            transactionId: checkoutData.transactionId
        }
      };

      const response = await fetch(
          `${crmApiUrl}/api/webhooks/enrollments?apikey=${encodeURIComponent(crmApiKey)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );

        const result = await response.json();

        if (!response.ok || result.success === false) {
          throw new Error(result.message || result.error || `El servicio de matrícula respondió con estado ${response.status}.`);
        }

        if (!cancelled) {
          setLmsData(result.data?.lms || result.lms || null);
        }
      } catch (err) {
        console.error('Error al matricular:', err);
        if (!cancelled) {
          setError('Hemos registrado tu pago, pero hubo un retraso creando tu acceso. Te lo enviaremos por correo en los próximos minutos.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    enrollStudent();
    return () => {
      cancelled = true;
    };
  }, [checkoutData]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
      <div className="relative w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-[24px] shadow-2xl border border-white/40 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <Loader2 className="w-14 h-14 text-blue-600 animate-spin mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 font-display">Procesando tu matrícula...</h2>
            <p className="text-gray-600 mt-2 font-body">Estamos conectando tu cuenta con el campus virtual.</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center flex flex-col items-center">
             <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
               <CheckCircle className="w-8 h-8 text-yellow-600" />
             </div>
             <h1 className="text-3xl font-bold text-gray-900 mb-4 font-display">¡Pago Recibido!</h1>
             <p className="text-gray-700 font-body mb-8">
               {error}
             </p>
             <button 
                onClick={onClose}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-xl transition-colors font-body"
              >
                Cerrar y volver al inicio
              </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-10 max-w-lg mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 blur-xl opacity-20 rounded-full"></div>
              <CheckCircle className="relative w-20 h-20 text-green-500 mb-6 drop-shadow-md" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-3 font-display text-center">¡Pago Exitoso!</h1>
            <p className="text-gray-600 mb-8 text-center font-body text-[15px]">
              Tu matrícula se ha realizado correctamente. Ya tienes acceso al campus virtual.
            </p>

            {lmsData ? (
              <div className="w-full bg-blue-50/70 p-6 rounded-2xl border border-blue-100/50 mb-6 shadow-sm">
                <h3 className="font-semibold text-blue-950 mb-4 font-display">Tus Datos de Acceso</h3>
                
                <div className="space-y-3 mb-6 text-sm text-blue-900 font-body">
                  <div className="flex justify-between border-b border-blue-200/50 pb-2">
                    <span className="opacity-70">Usuario:</span>
                    <strong className="font-medium">{lmsData.username}</strong>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="opacity-70">Contraseña:</span>
                    {lmsData.password ? (
                      <strong className="font-medium tracking-wide">{lmsData.password}</strong>
                    ) : (
                      <span className="text-xs italic text-blue-700">* Usa tu clave actual *</span>
                    )}
                  </div>
                </div>

                {lmsData.magicLink ? (
                  <a 
                    href={lmsData.magicLink} 
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 px-4 rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-[0.98]"
                  >
                    Ir al Curso Ahora <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <button 
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 px-4 rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-[0.98]"
                  >
                    Finalizar y cerrar
                  </button>
                )}
              </div>
            ) : (
              <button 
                onClick={onClose}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3.5 px-4 rounded-xl transition-colors shadow-md active:scale-[0.98]"
              >
                Cerrar y continuar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
