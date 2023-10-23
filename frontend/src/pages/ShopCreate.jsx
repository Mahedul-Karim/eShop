import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Shop from '../components/shop/Shop';

const ShopCreate = () => {
  const navigate = useNavigate();
  
  const { seller } = useSelector(state=>state.seller);

  useEffect(()=>{
    if(seller){
      navigate(`/shop-home/${seller._id}`)
    }
  },[])

  return (
    <div>
        <Shop />
    </div>
  )
}

export default ShopCreate;