'use client'
import Header from "@/components/semantic/Header";
import {BiLike} from "react-icons/bi";
import Image from "next/image";
import background from '@/assets/image/bg.png'
import GoogleInput from "@/components/inputs/GoogleInput";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import loginAction, {createSessionAction} from "@/actions/login.action";
import useToast from "@/hooks/useToast";
import {useState} from "react";
import loaderStore from "@/store/loader.store";
import Loader from "@/components/Loader";
import CryptoJS from "crypto-js";
import {redirect} from "next/navigation";
import sessionStore from "@/store/session.store";

export default function LoginPage(){

    const {launchToast} = useToast();
    const {setData} = sessionStore();
    const {loading, setLoading} = loaderStore()
    const secretKey = process.env.NEXT_PUBLIC_SESSION_SECRET;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [terms, setTerms] = useState<boolean>(false);

    const handler = async () => {
        setLoading(true);
        if(!terms || !secretKey){
            launchToast({title: "Terminos no aceptados", type: "error"})
            setLoading(false);
            return;
        }
        else if(email.length < 10 || (password.length < 8 || password.length > 16)){
            launchToast({title: "Datos incorrectos o vacios",
                description: "Contraseña entre 8 y 16 caracteres", type: "error"})
            setLoading(false);
            return;
        }
        const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
        const encryptedEmail = CryptoJS.AES.encrypt(email, secretKey).toString();
        const response = await loginAction({email: encryptedEmail, password: encryptedPassword})
            .catch((error) => {
                launchToast({title: error.message, type: "error"});
                setLoading(false);
                return undefined;
            })
        if(!response) return;
        launchToast({title: "Inicio de sesion correcto", type: "success"});
        setData(response);
        await createSessionAction(response)
            .then((res)=> {
            launchToast({title: res.message, type: "info"});
            setTimeout(()=>{
                setLoading(false);
                redirect('/app')
            }, 300)
        })
            .catch((error) => {
                launchToast({title: error.message, type: "error"});
                setLoading(false);
            })
    }

    return(
        <>
            {loading && (
                <Loader />
            )}
            <Header>
                <div className="flex items-center gap-x-3">
                    <figure className="p-1 text-amber-400 rounded-full bg-amber-800">
                        <BiLike size={24}/>
                    </figure>
                    <span className="font-semibold text-sm">Beneficios por renovar</span>
                </div>
            </Header>
            <main className="relative w-full h-full flex items-center justify-center">
                <div className="absolute top-0 left-0 w-full h-full z-0">
                    <Image src={background} alt="ai generated cat" width={1920} height={1080}
                           className="object-cover w-full h-full"/>
                </div>
                <div className="w-fit h-fit flex flex-col gap-y-4 z-10 items-center">
                    <h1 className="text-white text-2xl font-semibold">
                        Debes iniciar sesion para acceder a la plataforma
                    </h1>
                    <div className="w-[500px] h-[300px] bg-white rounded-xl">
                        <div className="w-full h-14 border-b-2 flex items-center justify-center text-center
                            flex-wrap px-8 py-2 shadow-md shadow-neutral-200">
                            <p className="font-light">Digite el correo electronico y la contraseña</p>
                        </div>
                        <form onSubmit={async (e)=> {
                            e.preventDefault();
                            await handler();
                        }} className="px-10 py-5 flex flex-col gap-y-4">
                            <GoogleInput id='email' label='Correo Electronico' type="email" value={email}
                                         onChange={(value)=> setEmail(value)}/>
                            <GoogleInput id="password" label="Contraseña" type="password" value={password}
                                         onChange={(value)=> setPassword(value)}
                                         minLength={8} maxLength={16}/>
                            <div className="flex items-center gap-x-2">
                                <Switch onClick={()=> setTerms(!terms)} id="terms" name="terms"/>
                                <Label htmlFor="terms">Acepto terminos y condiciones</Label>
                            </div>
                            <Button variant="ghost" className="h-10 bg-pink-500 hover:bg-pink-700 text-white
                                hover:text-white font-semibold text-lg cursor-pointer">
                                Iniciar Sesion
                            </Button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}