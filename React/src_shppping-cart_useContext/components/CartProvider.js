import React,{createContext,useState} from 'react'
export const cartContext=createContext();
export const CartProvider = ({children}) => {
     const[cart,setCart]=useState([]);
     const addToCart=(product)=>{
        const exist=cart.find(p=>p.id===product.id);
        (exist)?setCart(cart.map(p=>p.id===product.id?{...p,qte:p.qte+1}:p)):
        setCart([...cart,{...product,qte:1}]);
        
     }
      const removeFromCart=(id)=>{
        setCart(cart.filter(p=>p.id!==id));
      }


  return (
    <cartContext.Provider value={{cart,addToCart,removeFromCart}}>

     {children}

    </cartContext.Provider>



  )
}

