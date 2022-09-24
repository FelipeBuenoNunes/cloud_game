import React, { createContext, ReactNode, useContext, useState } from "react";

const UserContext = createContext()

const UserContextProvider = ({ children }) => {
    const [bueno, setBueno] = useState("");
    return (
        <UserContext.Provider
            value={{
                bueno,
                setBueno,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContextProvider }
export const useUser = () => useContext(UserContext)