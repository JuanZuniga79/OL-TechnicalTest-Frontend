"use server";

import EditForm from "@/components/EditForm";

export default async function EditPage({params}: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return(
        <main className="bg-indigo-50 w-full h-full">
            <div className="py-5 px-10 bg-indigo-100/50">
                <h3 className="font-semibold capitalize text-4xl text-blue-900">Editar mercader</h3>
            </div>
            <div className="py-5 px-10 flex items-center justify-center">
                <div className="border-[2px] rounded-lg bg-white">
                    <div className="py-4 px-10 border-b-[2px] flex items-center justify-start text-blue-900
                            font-bold text-2xl">
                        Datos Generales
                    </div>
                    <EditForm id={id}/>
                </div>
            </div>
        </main>
    )
}