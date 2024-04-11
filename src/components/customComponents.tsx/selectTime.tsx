'use client'

import slots from '@/mocks/slots.json';
import { useEffect, useState } from 'react';

const SelectTime = () => {

    const today = new Date();
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];
  
    // Obtener el día y el mes
    const day = today.getDate();
    const monthIndex = today.getMonth();
    const monthName = monthNames[monthIndex];
    const suffixes = ["st", "nd", "rd"];
    let suffix = "th";
    if (day <= 20 && day >= 10) {
      suffix = "th";
    } else {
      suffix = suffixes[day % 10 - 1] || "th";
    }

    const [morningSlots, setMorningSlots] = useState<string[]>([]);
    const [afternoonSlots, setAfternoonSlots] = useState<string[]>([]);

    useEffect(() => {

        const morningList: string[] = [];
        const afternoonList: string[] = [];

        slots.availableTimeslots.forEach(timeslot => {
            const hour = parseInt(timeslot.split(':')[0]);

            if (hour < 12) {
                morningList.push(timeslot);
            } else {
                afternoonList.push(timeslot);
            }
        });

        setMorningSlots(morningList);
        setAfternoonSlots(afternoonList);
    },[]);

    return(
        <div className="border border-1 border-black h-auto w-full px-4 py-3 space-y-2">
           <p className="pb-1">Select schedule</p> 
           <div className='space-y-3 px-1'>
                <p>{monthName} {day}{suffix}</p>
                <div className="grid grid-cols-2 gap-4">
                    {morningSlots.map((slot, index) => (
                    <button key={index} className="bg-neutral-400 text-black border border-1 border-neutral-400 rounded py-2 hover:bg-neutral-800 hover:text-white">
                        {slot} {/* Aquí deberías ajustar el contenido del botón según la estructura de morningList */}
                    </button>
                    ))}
                </div>
           </div>
           <div className='space-y-3 px-1 pt-2'>
                <p>{monthName} {day}{suffix}</p>
                <div className="grid grid-cols-2 gap-4">
                    {afternoonSlots.map((slot, index) => (
                    <button key={index} className="bg-neutral-400 text-black border border-1 border-neutral-400 rounded py-2 hover:bg-neutral-800 hover:text-white">
                        {slot} {/* Aquí deberías ajustar el contenido del botón según la estructura de morningList */}
                    </button>
                    ))}
                </div>
           </div>
        </div>
    )
}

export default SelectTime;