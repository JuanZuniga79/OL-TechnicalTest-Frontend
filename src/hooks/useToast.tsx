import { toast } from "sonner";

const duration = 3000;

interface IToastProps extends IToast {
    type: "error" | "success" | "info" | "warning" | "default" | "none" | "";
}

interface IToast {
    title: string;
    description?: string;
}

const error = ({ title, description }: IToast) => {
    toast.error(title, {
        description: description,
        duration: duration,
        closeButton: true,
        classNames: {
            toast: "bg-red-200",
            title: "text-red-600",
            description: "text-red-600",
            closeButton: "border-red-600 text-red-600",
            icon: "text-red-600",
        },
    });
};

const info = ({ title, description }: IToast) => {
    toast.info(title, {
        description: description,
        duration: duration,
        closeButton: true,
        classNames: {
            toast: "bg-blue-200",
            title: "text-blue-600",
            description: "text-blue-600",
            closeButton: "border-blue-600 text-blue-600",
            icon: "text-blue-600",
        },
    });
};

const success = ({ title, description }: IToast) => {
    toast.success(title, {
        description: description,
        duration: duration,
        closeButton: true,
        classNames: {
            toast: "bg-green-100",
            title: "text-green-700",
            description: "text-green-700",
            closeButton: "border-green-700 text-green-700",
            icon: "text-green-700",
        },
    });
};

export default function useToast() {
    const launchToast = ({ title, type, description }: IToastProps) => {
        switch (type) {
            case "info":
                info({ title, description });
                break;
            case "error":
                error({ title, description });
                break;
            case "success":
                success({ title, description });
                break;
        }
    };

    return {
        launchToast,
    };
}