import { useState, useEffect, useCallback } from "react";
import { getProducto, createProducto, updateProducto, deleteProducto } from "../services/productoApi";

export function useProducto(){

    const [ data, setData ] = useState([]); 
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    
    const fetchAll = useCallback(async () => {
        
        setLoading(true);
        setError(null);
        try{
            const productoList = await getProducto();
           
            setData(productoList);
        }catch(e){
            
            setError(e)        
        }finally{
         
            setLoading(false);
        }
    },[]);
    

 
    useEffect(() =>{
        fetchAll();
    },[fetchAll])
    
    /**
     * Funcion para crear un curso
     * @param {*} payloadProducto: los datos del curso a crear
     */
    const create = async (payloadProducto) => {
        setLoading(true);
        setError(null);
        try{
            const productoCreated = await createProducto(payloadProducto);
                     
            setData(prev => [...prev, productoCreated]);
        }catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    /**
     * Funcion para actualizar el producto
     * @param {*} id 
     * @param {*} payloadProducto 
     */
    const update = async (id, payloadProducto) => {
        setLoading(true);
        setError(null);
        try{
            const productoUpdated = await updateProducto(id,payloadProducto);
           
            setData( prev  => prev.map(c=> c.id === id ? productoUpdated: c))
        }catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

   
    const remove = async(id) => {
        setLoading(true);
        setError(null);
        try{
           
            await deleteProducto(id);
            
            setData( prev  => prev.filter(c => c.id != id))
        }catch(e){
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    
    return {data, loading, error, fetchAll, create, update, remove}
}