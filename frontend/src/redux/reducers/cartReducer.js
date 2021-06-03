const initialState = {
    allCart: [],
}

const cartReducer = (state = initialState, action) =>{
    switch(action.type) {
        case 'ADD_TO_CART':
            state.allCart.push(action.payload)
            localStorage.setItem('cart', JSON.stringify(state.allCart))
            return {
                ...state
            }
        case 'DELETE_TO_CART':
            const newProducts = state.allCart.filter(article => article._id !== action.payload)
            localStorage.setItem('cart', JSON.stringify(newProducts))
            return {
                ...state,
                allCart: newProducts
            }
        case 'SET_CART_LS':
            localStorage.setItem('cart', JSON.stringify(action.payload))
            return {
                ...state,
                allCart: action.payload
            }
        default:
            return state
    }
}

export default cartReducer