function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "40px" }}>
      <h1>Welcome 🚀</h1>
      <p>Logged in as: {user?.email}</p>
    </div>
  );
}

export default Dashboard;