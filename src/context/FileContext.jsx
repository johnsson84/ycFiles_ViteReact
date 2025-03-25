import { createContext, useState } from "react";

export const FileContext = createContext();

export const FileProvider = ({children}) => {
    const [ folders, setFolders ] = useState([
        {name: 'Upload'},
        {name: 'Crap'},
    ]);

    const [selectedFolder, setSelectedFolder] = useState("Upload");

    return (
        <FileContext.Provider value={{ folders, setFolders, selectedFolder, setSelectedFolder }}>
            {children}
        </FileContext.Provider>
    );
};