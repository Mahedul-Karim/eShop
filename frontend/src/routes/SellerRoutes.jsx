import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ShopLogin from '../pages/ShopLogin'
import ShopCreate from '../pages/ShopCreate';

function SellerRoutes({children,to,path="login"}) {
    const { isSellerLoggedIn, isSellerLoading } = useSelector(
        (state) => state.seller
      );
      if(!isSellerLoggedIn){
        if(path === 'login'){
            return <Navigate to={'/shop-login'} />
        }
        if(path === 'signup'){
            return <Navigate to={'/shop-create'}/>
        }
      }
      if(isSellerLoggedIn){
        return children
      }
  return (
    <Navigate to={to}/>
  )
}

export default SellerRoutes