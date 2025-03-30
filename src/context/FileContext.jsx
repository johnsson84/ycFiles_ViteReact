import { createContext, useState } from "react";

export const FileContext = createContext();

export const FileProvider = ({children}) => {
    const [ folders, setFolders ] = useState([]);

    const [selectedFolder, setSelectedFolder] = useState("");

    return (
        <FileContext.Provider value={{ folders, setFolders, selectedFolder, setSelectedFolder }}>
            {children}
        </FileContext.Provider>
    );
};