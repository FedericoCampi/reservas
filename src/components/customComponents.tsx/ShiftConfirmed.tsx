import Image from 'next/image';
import successGif from '../../../public/successGIF.gif';

const ShiftConfirmed = ({ goToAppointments }: { goToAppointments: () => void }) => {

    const anotherAppointment = () => {
        window.history.replaceState({}, '', '/');
        window.location.reload();
    }

    return(
        <div className='min-h-screen w-full'>
            <div className='min-h-screen w-full flex justify-center items-center flex-col pb-[250px]'>
                <Image src={successGif} alt="successGif" />
                <p className='pb-16'>Appointment confirmed</p>
                <button onClick={goToAppointments}
                    className='p-2 bg-neutral-800 text-white hover:bg-neutral-600 hover:text-black'>
                    My appointments
                </button>
                <button onClick={anotherAppointment}
                    className='mt-6 p-2 bg-green-700 text-black hover:bg-green-900 hover:text-white'>
                    Make another <br /> appointments
                </button>
            </div>
            
        </div>
    )
}
export default ShiftConfirmed;