import { FileContext } from "../../context/FileContext";
import "./FileContent.css";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

const FileContent = () => {
  const { folders, selectedFolder } = useContext(FileContext);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

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
    } catch (error) {
      console.log(error);
    }
  };

  const getFiles = async () => {
    const user = localStorage.getItem("user");
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/files/getFiles/${user}/${selectedFolder}`,
        {
          withCredentials: true,
        }
      );
      setFiles(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFiles();
  }, [selectedFolder]);

  return (
    <div className="filecontent">
      <div className="fc-box">
        <div className="fc-header">
          <h2 className="fc-name">{selectedFolder}:</h2>
          <div className="fc-addfiles">
                <button className={`fc-add ${file ? 'fc-add-show' : ''}`} onClick={handleUploadClick}>Add</button>
                <label className="fc-input-label" for="fc-input">Select File</label>
                <input id="fc-input" type="file" onChange={handleFileChange} />
          </div>
        </div>
        <div className="fc-content">
            {files && files.map((file) => (
                <div key={file} className="fc-item">
                    {file}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FileContent;
