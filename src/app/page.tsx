'use client'

import { Progress } from "@/components/ui/progress"
import { TableCellsIcon } from "@heroicons/react/16/solid";
import '@/styles/accordion.css'
import { useEffect, useState } from "react";
import Categories from "@/components/customComponents.tsx/categories";
import SelectTime from "@/components/customComponents.tsx/selectTime";
import { BrowserRouter } from "react-router-dom";

export default function Home() {

  const [seleccionado, setSeleccionado] = useState(false);
  const [showInterfaces, setShowInterfaces] = useState(0);
  const [selectTime, setSelectTime] = useState(false);
  const titles = ['Select service', 'Select schedule', 'Confirm shift'];
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  const handleSelectChange = (categoryId:number) => {
    if(categoryId == 0){
      setSeleccionado(false);
    }else{
      setSeleccionado(true);
    }
    setSelectedCategoryId(categoryId);
  };

  const goBack = () => {
    setShowInterfaces(showInterfaces - 1);
  };

  const goNext = () => {
    setShowInterfaces(showInterfaces + 1);
  };

  useEffect(() => {
    if(showInterfaces == 0 && seleccionado == false){
      setSeleccionado(false);
    }
  },[showInterfaces]);

  return (
    <main className={`bg-neutral-200 min-h-screen w-full pb-20 ${seleccionado && ' pb-40 '}`}>
      <BrowserRouter>
        <div className="h-[15%] w-full">
            <div className="p-6">
              <p>{titles[showInterfaces]}</p>
              <Progress value={80} />
          </div>
        </div>
        <div className="h-[65%] w-full px-8">
          
          {showInterfaces === 0 ? (
              <Categories onSelectChange={handleSelectChange}/>
            ) : showInterfaces === 1 ? (
              <SelectTime />
            ) : showInterfaces === 2 ? (
              <div>Elemento 3</div>
            ) : (
              null
          )}
        </div>
        <div className="w-full fixed bottom-0 bg-neutral-200">
          {
            seleccionado && (
              <div className="w-full flex justify-between px-8 py-2 border-t border-b border-black">
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
                <button onClick={goNext}
                  disabled={selectTime == false && showInterfaces !== 0}
                  className={`${selectTime == false && showInterfaces !== 0 ? 'bg-neutral-400 text-black p-2' : 'bg-neutral-800 text-white p-2 hover:bg-neutral-500 hover:text-black'} '`}>
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
      </BrowserRouter>
    </main>
  );
}
