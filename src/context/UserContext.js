import { createContext, useContext, useState } from "react";

// Creation of Context
const EmailContext = createContext();
export const useEmail = () => useContext(EmailContext);

// Creation of Provider
export const EmailProvider = ({children}) => {
const [email,setEmail] = useState("");
const setEmailValue = (email) => {
    setEmail(email);        
}

return (
    <EmailContext.Provider value={{email,setEmailValue}}>
        {children}
    </EmailContext.Provider>
)
}