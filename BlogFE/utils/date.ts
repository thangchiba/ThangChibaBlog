export function formatDate(date, language: string = 'en'): string {
  const newDate = new Date(date)

  if (language === 'vi') {
    // Vietnamese format: "Ngày dd Tháng mm Năm yyyy"
    return `Ngày ${newDate.getDate()} Tháng ${newDate.getMonth() + 1} Năm ${newDate.getFullYear()}`
  } else if (language === 'jp') {
    // Japanese format: "yyyy年mm月dd日"
    // Custom formatting for Japanese, since toLocaleDateString does not directly support the desired format
    const year = newDate.getFullYear()
    const month = newDate.getMonth() + 1 // getMonth() is zero-indexed, so add 1
    const day = newDate.getDate()
    return `${year}年${month.toString().padStart(2, '0')}月${day.toString().padStart(2, '0')}日`
  } else {
    // For other languages, use the built-in toLocaleDateString
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return newDate.toLocaleDateString(language, options)
  }
}

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}
