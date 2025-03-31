import { FileContext } from "../../context/FileContext";
import "./FileContent.css";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

const FileContent = () => {
    const { folders, selectedFolder, files, setFiles } =
        useContext(FileContext);
    const [file, setFile] = useState(null);
    const [fileToDelete, setFileToDelete] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = async () => {
        if (!file) {
            return;
        }

        const user = localStorage.getItem("user");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post(
                `${
                    import.meta.env.VITE_API_URL
                }/files/upload/${user}/${selectedFolder}`,
                formData,
                {
                    withCredentials: true,
                }
            );
            setFile(null);
            getFiles();
        } catch (error) {
            console.log(error);
        }
    };

    const getFiles = async () => {
        const user = localStorage.getItem("user");

        if (selectedFolder === "") {
            return;
        }

        try {
            const res = await axios.get(
                `${
                    import.meta.env.VITE_API_URL
                }/files/getFiles/${user}/${selectedFolder}`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setFiles(res.data);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteFile = async () => {
        const user = localStorage.getItem("user");

        const options = {
            method: "DELETE", // Specify the HTTP method
            credentials: "include", // Allow cookies to be sent with the request
            headers: {
                "Content-Type": "application/json", // Set the content type to JSON
            },
        };

        try {
            const res = await fetch(
                `${
                    import.meta.env.VITE_API_URL
                }/files/delete/${user}/${selectedFolder}/${fileToDelete}`,
                options
            );
            setFiles((prev) => prev.filter((file) => file !== fileToDelete));
            setFileToDelete(null);
        } catch (fetchError) {
            console.log(fetchError);
        }
    };

    const showDeleteFileBox = () => {
        return (
            <div className="fc-delFolder">
                <p>This will delete all files!</p>
                <div>
                    <button
                        className="fc-delFolder-buttons"
                        onClick={() => deleteFile()}
                    >
                        Yes
                    </button>
                    <button
                        className="fc-delFolder-buttons"
                        onClick={() => setFileToDelete(null)}
                    >
                        No
                    </button>
                </div>
            </div>
        );
    };

    useEffect(() => {
        getFiles();
    }, [selectedFolder, folders]);

    const fileContentHeader = () => {
        return (
            <div className="fc-header">
                <img src="/src/assets/folder.svg" width="20rem" />
                <h2 className="fc-folder-name">{selectedFolder}</h2>
                <div className="fc-addfiles">
                    <button
                        className={`fc-add ${file ? "fc-add-show" : ""}`}
                        onClick={handleUploadClick}
                    >
                        Add
                    </button>
                    <label className="fc-input-label" htmlFor="fc-input">
                        Select File
                    </label>
                    <input
                        id="fc-input"
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="filecontent">
            <div className="fc-box">
                {selectedFolder ? fileContentHeader() : null}
                <div className="fc-content">
                    {files &&
                        files.map((file) => (
                            <div className="fc-item-row">
                                <div className="fc-item-row2">
                                    <img
                                        src="/src/assets/file.svg"
                                        alt="file-icon"
                                        width="30rem"
                                    />
                                    <div key={file} className="fc-item">
                                        {file}
                                    </div>
                                    <button
                                        className="fc-delete"
                                        onClick={() => setFileToDelete(file)}
                                    >
                                        <img
                                            src="/src/assets/trash.svg"
                                            height="30rem"
                                        />
                                    </button>
                                </div>
                                {fileToDelete === file
                                        ? showDeleteFileBox()
                                        : null}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default FileContent;
