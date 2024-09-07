import { createContext, useContext, useState } from 'react'
const AppContext = createContext()

function UseContext({ children }) {
    const [token, setToken] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("")
    return (
        <AppContext.Provider value={{ token, setToken, username, setUsername, role, setRole }}>
            {children}
        </AppContext.Provider>
    )
}
export { AppContext, UseContext }
const GlobalContext = () => {
    return useContext(AppContext)
}
export default GlobalContext