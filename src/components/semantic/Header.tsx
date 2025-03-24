import Image from 'next/image'

interface Props {
    children?: React.ReactNode
}
export default function Header({children}: Props) {
    return(
        <header className='h-16 bg-white px-10 py-2 flex items-center justify-between gap-x-5 shadow-md
            shadow-neutral-200'>
            <Image
                width={64} height={64}
                 src="https://olsoftware.com/wp-content/uploads/2021/04/Logo-OL-Software-2-02-150x150.png"
                 className="custom-logo" alt="OL Software" decoding="async"/>
            {children}
        </header>
    )
}