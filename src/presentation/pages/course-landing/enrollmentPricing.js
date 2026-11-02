const enrollmentPrices = {
  Semipresencial: { Estudiante: 150, Profesional: 290 },
  Virtual: { Estudiante: 90, Profesional: 190 },
};

export const getEnrollmentPrice = (modality, condition) => (
  enrollmentPrices[modality]?.[condition] || 0
);
