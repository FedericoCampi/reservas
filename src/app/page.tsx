'use client'

import { Progress } from "@/components/ui/progress"
import { PlusIcon } from "@heroicons/react/16/solid";
import '@/styles/accordion.css'
import { useRef, useState } from "react";
import servicesData from '@/mocks/services.json';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Home() {

  const categories = Array.from(new Set(servicesData.services.map(service => service.category)));
  
  const dataServicios = servicesData.services;

  return (
    <main className="bg-neutral-200 w-full h-screen">
      <div className="h-[15%] w-full">
          <div className="p-6">
            <p>Seleccionar servicio</p>
            <Progress value={80} />
        </div>
      </div>
      <div className=" h-[75%] w-full px-8">
        <div className="border border-1 border-black h-auto w-full px-4 py-6">
          <p className="pb-2">Categorías</p>




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
                    {filteredServicios.map(servicio => (
                      <div key={servicio.id}>
                        <p>{servicio.name}</p>
                        <p>{servicio.description}</p>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>            
              )
            })}
          </Accordion>




        </div>
      </div>
      <div className=" h-[10%] w-full">
        
      </div>
    </main>
  );
}
