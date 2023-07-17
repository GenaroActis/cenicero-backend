import React, { createContext } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext();

const CartProvider = ({children}) =>{

    // toastify
    const notify2 = () => toast.error('Limite Stock!', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        content : 0,
        theme: "colored",
    });
    const notify1 = () => toast.success('Agregado!', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        content : 0,
        theme: "colored",
    });
    
    // funcion cambio agregar a agregado en boton
    function added() {
        const botonAgregar = document.querySelector("#botonAgregar")
        botonAgregar.textContent = "agregado";
        botonAgregar.style.backgroundColor = "#da8a0d";
        botonAgregar.style.color = "white";
            setTimeout(function() {
                botonAgregar.textContent = "agregar";
                botonAgregar.style.backgroundColor = "white";
                botonAgregar.style.color = "#0d6efd";
            }, 3000);
    };

    const getCart = async () =>{
        try {
            const response = await fetch(`http://localhost:8080/carts`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                await response.json();
            } else {
                window.location.href = 'http://localhost:8080/'
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            console.log(error)
        };
    };

    const addProductToCart = async (prodId) =>{
        try {
            const response = await fetch(`http://localhost:8080/api/carts/${prodId}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                await response.json();
            } else {
                window.location.href = 'http://localhost:8080/'
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            console.log(error)
        };
    };

    const deleteProductToCart = async (prodId) =>{
        try {
            const response = await fetch(`http://localhost:8080/api/carts/${prodId}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                await response.json();
            } else {
                window.location.href = 'http://localhost:8080/'
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            console.log(error)
        };
    };

    const deleteAllProductsToCart = async () =>{
        try {
            const response = await fetch(`http://localhost:8080/api/carts/all`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                await response.json();
            } else {
                window.location.href = 'http://localhost:8080/'
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            console.log(error)
        };
    };

    const updateQuantityToCart = async (quantity) =>{
        try {
            const response = await fetch(`http://localhost:8080/api/carts/quantity`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(quantity),
            });
            if (response.ok) {
                await response.json();
            } else {
                window.location.href = 'http://localhost:8080/'
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            console.log(error)
        };
    };

    return(
        <CartContext.Provider value={{ getCart, addProductToCart, deleteProductToCart, deleteAllProductsToCart, updateQuantityToCart, added, notify1, notify2}}>
        {children}
        </CartContext.Provider>
    )
}



export default CartProvider;       