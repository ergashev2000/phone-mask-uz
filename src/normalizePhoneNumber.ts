/**
 * O'zbekiston telefon raqamini formatlaydi
 * @param value - Kiruvchi telefon raqami
 * @returns Formatlangan telefon raqami
 */
export const normalizePhoneNumber = (value: string): string => {
  // Faqat raqamlar va + belgisini qoldirish
  const cleanValue = value.replace(/[^+\d]/g, "");

  // Agar +998 bilan boshlanmasa, default qiymat qaytarish
  if (!cleanValue.startsWith("+998")) return "+998 ";

  // +998 dan keyingi raqamlarni ajratib olish
  const strippedValue = cleanValue.slice(4).replace(/\s/g, "");

  // Raqamlarni guruhlarga bo'lish: XX XXX XX XX
  const parts = [
    strippedValue.slice(0, 2),    // XX
    strippedValue.slice(2, 5),    // XXX
    strippedValue.slice(5, 7),    // XX
    strippedValue.slice(7, 9),    // XX
  ];

  // Bo'sh bo'lmagan qismlarni birlashtirish
  return `+998 ${parts.filter(Boolean).join(" ")}`;
};

/**
 * Telefon raqami to'g'ri formatda ekanligini tekshiradi
 * @param phone - Tekshiriladigan telefon raqami
 * @returns true agar raqam to'g'ri formatda bo'lsa
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const cleanNumber = phone.replace(/\D/g, "");
  return cleanNumber.length === 12 && cleanNumber.startsWith("998");
};
