import { createContext, useState } from "react";

export const FileContext = createContext();

export const FileProvider = ({children}) => {
    const [ folders, setFolders ] = useState([]);
    const [ files, setFiles ] = useState([]);
    const [ selectedFolder, setSelectedFolder ] = useState("");

    return (
        <FileContext.Provider value={{ folders, setFolders, selectedFolder, setSelectedFolder, files, setFiles }}>
            {children}
        </FileContext.Provider>
    );
};