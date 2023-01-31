import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Products from "./pages/Products";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Mascots from "./pages/Mascots";
import AddAfiliacion from "./pages/AddAfiliacion";
import AddMascota from "./pages/AddMascota";
import EditarMascota from "./pages/EditarMascota";
import Afiliaciones from "./pages/Afiliaciones";
import AprobarAfiliacion from "./pages/AprobarAfiliacion";
import EditAfiliacion from "./pages/EditAfiliacion";
import Principal from "./pages/Principal";
import Contacto from "./pages/Contacto";
import Buzon from "./pages/Buzon";

function App() {

  // Se importan los componentes y se enlanzan las rutas de navegación. Se tiene en cuenta la ruta del backend
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Principal/>}/>
          <Route path="/contacto" element={<Contacto/>}/>
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/dashboard/buzon" element={<Buzon/>}/>

          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/users/add" element={<AddUser />} />
          <Route path="/dashboard/users/edit/:id" element={<EditUser />} />

          <Route path="/dashboard/products" element={<Products />} />
          <Route path="/dashboard/products/add" element={<AddProduct />} />
          <Route path="/dashboard/products/edit/:id" element={<EditProduct />} />
          
          <Route path="/dashboard/mascots" element={<Mascots />} />
          <Route path="/dashboard/mascots/add" element={<AddMascota />} />
          <Route path="/dashboard/mascots/edit/:id" element={<EditarMascota />} />

          <Route path="/dashboard/afiliaciones" element={<Afiliaciones/>}/>
          <Route path="/dashboard/afiliaciones/nuevaAfiliacion/:id" element={<AddAfiliacion/>}/>
          <Route path="/dashboard/afiliaciones/aprobarAfiliacion/:id" element={<AprobarAfiliacion/>}/>
          <Route path="/dashboard/afiliaciones/editarAfiliacion/:id" element={<EditAfiliacion/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
