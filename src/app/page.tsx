'use client'

import { Progress } from "@/components/ui/progress"
import { PlusIcon, TableCellsIcon } from "@heroicons/react/16/solid";
import '@/styles/accordion.css'
import { useEffect, useRef, useState } from "react";
import servicesData from '@/mocks/services.json';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Home() {

  const categories = Array.from(new Set(servicesData.services.map(service => service.category)));
  const [seleccionado, setSeleccionado] = useState(false);
  const [selectedService, setSelectedService] = useState(0);
  const dataServicios = servicesData.services;

  const handleSelectService = (servicioId:number) => {
      
      if(selectedService !== 0){
        setSelectedService(0);
        setSeleccionado(false);
      }else{
        setSelectedService(servicioId);
        setSeleccionado(true);
      }
  }


  return (
    <main className={`bg-neutral-200 min-h-screen w-full pb-20 ${seleccionado && ' pb-40 '}`}>
      <div className="h-[15%] w-full">
          <div className="p-6">
            <p>Select service</p>
            <Progress value={80} />
        </div>
      </div>
      <div className="h-[65%] w-full px-8">
        <div className="border border-1 border-black h-auto w-full px-4 py-6">
          <p className="pb-2">Categories</p>

          <Accordion type="single" collapsible className="w-full">
            {categories.map((category, index) => {

              const filteredServicios = dataServicios.filter(servicio => servicio.category === category);
              
              return(
                <AccordionItem
                  key={category}
                  value={`item-${dataServicios[index].id.toString()}`}
                >
                  <AccordionTrigger>{category}</AccordionTrigger>
                  <AccordionContent>
                    {filteredServicios.map((servicio, index) => (
                      
                      <div key={servicio.id} className="border border-1 border-black p-1 my-2 space-y-2">
                        <p>{servicio.name}</p>
                        <p>{servicio.description}</p>
                        <div className="w-full flex justify-end">
                            <button
                              onClick={() => handleSelectService(servicio.id)}
                              disabled={seleccionado && selectedService !== servicio.id}
                              className={`p-2 m-1 ${seleccionado == false ? 'hover:bg-neutral-600 hover:text-black' : ''} ${seleccionado && selectedService === servicio.id ? 'bg-neutral-800 text-white hover:bg-neutral-600 hover:text-black' : 'bg-neutral-400 text-black'}`}
                            >
                              {seleccionado && selectedService === servicio.id ? "Selected" : "Select"}
                            </button>
                        </div>
                      </div>
                      
                    ))}
                    </AccordionContent>
                </AccordionItem>            
              )
            })}
          </Accordion>
        </div>
      </div>
      <div className="w-full fixed bottom-0 bg-neutral-200">
      {
          seleccionado && (
            <div className="w-full flex justify-end pr-8 py-2 border border-black">
              <button className="bg-neutral-800 text-white p-2 hover:bg-neutral-500 hover:text-black">
                Next
              </button>
            </div>
            
          )
        }
        <div className="w-full flex justify-center space-x-10 py-1">
          <div className="flex flex-col items-center">
            <TableCellsIcon width={30} color={'#1934B6'}/>
            <p className="text-blue-800">Reserve</p>
          </div>
          <div className="flex flex-col items-center">
            <TableCellsIcon width={30}/>
            <p>My shifts</p>
          </div>
        </div>
      </div>
    </main>
  );
}
