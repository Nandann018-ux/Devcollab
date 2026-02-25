import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 40px",
        backgroundColor: "#111",
        color: "white",
      }}
    >
      <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
        DevCollab 🚀
      </h2>

      <div>
        <span style={{ marginRight: "20px" }}>
          {user?.name}
        </span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;