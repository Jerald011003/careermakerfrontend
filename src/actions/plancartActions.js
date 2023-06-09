import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,
} from '../constants/plancartConstants'

export const planaddToCart = (id, qty, maxQty) => async (dispatch, getState) => {
  const { data } = await axios.get(`https://careermaker.pythonanywhere.com/api/products/${id}`)

  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: qty
    }
  })

  localStorage.setItem('plancartItems', JSON.stringify(getState().plancart.plancartItems))
}





export const planremoveFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('plancartItems', JSON.stringify(getState().plancart.plancartItems))
}


export const plansaveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const plansavePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}