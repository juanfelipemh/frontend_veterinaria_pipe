import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

// los "children" pops se usan para enviar elementos HTML al código.

// El Layout almacena las vistas de navegacion de la pantalla principal. En este caso sería "navbar" y el "sidebar" y se usa cmo contenedor de las otras vistas que van apareciendo según la navegación de la página. El react.fragment permite agregar multiples elementos al DOM y los retorna en la vista
const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="columns mt-6" style={{ minHeight: "100vh" }}>
        <div className="column is-2">
          <Sidebar />
        </div>
        <div className="column has-background-light">
          <main>{children}</main>
        </div>
      </div>
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <strong>Bulma</strong> by{" "}
            <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is
            licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            The website content is licensed{" "}
            <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
              CC BY NC SA 4.0
            </a>
            .
          </p>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Layout;
