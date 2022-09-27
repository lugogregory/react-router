import { Link, Outlet, Route, Routes } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h2>Dashboard Page (Private)</h2>
      <hr />
      <Link to="/home">Enlace directo a Home</Link> <br />
      <Link to="welcome">Para mostrar el componente welcome</Link>
      <Outlet />
    </div>
  );
}

export default Dashboard;
