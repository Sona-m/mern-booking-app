import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import { validateToken } from "../api-client";


type ToastMessage = {
    message: string;
    type: 'SUCCESS' | 'ERROR'
}

type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedin: boolean;
}

const appContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: any) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    const { isError, isSuccess } = useQuery('validateToken', validateToken, { retry: false });
    const isLoggedin = isSuccess && !isError;

    return (
        <appContext.Provider value={{
            showToast: (toastMessage) => {
                setToast(toastMessage)
            },
            isLoggedin: isLoggedin
        }}>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />}
            {children}
        </appContext.Provider>
    );
};

//custom hook
export const useAppContext = () => {
    const context = useContext(appContext);
    return context as AppContext;
};