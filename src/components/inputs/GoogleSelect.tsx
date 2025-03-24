import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface Props{
    id: string,
    label:string,
    options: {key: string, value: string}[],
    disabled?: boolean,
    value?:string,
    onChange?:(value:string) => void,
}
export default function GoogleSelect({id, label, disabled, value, onChange, options}: Props){
    return(
        <div className="py-1 relative">
            <Label htmlFor={id} className="absolute -top-2 left-4 px-2 py-0.5 bg-white rounded-b-xl">
                {label}
            </Label>
            <Select onValueChange={onChange}>
                <SelectTrigger
                    disabled={disabled} className="w-full border-neutral-400">
                    <SelectValue placeholder={value ? value: label} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option, index) => (
                        <SelectItem key={index} value={option.value}>{option.key}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

        </div>
    )
}