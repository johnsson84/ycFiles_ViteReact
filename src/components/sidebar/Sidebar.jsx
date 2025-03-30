import { FileContext } from "../../context/FileContext";
import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const { folders, setFolders, setSelectedFolder, selectedFolder } =
    useContext(FileContext);
  const [showFolderBox, setShowFolderBox] = useState(false);
  const [newFolder, setNewFolder] = useState('');

  const selectFolder = (e) => {
    setSelectedFolder(e);
  };

  const addFolderBox = () => {
    return (
      <div
        className={`sb-folderbox ${showFolderBox ? "sb-show-folderbox" : ""}`}
      >
        <input 
          className="sb-folderbox-input" 
          placeholder="Folder name"
          value={newFolder} 
          onChange={(e) => setNewFolder(e.target.value)} 
          />
        <button id="sb-folderbtn-1" className="sb-folderbox-buttons" onClick={() => addFolder()}>
          Add
        </button>
        <button
          id="sb-folderbtn-2"
          className="sb-folderbox-buttons"
          onClick={() => setShowFolderBox(false)}
        >
          &#8673;
        </button>
      </div>
    );
  };

  const getFolder = async () => {
    const user = localStorage.getItem("user");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/files/getFolders/${user}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFolders((prev) => [
        ...prev,
        ...res.data
          .filter(
            (folderName) => !prev.some((folder) => folder.name === folderName)
          )
          .map((folderName) => ({ name: folderName })),
      ]);
      
    } catch (fetchError) {
      console.log(fetchError);
    }
  };

  const addFolder = async () => {
    const user = localStorage.getItem("user");

    const options = {
      method: "POST", // Specify the HTTP method
      credentials: "include", // Allow cookies to be sent with the request
      headers: {
        "Content-Type": "application/json" // Set the content type to JSON
      }
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/files/addFolder/${user}/${newFolder}`, options)
      getFolder();
      setShowFolderBox(false);
      setNewFolder('');
    } catch (fetchError) {
      console.log(fetchError);
    }
  };

  useEffect(() => {
    getFolder();
  }, []);

  useEffect(() => {
    console.log(folders);
    if (folders && folders.length > 0 && selectedFolder === '') {
      setSelectedFolder(folders[0].name)
    };
  }, [folders])

  return (
    <div className="sidebar">
      <nav className="sb-nav">
        <h2 className="sb-folder-name">
          Folders{" "}
          <button
            className="sb-folder-button"
            onClick={() => setShowFolderBox(true)}
          >
            +
          </button>
        </h2>
        {addFolderBox()}
        <ul className="sb-list">
          {folders &&
            folders.map((folder) => (
              <li
                className={`sb-folder ${
                  selectedFolder === folder.name ? "sb-selected" : ""
                }`}
                key={folder.name}
                onClick={() => selectFolder(folder.name)}
              >
                {folder.name}
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
