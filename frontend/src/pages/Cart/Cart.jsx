import React, { useState, useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [promoError, setPromoError] = useState('')

  const navigate = useNavigate()

  const validatePromoCode = async () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code')
      return
    }

    try {
      const response = await fetch(`/api/promocodes/${promoCode}/validate`)
      const data = await response.json()

      if (data.success) {
        setAppliedPromo(data.data)
        setPromoCode('')
        setPromoError('')
      } else {
        setPromoError(data.error || 'Invalid promo code')
        setAppliedPromo(null)
      }
    } catch (error) {
      setPromoError('Error validating promo code')
      setAppliedPromo(null)
    }
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
    setPromoCode('')
    setPromoError('')
  }

  const calculateDiscount = () => {
    if (!appliedPromo) return 0
    const subtotal = getTotalCartAmount()
    const discount = (subtotal * appliedPromo.discount) / 100
    return Math.round(discount * 100) / 100 // Round to 2 decimal places
  }

  const getFinalTotal = () => {
    const subtotal = getTotalCartAmount()
    if (subtotal === 0) return 0
    
    const deliveryFee = 2
    const discount = calculateDiscount()
    return subtotal + deliveryFee - discount
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        {/* Your existing cart items code */}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            {appliedPromo && (
              <>
                <hr/>
                <div className="cart-total-details promo-discount">
                  <div className="discount-label">
                    <p>Discount ({appliedPromo.code})</p>
                    <button 
                      onClick={removePromoCode}
                      className="remove-promo"
                    >
                      Remove
                    </button>
                  </div>
                  <p>-${calculateDiscount()}</p>
                </div>
              </>
            )}
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getFinalTotal()}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p className='promocodep'>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input 
                type="text" 
                placeholder='Promo Code'
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                disabled={appliedPromo !== null}
              />
              <button 
                onClick={validatePromoCode}
                disabled={appliedPromo !== null}
              >
                Submit
              </button>
            </div>
            {promoError && <p className="promo-error">{promoError}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart