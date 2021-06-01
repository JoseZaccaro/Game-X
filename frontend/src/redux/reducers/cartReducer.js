const initialState = {
    allCart: [],
}

const cartReducer = (state = initialState, action) =>{
    switch(action.type) {
        case 'ADD_TO_CART':
            state.allCart.push(action.payload)
            return {
                ...state
            }
        case 'DELETE_TO_CART':
            const newProducts = state.allCart.filter(article => article._id !== action.payload)
            return {
                ...state,
                allCart: newProducts
            }
        default:
            return state
    }
}

export default cartReducer