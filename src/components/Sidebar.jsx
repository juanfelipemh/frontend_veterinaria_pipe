import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut, IoLogoOctocat, IoFileTrayFullOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

// En sidebar se importa "logout" porque es donde se encuentra el botón para salir tambien.
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Para cerrar sesión, envia "LogOut" de los features, igual que el reset para reiniciar los "initialState" en "authSlice", y envia a la página de inicio "login" en este caso
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/products"}>
              <IoPricetag /> Productos
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/afiliaciones"}>
              <IoPricetag /> Afiliaciones
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/mascots"}>
              <IoLogoOctocat /> Mascotas
            </NavLink>
          </li>
        </ul>
        { // Con este ternario, si el usuario autenticado es "admin", podrá ver esta opción, pero si solo es "user", no se renderizará en su sesión
        user && user.rol === "admin" && (
          <div>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/dashboard/users"}>
                  <IoPerson /> Usuarios
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/buzon"}>
                  <IoFileTrayFullOutline   /> Buzon
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <p className="menu-label">Configuración</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Cerrar sesión
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
