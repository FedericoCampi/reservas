import servicesData from '@/mocks/services.json';
import slots from '@/mocks/slots.json';
import { format } from 'date-fns';

interface ComfirmShiftProps {
    category: number;
    schedule: string;
}

const Confirm = ({ category, schedule }: ComfirmShiftProps) => {

    const service = servicesData.services.find(service=> service.id === category);
    
    const fechaOriginal = slots.date;
    const fecha = new Date(fechaOriginal);
    const fechaFormateada = format(fecha, 'dd/MM/yyyy');

 return(
    <div className="border border-1 border-black h-auto w-full px-4 py-5">
        <p>Service: {service?.name}</p>
        <p>Date: {fechaFormateada} {schedule}</p>
    </div>
 )
}

export default Confirm;