import {getSession} from "@/lib/session";
import {redirect} from "next/navigation";
import Header from "@/components/semantic/Header";
import {BiLike} from "react-icons/bi";
import Link from "next/link";
import {AuthResponse, User} from "@/api/types/ISession.type";
import {CiUser} from "react-icons/ci";
import SessionStore from "@/store/session.store";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {logoutAction} from "@/actions/login.action";

interface Props{
    children: React.ReactNode
}
export default async function AppLayout({children}: Props){

    const session = await getSession();
    if (!session) redirect('./login')
    const data: AuthResponse = session.data as AuthResponse;
    const user: User = data.user;

    return(
        <>
            <Header>
                <div className="w-[70%] flex items-center gap-x-2 justify-between h-full">
                    <ul className="w-full flex items-center gap-x-2 justify-evenly h-[80%]">
                        <li>
                            <Link href="/app" className="flex items-center gap-x-2">
                                <figure className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                    1
                                </figure>
                                Listar Formulario
                            </Link>
                        </li>
                        <figure className="w-[1px] h-full bg-gray-700"/>
                        <li>
                           <Link href="/app/crear" className="flex items-center gap-x-2">
                               <figure className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                    2
                               </figure>
                               Crear Formulario
                           </Link>
                        </li>
                    </ul>
                    <div className="flex items-center gap-x-3 flex-nowrap w-fit text-nowrap">
                        <figure className="p-1 text-amber-400 rounded-full bg-amber-800">
                            <BiLike size={18}/>
                        </figure>
                        <span className="font-semibold text-sm">Beneficios por renovar</span>
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger>
                        <div className="flex items-center gap-x-2 cursor-pointer">
                            <figure className="w-12 h-12 flex items-center justify-center rounded-full border-[1px]
                        text-neutral-400 overflow-hidden">
                                <CiUser size={60} className="mt-4"/>
                            </figure>
                            <div className="flex flex-col items-start gap-y-0 font-light text-sm -space-y-1">
                                <h2 className="text-blue-800 font-semibold text-base">Bienvenido!</h2>
                                <p>{user.name}</p>
                                <p>{user.role}</p>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="w-[400px]">
                        <DialogHeader>
                            <DialogTitle>Desea cerrar sesion?</DialogTitle>
                            <DialogDescription>
                                Recuerde que esta es una accion que no puede ser cancelada.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <form action={logoutAction}>
                                <Button variant="ghost" className="bg-blue-500 hover:bg-blue-600 text-white
                                hover:text-white cursor-pointer">
                                    Cerrar
                                </Button>
                            </form>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </Header>
            {children}
        </>
    )
}