import "./Dashboard.css";

import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FileContent from "../../components/file-content/FileContent";
import { FileProvider } from "../../context/FileContext";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="db-header db-general">
        <Header />
      </header>
      <FileProvider>
        <section className="db-section">
          <div className="db-sidebar db-general">
            <Sidebar />
          </div>
          <div className="db-content db-general">
            <FileContent />
          </div>
        </section>
      </FileProvider>
    </div>
  );
};

export default Dashboard;
