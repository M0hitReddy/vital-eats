import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { StoreContext } from '../../context/StoreContext'

function FoodItem ({id,name,price,description,image,calories}) {
  const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);
  console.log(image);

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={image === "" ? assets.no_image : url+"/images/"+image} alt="" />
            {!cartItems[id]
                ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
                :<div className='food-item-counter'>
                  <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt='' />
                  <p className='cartitemsp'>{cartItems[id]}</p>
                  <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt='' />
                  </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p className='namewe'>{name}</p>
                <img className='ratingstars' src={assets.rating_starts} alt="" />
            </div>
            <p className="namewe">{description}</p>
            <p className="namewe">{calories} cal</p>
            <p className="food-item-price">₹{price}</p>
          
        </div>
    </div>
  )
}

export default FoodItem