import {TableCell, TableHead} from "@/components/ui/table";
import {cn} from "@/lib/utils";
import {ReactNode} from "react";

interface Props{
    content: string,
    className?: string,
}
export function CustomTableHead({content, className}: Props){
    return(
        <TableHead className={cn("text-white font-bold flex items-center justify-center", className)}>
            {content}
        </TableHead>
    )
}
interface CellProps {
    children?: ReactNode;
    className?: string;
}
export function CustomTableCell({children, className}: CellProps){
    return(
        <TableCell className={cn("font-medium h-full flex items-center justify-center", className)}>
            {children}
        </TableCell>
    )
}