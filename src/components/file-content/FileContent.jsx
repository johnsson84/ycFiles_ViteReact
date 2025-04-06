import { FileContext } from "../../context/FileContext";
import "./FileContent.css";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

const FileContent = () => {
    const { folders, selectedFolder, files, setFiles } =
        useContext(FileContext);
    const [file, setFile] = useState(null);
    const [fileToDelete, setFileToDelete] = useState(null);
    const [user, setUser] = useState(localStorage.getItem("user"));

    const handleUploadFile = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const uploadFile = async () => {
        if (!file) {
            console.log('no file selected')
            return;
        }

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
        } catch (error) {
            console.log(error);
        }
    };

    const deleteFile = async () => {
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

    const downloadFile = async (file) => {
        console.log(file);
        const options = {
            method: "GET",
            credentials: "include",
        };

        try {
            const res = await fetch(
                `${
                    import.meta.env.VITE_API_URL
                }/files/download/${user}/${selectedFolder}/${file}`,
                options
            );

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            // Convert to blob
            const blob = await res.blob();

            // URL for blob
            const url = window.URL.createObjectURL(blob);

            // Create an anchor element and set its attributes
            const a = document.createElement("a");
            a.href = url;
            a.download = file; // Set the filename to download

            // Append the anchor element to the body
            document.body.appendChild(a);

            // Programmatically click the anchor
            a.click();

            // Clean up: revoke the URL and remove the anchor element
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
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

    useEffect(() => {
        if(file) {
            uploadFile();
        }
    }, [file])

    const fileContentHeader = () => {
        return (
            <div className="fc-header">
                <img src="/src/assets/folder.svg" width="20rem" />
                <h2 className="fc-folder-name">{selectedFolder}</h2>
                <div className="fc-addfiles">
                    <label className="fc-upload" htmlFor="fc-input">
                        <img
                            src="src/assets/upload.svg"
                            width="30rem"
                            className="fc-upload"
                        />
                    </label>
                    <input
                        id="fc-input"
                        type="file"
                        onChange={handleUploadFile}
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
                                        className="fc-download"
                                        onClick={() => downloadFile(file)}
                                    >
                                        <img
                                            src="/src/assets/download.svg"
                                            height="30rem"
                                        />
                                    </button>
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
