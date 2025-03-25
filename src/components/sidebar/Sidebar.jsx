import { FileContext } from "../../context/FileContext";
import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";

const Sidebar = () => {
  const { folders, setSelectedFolder, selectedFolder } = useContext(FileContext);

  const selectFolder = (e) => {
    setSelectedFolder(e);
  };

  useEffect(() => {
    console.log(folders);
  }, []);

  return (
    <div className="sidebar">
      <nav className="sb-nav">
        <h2 className="sb-name">Folders</h2>
        <ul className="sb-list">
          {folders &&
            folders.map((folder) => (
              <li
                className={`sb-folder ${selectedFolder === folder.name ? 'sb-selected' : ''}`}
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
