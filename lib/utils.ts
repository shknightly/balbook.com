// Use +880 country code validation
export const validateBDPhone = (phone: string): boolean => {
  const bdPhoneRegex = /^(\+880|880)?1[3-9]\d{8}$/
  return bdPhoneRegex.test(phone.replace(/\s/g, ''))
}

// Format: +880 1XXX-XXXXXX
export const formatBDPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(880)?1(\d{3})(\d{6})$/)
  if (match) {
    return `+880 1${match[2]}-${match[3]}`
  }
  return phone
}

// Bangladesh divisions for location picker
export const BD_DIVISIONS = [
  'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা',
  'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'
] as const

// Time zone: Asia/Dhaka (UTC+6)
export const BD_TIMEZONE = 'Asia/Dhaka'