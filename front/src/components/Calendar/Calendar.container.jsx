import { useState, useEffect } from "react";
import CalendarComponent from './Calendar.component'
import api from '../../axios';
import useCalendarMatrix from "../../hooks/useCalendarMatrix";
import useHolidays from '../../store/useHolidays'

export const WEEK_DAYS = ['m', 't', 'w', 'th', 'f', 's', 'su']; 

export default function Calendar() {
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2024);
    const [calendar, setCalendar] = useState(null);
    const calculateCalendar = useCalendarMatrix();
    const store = useHolidays();

    const prevMonth = () => {
        setMonth(prev => {
            if(prev === 0) {
                setYear(prev => prev - 1);
                return 11;
            }
            
            return prev - 1;
        })
    }

    const nextMonth = () => {
        setMonth(prev => {
            if(prev === 11) {
                setYear(prev => prev + 1);
                return 0;
            }
            
            return prev + 1;
        })
    }

    useEffect(() => {
        const fetchHolidays = async () => {
            const response = await api.get('/holidays', {
                params: {
                    start: month + 1,
                    end: month + 2,
                }
            });
            const holidays = response.data.data;
            store.updateHolidays(month, holidays);
        }
        
        // do not send new request if store already contains needed data
        if(!store.holidays[month]){
            fetchHolidays();
        }
    }, [month]);

    useEffect(() => {
        if(store.holidays[month]){
            setCalendar(calculateCalendar(year, month)); // update old calendar matrix
        }
    }, [store.holidays, month])

    if(!calendar) return null;

    return (
        <CalendarComponent 
            calendar={calendar} 
            month={month}
            year={year}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
        />
    )
}
