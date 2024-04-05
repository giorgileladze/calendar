import { WEEK_DAYS } from "../components/Calendar/Calendar.container";
import useHolidays from "../store/useHolidays";

export default function useCalendarMatrix() {    
    const holidays = useHolidays(state => state.holidays);

    const calculateCalendarMatrix = (year, month) => {
        const data = holidays[month].map(holiday => {
            const monthIndex = holiday.date.split('-').at(-1);
            return {...holiday, date: monthIndex};
        });

        const day = new Date(year, month + 1, 0).getDate();
        const calendarMatrix = [];
        let temp = new Array();

        for(let i = 1; i <= day; i++){     
            const num = new Date(2024, month, i).getDay() - 1; // extract 1 because week days indexing start from sunday
            const weekDay = WEEK_DAYS.at(num); // num variable for sunday becomes -1, Array.at(-1) will return last el which is sunday

            if(weekDay === 'm' && i != 1){
                calendarMatrix.push(temp);
                temp = new Array();
            }

            const isHoliday = !!data.filter(el => el.date == i).length;
            temp.push({
                date: i,
                weekDay,
                weekDayIndex: num,
                isHoliday,
                details: !isHoliday ? null : data.find(el => el.date == i).title
            });
        }
        calendarMatrix.push(temp); // push last iteration results

        // fix first row layout
        const length = 7 - calendarMatrix[0].length;
        for(let i = 0; i < length; i++){
            calendarMatrix[0].unshift(null);
        }

        return calendarMatrix;
    }

    return calculateCalendarMatrix;
}
