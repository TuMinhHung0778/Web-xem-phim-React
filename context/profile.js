import { createContext ,useState , useEffect} from 'react';


export const ProfileContext = createContext();


const ProfileContextProvider = ({children}) =>{
    const [profile , setProfile] = useState(null) 
    const [isAuthenticated,setIsAuthenticated] = useState(false)

    const handleAuth = (profile) =>{
        setProfile(profile);
        setIsAuthenticated(true)
        localStorage.setItem('profile',profile)
    }

    const Logout = () =>{
        localStorage.removeItem('profile')
        setProfile(null);
        setIsAuthenticated(false)
    }
    useEffect(() =>{
        if(localStorage.getItem('profile')){
            setProfile(localStorage.getItem('profile'));
            setIsAuthenticated(true)
        }
    },[])
    const ProfileValue = {isAuthenticated,profile,setProfile,handleAuth,Logout}
    return (
        <ProfileContext.Provider value={ProfileValue}>
            {children}
        </ProfileContext.Provider>
    )
}
export default ProfileContextProvider;