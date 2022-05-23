import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import dayjs from "dayjs";

dayjs.locale("cn");

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

dayjs.tz.setDefault("Australia/Hobart");

export const FORMAT_DATE = "YYYY/MM/DD";

export default dayjs;
