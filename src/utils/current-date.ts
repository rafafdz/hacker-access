export function getCurrentDateTime() {
  const currentDate = new Date()
  const GMT = -3
  currentDate.setHours(currentDate.getHours() + GMT)
  const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ')
  return formattedDate
}
