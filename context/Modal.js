import { createContext ,useState } from 'react';


export const ModalContext = createContext();


const ModalContextProvider = ({children}) =>{
    const [showModal , setShowModal] = useState(false) 


    const modalValue = {showModal,setShowModal}
    return (
        <ModalContext.Provider value={modalValue}>
            {children}
        </ModalContext.Provider>
    )
}
export default ModalContextProvider;