import { useState, useEffect } from "react";
import CalendarComponent from './Calendar.component'

export const WEEK_DAYS = ['m', 't', 'w', 'th', 'f', 's', 'su']; 

export default function Calendar() {
    const [dateTable, setDateTable] = useState(null);
    const [month, setMonth] = useState(3);

    useEffect(() => {
        const day = new Date(2024, month + 1, 0).getDate();
        const temp = [];
        let weekTemp = new Array();

        for(let i = 1; i <= day; i++){            
            const num = new Date(2024, month, i).getDay() - 1; // extract 1 because week days indexing start from sunday
            const weekDay = WEEK_DAYS.at(num); // num variable for sunday becomes -1, Array.at(-1) will return last el which is sunday

            if(weekDay === 'm' && i != 1){
                temp.push(weekTemp);
                weekTemp = new Array();
            }

            weekTemp.push({
                date: i,
                weekDay,
                weekDayIndex: num
            });
        }
        temp.push(weekTemp); // push last iteration results

        // fix first row layout
        const length = 7 - temp[0].length;
        for(let i = 0; i < length; i++){
            temp[0].unshift(null);
        }

        setDateTable(temp);
    }, [month]);

    if(!dateTable) return null;
    console.log(dateTable)
    return (
        <CalendarComponent dateTable={dateTable}/>
    )
}
