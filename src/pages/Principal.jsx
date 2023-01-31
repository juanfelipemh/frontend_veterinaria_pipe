import React from "react";
import { Link } from "react-router-dom";

const Principal = () => {
    document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });
  
  });

  return (
    <>
    <div >
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
          aria-expanded="true"
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
              <Link to={"/contacto"} className="navbar-item">Contacto</Link>
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
    <div className="is-flex is-justify-content-space-around mt-3 ">
      <div className="p-3">
          <img src="https://res.cloudinary.com/dx3v0vmpb/image/upload/v1673398978/mascotas/dulce_j8eeb8.jpg" alt="foto_gato"/>
      </div>
      <div className="p-3 has-text-centered ">
        <h1 className="is-size-1 is-underlined is-italich has-text-weight-bold has-text-primary pb-6">Veterinaria Mascota Feliz</h1>
        <p className="is-size-3 ">Nuestros planes son los mejores para tu mascota. Tendrás acceso a nuestros planes de salud, siempre teniendo la mejor asistencia y cuidado para tu mascota</p>
        <br />
        <p className="is-size-3 has-text-weight-semibold">¡Aprovecha y afíliate a nuestros servicios!</p>
        <br />
        <p className="is-size-3">Somos expertos en el cuidado animal, con los mejores profesionales y atención que podrás encontrar</p>
      </div>
    </div>
    </>
  );
};

export default Principal;
