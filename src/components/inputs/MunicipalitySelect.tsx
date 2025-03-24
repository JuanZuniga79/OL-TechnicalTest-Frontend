"use client"
import GoogleSelect from "@/components/inputs/GoogleSelect";
import useSession from "@/hooks/useSession";
import {useEffect, useState} from "react";
import {clientRequest} from "@/api/request";
import Country, {Municipality} from "@/types/IMunicipality";

interface KeyValue{
    key: string;
    value: string;
}
interface Props{
    onChange?: (value: string) => void;
}
export default function MunicipalitySelect({onChange}: Props){

    const {data} = useSession();
    const [items, setItems] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<number>(0);
    const [countries, setCountries] = useState<KeyValue[]>([]);
    const [municipalities, setMunicipalities] = useState<KeyValue[]>([]);

    useEffect(() => {
        if(!data) return;
        clientRequest.get('/municipality', data.access_token).then((res) => {
            const data = res.data.data as Country[];
            setItems(data);
            const c_items:KeyValue[] = []
            data.map(country => {
                c_items.push({
                    key: country.name,
                    value: country.id.toString(),
                })
            })
            setCountries(c_items);
        }).catch((error) => {
            console.log(error);
        })
    }, [data]);

    useEffect(() => {
        if(selectedCountry===0)return;
        const m_items: KeyValue[] =[]
        items.forEach(country => {
            if(selectedCountry === country.id){
                country.municipalities.forEach((m) => {
                    m_items.push({
                        key: m.name,
                        value: m.id.toString()
                    })
                })
                return;
            }
        })
        setMunicipalities(m_items);
    }, [selectedCountry]);

    return(
        <>
            <GoogleSelect onChange={(value)=> setSelectedCountry(parseInt(value))}
                          id="country" label="Pais" options={countries}/>
            <GoogleSelect onChange={(value)=> {
                if(onChange){
                    onChange(value);
                }
            }} id="municipality" label="Municipios" options={municipalities} disabled={selectedCountry == 0} />
        </>
    )
}