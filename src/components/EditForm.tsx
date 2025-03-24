"use client";
import GoogleInput from "@/components/inputs/GoogleInput";
import MunicipalitySelect from "@/components/inputs/MunicipalitySelect";
import {DatePicker} from "@/components/inputs/DatePicker";
import GoogleSelect from "@/components/inputs/GoogleSelect";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import statuses from "@/data/statuses.data";
import useToast from "@/hooks/useToast";
import useSession from "@/hooks/useSession";
import {clientRequest} from "@/api/request";
import Merchant, {CreateMerchant} from "@/types/IMerchant";
import {useRouter} from "next/navigation";
import Loader from "@/components/Loader";

export default function EditForm({id}: {id: string}){

    const {launchToast} = useToast()
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {data} = useSession();
    const [item, setItem] = useState<Merchant | null>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [municipalityId, setMunicipalityId] = useState(0);
    const [registeredAt, setRegisteredAt] = useState<Date | null>(null);
    const [statusId, setStatusId] = useState(0);

    useEffect(() => {
        if(!data) return;
        clientRequest.get(`/merchants/${id}`, data.access_token).then((response) => {
            const m_item = response.data.data[0] as Merchant;
            setItem(item);
            setName(m_item.name);
            setEmail(m_item.email || "");
            setPhone(m_item.phone || "");
            setStatusId(parseInt(statuses.find((s) => s.key === m_item.status)?.value || "0"))
        }).catch((error) => {
            console.log(error);
        })
    }, [data]);

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
        }else if(statusId===0){
            launchToast({title: "Debe elegir un estado", type: "error"});
            setLoading(false);
            return;
        }else if(!registeredAt){
            launchToast({title: "Debe ingresar una fecha de ingreso", type: "error"});
            setLoading(false);
            return;
        }
        clientRequest.put<CreateMerchant>(`/merchants/${id}`, {
            name: name,
            email: email,
            phone: phone,
            status_id: statusId,
            registered_at: registeredAt.toISOString(),
            municipality_id: municipalityId,
            establishments: []
        }, data.access_token).then(response => {
            launchToast({title: "Actualizado correctamente", type: "success"});
            setTimeout(() => router.back(), 1000);
        }).catch(error => {
            launchToast({title: error.response.data.message, type: "error"});
        }).finally(() => {
            setLoading(false);
        })
    }

    return(
        <>
            {loading && (
                <Loader className=""/>
            )}
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
                    <GoogleSelect id="estado" label="Estado" options={statuses} value={item?.status}
                                  onChange={(value)=> setStatusId(parseInt(value))} />
                </div>
            </form>
            <div className="flex justify-end pr-5 pb-5">
                <Button onClick={sendData}
                        variant="ghost" className="bg-green-600 hover:bg-green-400 text-black cursor-pointer">
                    Cargar
                </Button>
            </div>
        </>
    )
}