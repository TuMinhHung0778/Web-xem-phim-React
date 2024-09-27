import { createContext ,useState } from 'react';


export const AnimationContext = createContext();


const AnimationContextProvider = ({children}) =>{
    const [showAnimation , setShowAnimation] = useState(false) 
    const handleAnimation = ()=>{
        setShowAnimation(true)
        setTimeout(() => {
            setShowAnimation(false)
        },5000);
    }

    const AnimationValue = {showAnimation,setShowAnimation,handleAnimation}
    return (
        <AnimationContext.Provider value={AnimationValue}>
            {children}
        </AnimationContext.Provider>
    )
}
export default AnimationContextProvider;