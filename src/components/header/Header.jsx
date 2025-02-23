import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-appname">
        <h1>ycFiles </h1>
        <h2>&nbsp;- your cloud files</h2>
      </div>
      <div className="header-user">
        <p>Logged in as: {localStorage.getItem("user")}</p>
      </div>
    </div>
  );
};

export default Header;
