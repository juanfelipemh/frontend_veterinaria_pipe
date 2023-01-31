import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Se crea un estado inicial que ira cambiando conforme vayan cambiando de acuerdo con los estados en el "createSlice"
const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Solicitud a la API para iniciar sesión. Este se usa para proteger los "components"
export const LoginUser = createAsyncThunk("user/LoginUser", async(user, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:5000/ingresar', {
            correo: user.correo,
            clave: user.clave
        });
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg; // recibe mensaje del backend con error
            return thunkAPI.rejectWithValue(message); // Luego de enviar el manejo de error, se crea "extraReducers" abajo y esto ayudará a modificar los estados en el "authSlice"
        }
    }
});

// Con este método, voy a proteger la información del usuario autenticado. Tener presente que esta API se usa para separar la información de acuerdo si es "admin" o "user". Luego se establecen los mismos casos en el "authSlice" pero se cambia la función que ejecutará inicialmente. Posteriormente, en "pages" se parametriza esto para protegener los tableros
export const getMe = createAsyncThunk("user/getMe", async( _ , thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:5000/sesion');
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

// Método logout elimina la sesión creada protegiendo los accesos al aplicativo
export const LogOut = createAsyncThunk("user/LogOut", async() => {
    await axios.delete('http://localhost:5000/cerrarSesion');
});

/* 
    APLICANDO PROCESOS A LOS "INITIALSTATES" PARA QUE SE MODIFIQUEN DE ACUERDO CON LOS CAMBIOS DE ESTADO EN LA APLICACIÓN AL MOMENTO DE INICIAR O CERRAR SESIÓN, Y TENIENDO EN CUENTA EL TIPO DE USUARIO (ADMIN, USER)
*/
export const authSlice = createSlice({
    name: "auth", // Se le asigna nombre 
    initialState, // Invocar los estados iniciales arriba
    reducers:{ // Función resetea estado inicial. Recibe paramétro (state) con el nuevo "estado"
        reset: (state) => initialState
    },
    extraReducers:(builder) =>{ // Constructor "builder" como parámetro y se agregan casos dependiendo del estado
        builder.addCase(LoginUser.pending, (state) =>{
            state.isLoading = true; // Si usuario esta cargando, actualiza a true "isLoading" del initialState
        });
        builder.addCase(LoginUser.fulfilled, (state, action) =>{
            state.isLoading = false; 
            state.isSuccess = true;
            state.user = action.payload;
            // Si usuario carga con éxito, actualiza a false "isLoading" del initialState, luego "isSuccess" a true como aprobación, y "action.payload" retorna los datos a la función "LoginUser" para acceder como el usuario autenticado
        });
        builder.addCase(LoginUser.rejected, (state, action) =>{
            state.isLoading = false; 
            state.isError = true;
            state.message = action.payload; 
            // Si usuario tiene error, actualiza a false "isLoading" del initialState, luego "isError" a true y se envia el "state.message" como "action.payload" a la función "LoginUser" mostrando el error generado
        })

        // Get User Login
        builder.addCase(getMe.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});

// Se exportan la función {reset} con las acción y "authSlice". Posteriormente ir a la carpeta app que contiene "store.js"
export const {reset} = authSlice.actions;
export default authSlice.reducer;  