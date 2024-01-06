import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import localizedFormat from 'dayjs/plugin/localizedFormat'

export default function getFormattedDate(dateString: string): string {
    dayjs.extend(utc) // use plugin
    dayjs.extend(timezone) // use plugin
    dayjs.extend(localizedFormat)  // use plugin
    return dayjs.utc(dateString).tz(dayjs.tz.guess()).format('LLL')
}