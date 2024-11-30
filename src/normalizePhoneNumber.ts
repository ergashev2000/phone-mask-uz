/**
 * O'zbekiston telefon raqamini formatlaydi
 * @param value - Kiruvchi telefon raqami
 * @param format - Telefon raqamining formati (default: +998 (##) ### ## ##)
 * @returns Formatlangan telefon raqami
 */
interface OperatorInfo {
  name: string;
  codes: string[];
}

const OPERATORS: { [key: string]: OperatorInfo } = {
  'Beeline': {
    name: 'Beeline',
    codes: ['90', '91']
  },
  'Ucell': {
    name: 'Ucell',
    codes: ['93', '94']
  },
  'UzMobile': {
    name: 'UzMobile',
    codes: ['95', '99']
  },
  'Perfectum': {
    name: 'Perfectum',
    codes: ['98']
  },
  'Uztelecom': {
    name: 'Uztelecom',
    codes: ['97']
  }
};

export const getOperatorName = (phone: string): string | null => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 5) return null;

  const operatorCode = digits.slice(3, 5);
  for (const [operator, info] of Object.entries(OPERATORS)) {
    if (info.codes.includes(operatorCode)) {
      return operator;
    }
  }
  return null;
};

export const normalizePhoneNumber = (
  value: string,
  format: string = '+998 (##) ### ## ##'
): string => {
  if (!value) return format.replace(/[#]/g, '_');

  // Faqat raqamlar va + belgisini qoldirish
  const digits = value.replace(/\D/g, '');
  
  // Agar raqam 998 bilan boshlanmasa va kiritilgan qiymat bo'sh bo'lmasa
  if (!digits.startsWith('998') && digits.length > 0) {
    const newDigits = '998' + digits;
    return normalizePhoneNumber(newDigits, format);
  }

  let result = format;
  const numberDigits = digits.slice(3); // 998 dan keyingi raqamlar
  let digitIndex = 0;

  // Formatdagi har bir belgini almashtirish
  for (let i = 0; i < format.length && digitIndex < numberDigits.length; i++) {
    if (format[i] === '#') {
      result = result.substring(0, i) + numberDigits[digitIndex] + result.substring(i + 1);
      digitIndex++;
    }
  }

  // Qolgan # larni _ ga almashtirish
  result = result.replace(/[#]/g, '_');
  
  return result;
};

/**
 * Telefon raqami to'g'ri formatda ekanligini tekshiradi
 * @param phone - Tekshiriladigan telefon raqami
 * @returns true agar raqam to'g'ri formatda bo'lsa
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const cleanNumber = phone.replace(/\D/g, '');
  return cleanNumber.length === 12 && cleanNumber.startsWith('998');
};
