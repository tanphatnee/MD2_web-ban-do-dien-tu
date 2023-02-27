import { createContext, useState } from "react";

export const ModalContext = createContext();

function ModalProvider({ children }) {

    const [isLogin, setIsLogin] = useState(false);

    const handleModalOpen = () => setIsLogin(true);
    const handleModalOff = () => setIsLogin(false);

    const data = {
        isLogin,
        handleModalOff,
        handleModalOpen
    }

    return (
        <ModalContext.Provider value={data}>
            {children}
        </ModalContext.Provider>
    )
}
export default ModalProvider;