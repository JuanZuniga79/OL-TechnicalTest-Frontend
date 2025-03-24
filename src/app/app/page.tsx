'use client'
import {
    Table,
    TableBody, TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {CustomTableCell, CustomTableHead} from "@/components/table/Table";
import {useEffect, useState} from "react";
import {clientRequest} from "@/api/request";
import useSession from "@/hooks/useSession";
import {cn} from "@/lib/utils";
import IMerchant from "@/types/IMerchant"
import {formatDate} from "@/utils/date.utils";
import {FaCheckCircle, FaRegEdit, FaRegTrashAlt} from "react-icons/fa";
import {MdCancel} from "react-icons/md";
import {IoMdDownload} from "react-icons/io";
import Loader from "@/components/Loader";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import {Button} from "@/components/ui/button";

export default function AppPage(){

    const {data} = useSession();
    const router = useRouter();
    const {launchToast} = useToast();
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [top, setTop] = useState(5);
    const [items, setItems] = useState<IMerchant[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const getPages = () => Math.ceil((total < top ? top : total) / (items.length < top ? top : items.length));

    useEffect(() => {
        if(!data) return;
        setLoading(true);
        clientRequest.get(`/merchants?offset=${page*top}&top=${top}`, data.access_token).then((res)=> {
            setItems(res.data.data.data)
            setTotal(res.data.data.total)
        }).catch(err=>{
            launchToast({title: err.mensage as string, type: "error"});
        }).finally(()=> {
            setTimeout(()=> {
                setLoading(false);
            }, 200)
        });
    }, [data, page, top, refreshing]);

    const changeStatus = (id: number, status: string) => {
        setLoading(true);
        clientRequest
            .patch(`/merchants/${id}/status/${status === "activo" ? 2:1}`
                , data!.access_token)
            .then((response) => {
                setRefreshing(!refreshing);
            }).catch((error) => {
            console.log(error);
        }).finally(()=> {
            setLoading(false);
        })
    }

    const deleteItem = (id: number) => {
        setLoading(true);
        clientRequest.delete(`/merchants/${id}`, data!.access_token).then((response) => {
            setRefreshing(!refreshing);
        }).catch((error) => {
            console.log(error);
        }).finally(()=> {
            setLoading(false);
        })
    }

    const downloadCSV = () => {
        setLoading(true);
        clientRequest.getFile('/merchants/generate/csv', data!.access_token)
            .then((response) => {
                const res = response.data;
                try {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement("a");
                    link.href = url;
                    const contentDisposition = response.headers["content-disposition"];
                    let fileName = "mercaderes.csv";
                    if (contentDisposition) {
                        const match = contentDisposition.match(/filename="(.+?)"/);
                        if (match) fileName = match[1];
                    }
                    link.setAttribute("download", fileName);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    window.URL.revokeObjectURL(url);
                }catch(err) {
                    console.log(err);
                }
            })
            .catch((error) => {
                console.log(error);
            }).finally(()=> {
                setLoading(false);
        })
    }

    return(
        <>
            <main>
                {loading && (
                    <Loader/>
                )}
                <div className="border-b-[2px] py-5 px-10">
                    <h3 className="font-semibold capitalize text-2xl text-blue-800">Listar Formularios Creados</h3>
                </div>
                <div className="w-full h-full flex flex-col gap-y-4 px-20 py-10">
                    <div className="flex items-center justify-end gap-x-5">
                        <Button onClick={()=> router.push('/app/crear')}
                                variant="ghost" className="border-[1px] border-pink-600 bg-pink-600
                            cursor-pointer hover:text-white hover:bg-pink-700 text-white">
                            Crear nuevo formulario
                        </Button>
                        <Button onClick={()=> downloadCSV()}
                                variant="ghost" className="text-pink-700 border-[1px] border-pink-600 hover:bg-pink-600
                        cursor-pointer hover:text-white">
                            Descargar reporte en CSV
                        </Button>
                    </div>
                    <Table className="shadow-neutral-200 shadow-md border-2 border-neutral-400">
                        <TableHeader className="bg-blue-500">
                            <TableRow className="grid grid-cols-8 items-center">
                                <CustomTableHead content="Razon Social" className="border-r-2"/>
                                <CustomTableHead content="Telefono" className="border-r-2"/>
                                <CustomTableHead content="Email" className="col-span-2 border-r-2" />
                                <CustomTableHead content="Fecha Registro" className="border-r-2"/>
                                <CustomTableHead content="No. Establecimiento" className="border-r-2"/>
                                <CustomTableHead content="Estado" className="border-r-2"/>
                                <CustomTableHead content="Acciones"/>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow key={index} className={cn("grid grid-cols-8 items-center",
                                    index%2==0 ? "bg-neutral-100" : "bg-white")}>
                                    <CustomTableCell className="border-r-2">{item.name}</CustomTableCell>
                                    <CustomTableCell className="border-r-2">{item.phone || ""}</CustomTableCell>
                                    <CustomTableCell className="col-span-2 border-r-2">{item.email || ""}</CustomTableCell>
                                    <CustomTableCell className="border-r-2">
                                        {formatDate(item.registered_at)}
                                    </CustomTableCell>
                                    <CustomTableCell className="border-r-2">{item.establishments.length}</CustomTableCell>
                                    <CustomTableCell className="border-r-2 flex justify-center">
                                        <figure onClick={()=> {
                                            changeStatus(item.id, item.status);
                                        }}
                                                className={cn("px-3 py-0.5 rounded-lg capitalize w-fit h-fit border-[1px] " +
                                                    "hover:text-white cursor-pointer",
                                                    item.status === "activo" ? "border-green-600 text-green-600 hover:bg-green-400" :
                                                        "border-red-600 text-red-600 hover:bg-red-400")}>
                                            {item.status}
                                        </figure>
                                    </CustomTableCell>
                                    <CustomTableCell className="flex items-center justify-evenly gap-x-1">
                                        <FaRegEdit onClick={()=> router.push(`/app/${item.id}`)}
                                                   className="cursor-pointer" size={18} />
                                        <figure onClick={()=> {
                                            changeStatus(item.id, item.status);
                                        }} className="cursor-pointer">
                                            {item.status === "activo" ? (
                                                <MdCancel size={20} className="text-red-600"/>
                                            ): (
                                                <FaCheckCircle size={18} className="text-green-600"/>
                                            )}
                                        </figure>
                                        {data!.user.role === 'administrador' && (
                                            <FaRegTrashAlt className="cursor-pointer" onClick={()=> deleteItem(item.id)}
                                                           size={17} />
                                        )}
                                        <IoMdDownload size={20} />
                                    </CustomTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex items-center justify-start gap-x-5">
                        <span>items:</span>
                        <select onChange={(e) => {
                            const value = e.currentTarget.value;
                            setTop(parseInt(value));
                        }} className="border-[1px] px-3 py-0.5">
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                        </select>
                        <div className="flex items-stretch">
                            <button disabled={page === 0}
                                    className="border-[1px] w-7 h-7 flex items-center justify-center text-sm bg-blue-600
                            text-white disabled:bg-gray-500 cursor-pointer">
                                {"<"}
                            </button>
                            {Array.from({length: getPages()}).map((_, index) => (
                                <button onClick={()=> {
                                    if(page === index) return;
                                    setPage(index);
                                }} key={index} className={cn("border-[1px] w-7 h-7 flex items-center justify-center " +
                                    "text-sm cursor-pointer", page === index && "bg-blue-400 text-white")}>
                                    {index+1}
                                </button>
                            ))}
                            <button disabled={page+1 === getPages()}
                                    className="border-[1px] w-7 h-7 flex items-center justify-center text-sm bg-blue-600
                            text-white disabled:bg-gray-500 cursor-pointer">
                                {">"}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="absolute bottom-0 left-0 w-full bg-blue-800 h-20 flex items-center justify-center
                capitalize text-white font-semibold">
                prueba tecnica de uso exclusivo de OLSoftware S.A
            </footer>
        </>
    )
}