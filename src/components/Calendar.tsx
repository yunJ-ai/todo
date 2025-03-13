import { useState } from "react";
import { Provider, defaultTheme, Calendar } from "@adobe/react-spectrum";
import { parseDate } from "@internationalized/date";
function MyCalendar() {
  const [date, setDate] = useState(
    parseDate(new Date().toISOString().split("T")[0])
  );

  return (
    <Provider theme={defaultTheme}>
      <div className="p-4">
        <Calendar value={date} onChange={setDate} />
      </div>
    </Provider>
  );
}

export default MyCalendar;
