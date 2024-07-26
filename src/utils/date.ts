import { DateTime } from 'luxon'

export const convertToClientTimezone = (utcDate: string) => {
  const date = DateTime.fromISO(utcDate, { zone: 'utc' })
  const localDate = date.setZone(DateTime.local().zoneName)
  const formattedDate = localDate.toFormat('yyyy-MM-dd HH:mm:ss')

  return formattedDate
}
