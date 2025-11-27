import * as tokenService from '../services/tokenService'


const BASE_URL = 'http://127.0.0.1:8000/api/productos/';

/**
 * Funcion auxiliar para hacer las peticiones API-REST
 * @param {*} path la URL a donde quiero apuntar
 * @param {*} options un objeto que puede contener method, datos a enviar
 */
async function request(path='',options={}){
    //construyo url a donde conectarme con el backend
    const url = path ? `${BASE_URL}${path}/` : BASE_URL;

    // ... spread operation, lo que agregar las options a la peticion.
    const token = localStorage.getItem('auth_token')
    const headers = {'Content-Type':'application/json','Authorization':`Bearer ${token}`}
    const res = await fetch(url, {
                    headers,
                    ...options
                });
    if (!res.ok){
        //extraemos el mensaje del error, si no existe ''
        const text = await res.text().catch(() => '' );
        //creamos una instancia de Error
        const err = new Error(`Request failed ${res.status}`)
        //completamos informacion del error
        err.status = res.status;
        err.body = text;
        throw err
    }
    // Si la respuesta es correcta, intentamos parsear el cuerpo a JSON
    const content = await res.text()
    try{
        //si en el cuerpo de la respuesta no hay nada devolvera null
        return content ? JSON.parse(content):null;
    }catch{
        //si no se puede parsear, devolvemos el texto tal cual
        return content
    }
}


/**
 * Funcion auxiliar para hacer las peticiones API-REST con refresh token
 * @param {*} path la URL a donde quiero apuntar
 * @param {*} options un objeto que puede contener method, datos a enviar
 * @param {boolean} isRetry - va indicar si es un reintento
 */
async function requestWithRefresh(path='',options={}, isRetry=false){

    //Paso 1: completar la URL
    const url = path ? `${BASE_URL}${path}/` : BASE_URL;

    //Paso 2: obtener el token actual del storage
    const token = tokenService.getAccessToken();
    console.log('Token actual: ',token);

    //Paso 3: construir el header de la petición 
    const headers = {
        'Content-Type':'application/json',
        //Solo agregar Authorization si tenemos token, si no agrega un objeto vacio
        ...(token ? { Authorization: `Bearer ${token}`}:{})
    }

    try{
        //Paso 4: Hacer la peticción con fetch
        const response = await fetch(url, {
                    headers,
                    ...options
                });
        //Paso 5: Verificamos el resultado de la respuesta.
        if(response.ok){
            //convierto a json
            const content = await response.json();
            try{
                return content ? JSON.parse(content): null
            }catch{
                return content
            }
        }

        //Paso 6: Verificar si la respuesta es un token expirado - 403/401
        //y si no es un reintento
        if ((response.status === 403 || response.status === 401) && !isRetry){
            //el token expiro y debo renovarlo, llamando a la funcion del servicio
            const renewResult = await tokenService.renewAccessToken();
            
            if(renewResult.success){
                //token se renovo exitosamente
                console.log('Token renovado exitosamente, reintentando petición');
                //llamo recursivamente la funcion, con isRetry=true
                return requestWithRefresh(path, options,true);
            }else{
                console.log('No se pudo renovar el token');
                // Limpiar el localstorage
                tokenService.clearTokens()
                const error = new Error('Sesion expirada, por favor inicie sesión nuevamente');
                error.status = 401;
                error.needsLogin = true; // bandera para que las componentes sepan que necesitan ir a login
                throw error
            }
        }
        //Paso 7: Manejo de otro errores 

        const text = await response.text.cath(() => '' );
        //creamos una instancia de Error
        const err = new Error(`Request failed ${response.status}`)
        //completamos informacion del error
        err.status = response.status;
        err.body = text;
        throw err
    }catch(e){
        if(e.name === 'TypeError'){
            const netError = new Error('Error de conexión')
            throw netError
        }
        throw e;
    }
}


/* FUNCIONES ASOCIADAS AL CRUD */

/**
 * Funcion para obtener todos los productos
 */
export function getProductos(){
    //llamamos a la funcion request sin parametros, para poder conectar por medio de GET
    //a la URL_BASE
    return requestWithRefresh();
}

/**
 * Funcion para obtener un producto particular por su ID
 */
export function getProductoById(id){
    // lo puedo convertir a string para asegurarme.
    return requestWithRefresh(String(id));
}

/**
 * Funcion para crear un producto
 * @param { object } producto: un objeto con los datos del producto a crear
 */
export function createProducto(producto){
    // Hacer la peticion POST, enviando el producto en el cuerpo en formato JSON
    const options = { method : 'POST', body: JSON.stringify(producto) };
    return requestWithRefresh('',options);
}

/**
 * Function para editar un producto
 * @param { number } id: id del producto a modificar
 * @param { object } updates: un objecto con los datos del producto a modificar
 */
export function updateProducto(id,updates){
    const options = { method: 'PUT', body: JSON.stringify(updates)}
    return requestWithRefresh(String(id),options);
}

/**
 * Funcion para eliminar un producto
 * @param { number } id: id del producto a modificar
 */
export function deleteProducto(id){
    const options = { method : 'DELETE'};
    return requestWithRefresh(String(id),options);
}
