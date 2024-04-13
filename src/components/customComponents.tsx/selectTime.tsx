'use client'

import slots from '@/mocks/slots.json';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ScheduleProps {
    onSelectSchedule: (schedule: string) => void;
}

const SelectTime = ({ onSelectSchedule }: ScheduleProps) => {

    const date = slots.date;
    const dateObject = new Date(date);
    const formattedDate = dateObject.toLocaleDateString("en-US", {
        day: 'numeric',
        month: 'long',
    });

    const [morningSlots, setMorningSlots] = useState<string[]>([]);
    const [afternoonSlots, setAfternoonSlots] = useState<string[]>([]);

    const [selectedTime, setSelectedTime] = useState(false);

    const [selectedSlot, setSelectedSlot] = useState('');
    const navigate = useNavigate();

    const handleSelectSlot = (slot:string) => {
        
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set('slot', slot); 
        const newUrl = `${window.location.pathname}?${currentParams.toString()}`;

        setSelectedSlot(slot);
        onSelectSchedule(slot);
        setSelectedTime(true);
        navigate(newUrl);
    };

    useEffect(() => {

        const queryParams = new URLSearchParams(window.location.search);
        const selectedSchedule = queryParams.get('slot');

        if(selectedSchedule){
            setSelectedTime(true);
            setSelectedSlot(selectedSchedule);
            onSelectSchedule(selectedSchedule);
        }
        const morningList: string[] = [];
        const afternoonList: string[] = [];

        slots.availableTimeslots.forEach(timeslot => {
            
            const hour = parseInt(timeslot.split(':')[0]);
            const timeString = timeslot.toString();

            if (hour < 12) {
                morningList.push(timeString);
            } else {
                afternoonList.push(timeString);
            }
        });
        setMorningSlots(morningList);
        setAfternoonSlots(afternoonList);
    },[]);
    
    return(
        <div className="border border-1 border-black h-auto w-full px-4 py-3 space-y-2">
           <p className="pb-1">Select schedule</p> 
           <div className='space-y-3 px-1'>
                <p>{formattedDate}th</p>
                <div className="grid grid-cols-2 gap-4">
                    {morningSlots.map((slot, index) => (
                    <button key={index} 
                        onClick={() => handleSelectSlot(slot)}
                            className={`border border-1 border-neutral-400 rounded py-2 hover:bg-neutral-600 hover:text-black
                            ${selectedSlot == slot ? 'bg-black text-white' : 'bg-neutral-400 text-black'}
                            ${selectedTime == false ? 'hover:bg-neutral-600 hover:text-black' : ''}
                            `}
                            disabled={selectedSlot == slot}
                        >
                        {slot}
                    </button>
                    ))}
                </div>
           </div>
           <div className='space-y-3 px-1 pt-2'>
                <p>{formattedDate}th</p>
                <div className="grid grid-cols-2 gap-4">
                    {afternoonSlots.map((slot, index) => (
                    <button key={index} 
                        onClick={() => handleSelectSlot(slot)}
                        className={`border border-1 border-neutral-400 rounded py-2 hover:bg-neutral-600 hover:text-black
                            ${selectedSlot == slot ? 'bg-black text-white' : 'bg-neutral-400 text-black'}
                            ${selectedTime == false ? 'hover:bg-neutral-600 hover:text-black' : ''}
                            `}
                            disabled={selectedSlot == slot}>
                        {slot}
                    </button>
                    ))}
                </div>
            </div>
    </div>
    )
}

export default SelectTime;