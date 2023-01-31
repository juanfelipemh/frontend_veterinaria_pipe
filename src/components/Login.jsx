import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // importar funciones de react-redux
import { Link, useNavigate } from "react-router-dom"; // Importar función que autoredirige al usuario luego de su autenticación
import { LoginUser, reset } from "../features/authSlice"; // Importar acciones de "Login" y "reset"

const Login = () => {
  // Crear nuevos estados para administrador estados. Tener presente que esto funciona como "GET" y "SET". Estos estados se agregan en las estiquetas "input" con la función onChange().
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");

  // Importación función dispatch y navigate que se usará para
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Se toma los elementos de store.js, y se desestructura así, de igual manera que quedó el "initialState" en la carpeta features. Luego se establece el "state" como "auth" en caso que validación correcto o por error. Esto "auth" se envia al "form" con función onSubmit={Auth} porque se procesará luego de enviar los datos del formulario
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  ); // Si hay un error, se envia un mensaje "isError" con condicional  ternario en modo <p> al formulario (Verlo). Tambien en el botón "login"

  // Ahora, con esta función se valida si el usuario se autentico bien o hay error, y redireccióna al "dashboard"
  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    // Y luego se restablece el estado
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]); // Y por ultimo se agregan unas dependencias

  // Se crea función "Auth" luego de la desestructuración del elemento validador "authSlice". Esto lo que hará es enviar los datos confirmados para iniciar sesión. El "LoginUser" viene de "authSlice"
  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ correo, clave }));
  };

  return (
    <>
      <div>
        <nav className="navbar has-background-light" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
          <Link className="navbar-item" to="/">
                <p>
                  <strong className="is-size-4 has-text-primary">
                    Mascota Feliz
                  </strong>
                </p>
              </Link>
            <a
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item">Inicio</a>

              <a className="navbar-item">Servicios</a>

              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Más</a>

                <div className="navbar-dropdown">
                  <a className="navbar-item">Acerca de Nosotros</a>
                  <Link to={"/contacto"} className="navbar-item">
                      Contacto
                  </Link>
                </div>
              </div>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link to={"/login"} className="button is-light">
                    Ingresar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div>
        <section className="hero is-fullheight is-fullwidth">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-4">
                  <form onSubmit={Auth} className="box">
                    {isError && <p className="has-text-centered">{message}</p>}
                    <h1 className="title is-2">Iniciar Sesión</h1>
                    <div className="field">
                      <label className="label">Correo</label>
                      <div className="control">
                        <input
                          type="text"
                          className="input"
                          value={correo}
                          onChange={(e) => setCorreo(e.target.value)}
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Contraseña</label>
                      <div className="control">
                        <input
                          type="password"
                          className="input"
                          value={clave}
                          onChange={(e) => setClave(e.target.value)}
                          placeholder="******"
                        />
                      </div>
                    </div>
                    <div className="field mt-5">
                      <button
                        type="submit"
                        className="button is-success is-fullwidth"
                      >
                        {isLoading ? "Cargando..." : "Ingresar"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
