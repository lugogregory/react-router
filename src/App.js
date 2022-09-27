import { useState } from "react";

import { BrowserRouter, Routes, Route, Link, NavLink, Navigate } from "react-router-dom";

import { ProtectedRoute } from "./components/protectedRoute";

import { Admin, Analytics, Home, Landing, NotFound } from "./pages";

import React from "react";
import UserPage from "./pages/userPage";
import Dashboard from "./pages/dashboard";

function App() {
  const [user, setUser] = useState(null);

  const login = () => {
    // request backend done
    setUser({
      id: 1,
      name: "Greg",
      permissions: ["analize"],
      roles: ["admin"],
    });
  };

  const logout = () => {
    // request backend done
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Navigation />

      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}

      <Routes>
        {/* <Route path="/" element={<h1>Home Page</h1>} /> */}

        {/* es lo mismo decir path="/" */}
        <Route index element={<Landing />} />

        

        <Route path="/landing" element={<Landing />} />
        <Route
          element={<ProtectedRoute isAllowed={!!user} redirectTo="/landing" />}
        >
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} >
            <Route path="welcome" element={<div>welcome!!</div>} />
          </Route>
        </Route>

        <Route
          path="/analytics"
          element={
            <ProtectedRoute
              isAllowed={!!user && user.permissions.includes("analize")}
              redirectTo="/home"
            >
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAllowed={!!user && user.roles.includes("admin")}
              redirectTo="/home"
            >
              <Admin />
            </ProtectedRoute>
          }
        />

      {/* El navigate se usa para redireccionar a otra pagina */}
      <Route path="/administrador" element={<Navigate to="/admin" />} />  

        <Route
          path="/user/:id"
          element={
            <ProtectedRoute
              isAllowed={!!user}
              redirectTo="/home"
            >
              <UserPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function Navigation() {

  const userId = 250;

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            className={({isActive}) => isActive ? 'active' : ''}
            to="/landing">Landing
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({isActive}) => isActive ? 'active' : ''}
            to="/home">Home
          </NavLink>
        </li>
        <li>
          {/* NavLink sirve para agregar estilos a las rutas activas */}
          <NavLink
            className={({isActive}) => isActive ? 'active' : ''}
            to="/dashboard">Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({isActive}) => isActive ? 'active' : ''}
            to="/analytics">Analytics
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({isActive}) => isActive ? 'active' : ''}
            to="/admin">Admin
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({isActive}) => isActive ? 'active' : ''}
            to= {`/user/${userId}`} >User
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default App;
