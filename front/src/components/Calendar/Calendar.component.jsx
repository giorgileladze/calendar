import { WEEK_DAYS } from "./Calendar.container";
import arrowLeft from '../../assets/arrowLeft.svg';
import arrowRight from '../../assets/arrowRight.svg';
import { useRef } from "react";


export default function CalendarComponent(props) {
    const {
        calendar,
        nextMonth,
        prevMonth,
        year,
        month
    } = props;

    const renderRow = (days) => {
        return days.map((day, i) => {
            if(!day) {
                return (
                    <td key={i}>{null}</td>
                );
            }

            return (
                <td 
                    key={day.date + day.weekDay}
                    className={`${day.isHoliday ? 'text-red-600 font-bold': ''}`}
                >
                    <span title={day.details}>{day.date}</span>
                </td>
            )
        })
    } 

    const renderWeeks = () => {
        return WEEK_DAYS.map((weekDay) => {
            return (
                <th 
                    className={`font-2xl border-b border-b-slate-500 ${weekDay[0] === 's' ? 'text-green-600' : ''}`} 
                    key={weekDay}
                >
                    {weekDay}
                </th>
            );
        });
    }

    return (
        <div>
            <div className="my-4 text-xl font-bold flex justify-center gap-5">
                <img src={arrowLeft} onClick={prevMonth} />
                <span className="w-[170px]">
                    {year} - {new Date(year, month).toLocaleString('default', {month: 'long'})}
                </span>
                <img src={arrowRight} onClick={nextMonth} />
            </div>
            <table className="border border-slate-500 border-separate border-spacing-4 shadow-sm shadow-slate-500">
                <thead>
                    <tr>
                        {renderWeeks()}
                    </tr>
                </thead>
                <tbody>
                    {calendar.map((week, i) => {
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
