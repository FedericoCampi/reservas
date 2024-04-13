'use client'

import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import servicesData from '@/mocks/services.json';
import { useRouter } from 'next/navigation';

interface CategoriesProps {
    onSelectChange: (categoryId: number) => void;
}

const Categories = ({ onSelectChange }: CategoriesProps) => {

    const router = useRouter();
  
    // const navigate = useNavigate();
    const categories = Array.from(new Set(servicesData.services.map(service => service.category)));
    const dataServicios = servicesData.services;
    const [seleccionado, setSeleccionado] = useState(false);
    const [selectedService, setSelectedService] = useState(0);

    const handleSelectService = (servicioId:number) => {
      
        if(selectedService !== 0){
          setSelectedService(0);
          setSeleccionado(false);
          onSelectChange(0);
          router.push('/');
        }else{
          setSelectedService(servicioId);
          setSeleccionado(true);
          onSelectChange(servicioId);
          router.push(`/?category=${servicioId}`);
        }
    }

    useEffect(() => {

      if (typeof window !== 'undefined') {
        const queryParams = new URLSearchParams(window.location.search);
        const selectedCategory = Number(queryParams.get('category'));
        if (selectedCategory) {
            setSelectedService(selectedCategory);
            setSeleccionado(true);
            onSelectChange(selectedCategory);
        }
      }
        
    }, [onSelectChange]);

    return (
        <div className="border border-1 border-black h-auto w-full px-4 py-5">
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
    );
};

export default Categories;