"use client";
import Loader from "@/components/Loader";
import {useState} from "react";
import GoogleInput from "@/components/inputs/GoogleInput";
import MunicipalitySelect from "@/components/inputs/MunicipalitySelect";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import useSession from "@/hooks/useSession";
import {clientRequest} from "@/api/request";
import {CreateMerchant} from "@/types/IMerchant";
import useToast from "@/hooks/useToast";
import {DatePicker} from "@/components/inputs/DatePicker";
import GoogleSelect from "@/components/inputs/GoogleSelect";
import statuses from "@/data/statuses.data";

export default function CreateMerchantView(){

    const {data} = useSession();
    const {launchToast} = useToast()
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [status_id, setStatusId] = useState<number>(0);
    const [registeredAt, setRegisteredAt] = useState<Date | null>(null);
    const [municipalityId, setMunicipalityId] = useState(0);

    const sendData = () => {
        if(!data) return;
        setLoading(true);
        if(name.length < 3){
            launchToast({title: "Debe ingresar un nombre", type: "error"});
            setLoading(false);
            return;
        }else if(email.length > 0 && !(/^[a-zA-Z0-9._%+-]+@(gmail\.|hotmail\.|outlook\.)[a-z]{2,}$/.test(email))){
            launchToast({title: "El formato de email es incorrecto", type: "error"});
            setLoading(false);
            return;
        }else if(phone.length > 0 && phone.length !== 10){
            launchToast({title: "Los telefonos celulares solo tienen 10 digitos", type: "error"});
            setLoading(false);
            return;
        }else if(status_id===0){
            launchToast({title: "Debe elegir un estado", type: "error"});
            setLoading(false);
            return;
        }else if(!registeredAt){
            launchToast({title: "Debe ingresar una fecha de ingreso", type: "error"});
            setLoading(false);
            return;
        }
        clientRequest.post<CreateMerchant>('/merchants', {
            name: name,
            email: email,
            phone: phone,
            status_id,
            registered_at: registeredAt.toISOString(),
            municipality_id: municipalityId,
            establishments: []
        }, data.access_token).then(response => {
            launchToast({title: "Creado correctamente", type: "success"});
            setTimeout(() => window.location.reload(), 1000);
        }).catch(error => {
            launchToast({title: error.response.data.message, type: "error"});
        }).finally(() => {
            setLoading(false);
        })
    }

    return(
        <>
            {loading && (
                <Loader/>
            )}
            <main className="bg-indigo-50 w-full h-full">
                <div className="py-5 px-10 bg-indigo-100/50">
                    <h3 className="font-semibold capitalize text-4xl text-blue-900">Formulario crear</h3>
                </div>
                <div className="py-5 px-10 flex items-center justify-center">
                    <div className="border-[2px] rounded-lg bg-white">
                        <div className="py-4 px-10 border-b-[2px] flex items-center justify-start text-blue-900
                            font-bold text-2xl">
                            Datos Generales
                        </div>
                        <form className="flex gap-4 w-[1000px] py-5 px-12 relative h-full">
                            <div className='w-full flex flex-col gap-4'>
                                <GoogleInput id='name' label="Razon social *" value={name}
                                             onChange={(value) => setName(value)} />
                                <MunicipalitySelect onChange={(value)=> setMunicipalityId(parseInt(value))} />
                                <DatePicker onChange={(value) => setRegisteredAt(value)} />
                            </div>
                            <figure className="w-[2px] h-[240px] bg-gray-400"/>
                            <div className="w-full flex flex-col gap-4">
                                <GoogleInput id="emai" label="Correo Electronico" type="email" value={email}
                                    onChange={(value)=> setEmail(value)} />
                                <GoogleInput id="phone" label="Telefono" type="tel" value={phone}
                                             onChange={(value)=> setPhone(value)} />
                                <GoogleSelect id="estado" label="Estado" options={statuses}
                                              onChange={(value)=> setStatusId(parseInt(value))} />
                                <div className="flex items-center gap-x-2">
                                    <input type="checkbox" id="check" name="check"/>
                                    <Label className="font-light text-sm" htmlFor="check"> Posee establecimientos?</Label>
                                </div>
                            </div>
                        </form>
                        <div className="flex justify-end pr-5 pb-5">
                            <Button onClick={sendData}
                                variant="ghost" className="bg-green-600 hover:bg-green-400 text-black cursor-pointer">
                                Cargar
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}