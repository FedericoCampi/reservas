'use client'

import { Progress } from "@/components/ui/progress"

import { TableCellsIcon } from "@heroicons/react/16/solid";
import '@/styles/accordion.css'
import { useEffect, useState } from "react";
import Categories from "@/components/customComponents.tsx/categories";
import SelectTime from "@/components/customComponents.tsx/selectTime";
import Confirm from "@/components/customComponents.tsx/confirm";
import ShiftConfirmed from "@/components/customComponents.tsx/ShiftConfirmed";
import servicesData from '@/mocks/services.json';
import slots from '@/mocks/slots.json';
import { format } from 'date-fns';

export default function Home() {

  const [seleccionado, setSeleccionado] = useState(false);
  const [showInterfaces, setShowInterfaces] = useState(0);
  const [selectTime, setSelectTime] = useState(false);
  const titles = ['Select service', 'Select schedule', 'Confirm appointment'];
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const progress = [25, 50, 75, 100];
  const [section, setSection] = useState(0);
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(0);

  const handleSelectChange = (categoryId: number) => {
    if (categoryId == 0) {
      setSeleccionado(false);
    } else {
      setSeleccionado(true);
    }
    setSelectedCategoryId(categoryId);
  };

  const handleSelectSchedule = (schedule: string) => {
    if (schedule !== '') {
      setSelectTime(true)
    }
  };

  const goBack = () => {
    setShowInterfaces(showInterfaces - 1);
  };

  const goNext = () => {
    setShowInterfaces(showInterfaces + 1);
  };

  const goToAppointments = () => {
    setSection(1);
  };

  const service = servicesData.services.find(service=> service.id === selectedCategoryId);
  const fechaOriginal = slots.date;
  const fecha = new Date(fechaOriginal);
  const fechaFormateada = format(fecha, 'dd/MM/yyyy');

  const turnoConfirmado = () => {
    setAppointmentConfirmed(1);
  }

  const anotherAppointment = () => {
    window.history.replaceState({}, '', '/');
    window.location.reload();
  }

  useEffect(() => {

    if (typeof window !== 'undefined') {

      const queryParams = new URLSearchParams(window.location.search);
      const selectedCategory = Number(queryParams.get('category'));

      const selectedSchedule = queryParams.get('slot');

      if (selectedCategory > 0) {
        setSeleccionado(true);
        setSelectedCategoryId(selectedCategory);

        if (selectedSchedule) {
          setSelectedSchedule(selectedSchedule);
        }
      } else {
        if (showInterfaces === 0 && !seleccionado) {
          setSeleccionado(false);
        }
      }
    }

  }, [showInterfaces, seleccionado]);

  return (
    <div className="flex justify-center bg-neutral-400">
      <main className={`bg-neutral-200 min-h-screen w-full pb-20 max-w-[500px] ${seleccionado && ' pb-40 '}`}>
      {
        section == 0 ? (
          <div>
            <div className="h-[15%] w-full">
              <div className="p-6">
                <p>{titles[showInterfaces]}</p>
                <Progress value={progress[showInterfaces]} />
              </div>
            </div>
            <div className="h-[65%] w-full px-8">

              {showInterfaces === 0 ? (
                <Categories onSelectChange={handleSelectChange} />
              ) : showInterfaces === 1 ? (
                <SelectTime onSelectSchedule={handleSelectSchedule} />
              ) : showInterfaces === 2 ? (
                <Confirm category={selectedCategoryId} schedule={selectedSchedule} />
              ) : (
                <ShiftConfirmed goToAppointments={goToAppointments}/>
              )}
            </div>
            
          </div>
        ) : (
          appointmentConfirmed == 1 ? (
            <div className="h-[500px] w-full flex flex-col justify-between pt-16 px-6">
              <div className="border border-1 border-black h-auto w-full px-4 py-5">
                <p>Service: {service?.name}</p>
                <p>Date: {fechaFormateada} {selectedSchedule}</p>
              </div>
              <div className="w-auto text-center">
                <button onClick={anotherAppointment}
                      className='mt-6 p-2 bg-green-700 text-black hover:bg-green-900 hover:text-white'>
                      Make another <br /> appointments
                </button>
              </div>
            </div>
            
          ) : (
            <div className="border border-1 border-black h-auto w-full px-4 py-5">
              No appointments reserved
            </div>
          )
          
        )
      }
          <div className="fixed-container">
              {
                seleccionado && section == 0 && showInterfaces !== 3 ? (
                  <div className="w-full flex justify-between px-8 py-2 border-t border-black">
                    {
                      showInterfaces == 0 ? (
                        <div></div>
                      ) : (
                        <button onClick={goBack}
                          className="bg-neutral-800 text-white p-2 hover:bg-neutral-500 hover:text-black">
                          Back
                        </button>
                      )
                    }
                    {
                      showInterfaces == 2 ? (
                        <button onClick={() => {
                              goNext();
                              turnoConfirmado();
                          }}
                          className="bg-neutral-800 text-white p-2 hover:bg-neutral-500 hover:text-black"
                        >
                          Confirm
                        </button>
                      ) : (
                        <button onClick={goNext}
                          disabled={selectTime == false && showInterfaces !== 0}
                          className={`${selectTime == false && showInterfaces !== 0 ? 'bg-neutral-400 text-black p-2' : 'bg-neutral-800 text-white p-2 hover:bg-neutral-500 hover:text-black'} '`}>
                          Next
                        </button>
                      )
                    }
                  </div>

                ) : (
                  <div>

                  </div>
                )
              }
              <div className={`w-full flex justify-center space-x-10 py-1 border-t border-1 border-black`}>
                <div onClick={() => { setSection(0) }}
                  className={`flex flex-col items-center cursor-pointer ${section == 0 ? 'border-b-2 border-[#1934B6]' : ''}`}
                >
                  <TableCellsIcon width={30} color={section == 0 ? '#1934B6' : ''} />
                  <p className={section == 0 ? 'text-blue-800' : ''}>Reserve</p>
                </div>
                <div onClick={() => { setSection(1) }}
                  className={`flex flex-col items-center cursor-pointer ${section == 0 ? '' : 'border-b-2 border-[#1934B6]'}`}
                >
                  <TableCellsIcon width={30} color={section == 0 ? '' : '#1934B6'} />
                  <p className={section == 0 ? '' : 'text-blue-800'}>Appointments</p>
                </div>
              </div>
            </div>
        </main>
    </div>
    
  );
}
