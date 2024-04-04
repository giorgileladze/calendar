import { WEEK_DAYS } from "./Calendar.container";

export default function CalendarComponent({ dateTable }) {

    const renderRow = (days) => {
        return days.map((day, i) => {
            if(!day) {
                return (
                    <td key={i}>{null}</td>
                );
            }

            return (
                <td key={day.date + day.weekDay}>{day.date}</td>
            )
        })
    } 

    const renderWeeks = () => {
        return WEEK_DAYS.map((weekDay) => {
            return (
                <th key={weekDay}>{weekDay}</th>
            );
        });
    }

    return (
        <div>
            <table className="border border-slate-500 border-separate border-spacing-4 shadow-sm shadow-slate-500">
                <thead>
                    <tr>{renderWeeks()}</tr>
                </thead>
                <tbody>
                    {dateTable.map((week, i) => {
                        return (
                            <tr key={i}>
                                {renderRow(week)}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}
