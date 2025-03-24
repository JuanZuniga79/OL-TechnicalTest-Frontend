import '../styles/loader.css'
import {cn} from "@/lib/utils";
interface Props{
    className?: string;
}
export default function Loader({className}: Props){
    return (
        <div className="fixed top-0 h-dvh w-dvw left-0 flex items-center justify-center z-50 bg-gray-700/80
            backdrop-blur-md">
            <div className={cn(`flex items-center justify-center`, className ? className : 'w-20 h-20')}>
                <div id="wifi-loader" className='scale-125'>
                    <svg className="circle-outer" viewBox="0 0 86 86">
                        <circle className="back" cx="43" cy="43" r="40"></circle>
                        <circle className="front" cx="43" cy="43" r="40"></circle>
                        <circle className="new" cx="43" cy="43" r="40"></circle>
                    </svg>
                    <svg className="circle-middle" viewBox="0 0 60 60">
                        <circle className="back" cx="30" cy="30" r="27"></circle>
                        <circle className="front" cx="30" cy="30" r="27"></circle>
                    </svg>
                    <svg className="circle-inner" viewBox="0 0 34 34">
                        <circle className="back" cx="17" cy="17" r="14"></circle>
                        <circle className="front" cx="17" cy="17" r="14"></circle>
                    </svg>
                    <div className="text" data-text="Cargando"></div>
                </div>
            </div>
        </div>
    )
}