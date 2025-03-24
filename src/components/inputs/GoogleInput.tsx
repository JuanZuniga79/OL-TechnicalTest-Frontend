import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

interface Props{
    id: string,
    label:string,
    type?:string,
    value?:string,
    onChange?:(value:string) => void,
    minLength?:number,
    maxLength?:number,
}
export default function GoogleInput({label, id, type, value, onChange, minLength, maxLength}: Props) {
    return(
        <div className="py-1 relative">
            <Label htmlFor={id} className="absolute -top-2 left-4 px-2 py-0.5 bg-white rounded-b-xl">
                {label}
            </Label>
            <Input value={value} onChange={(value) => {
                if(!onChange) return;
                onChange(value.currentTarget.value);
            }}  minLength={minLength} maxLength={maxLength}
                type={type || "text"} name={id} id={id} className="focus-visible:ring-0 border-neutral-400" />
        </div>
    )
}