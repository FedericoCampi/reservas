import Image from 'next/image';
import successGif from '../../../public/successGIF.gif';

const ShiftConfirmed = () => {
    return(
        <div>
            <Image src={successGif} alt="successGif" />
        </div>
    )
}
export default ShiftConfirmed;