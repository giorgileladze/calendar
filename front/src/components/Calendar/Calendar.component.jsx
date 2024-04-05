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

    const dialog = useRef(null);
    const updateDialog = (text) => {
        dialog.current.show() ;
        dialog.current.textContent = text;
    };

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
                    className={`p-1 ${day.isHoliday ? 'text-red-600 font-bold cursor-pointer hover:rounded-full hover:bg-gray-700': ''}`}
                    onMouseEnter={() => day.isHoliday && updateDialog(day.details)}
                    onMouseLeave={() => dialog.current.close()}
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
            <table className="border border-slate-500 border-separate border-spacing-4 shadow-sm shadow-slate-500 rounded-lg">
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
            <dialog data-modal ref={dialog} className="px-6 py-3 rounded-md mt-4 bg-gray-800 font-bold text-[16px]">
            </dialog>
        </div>
    )
}
