export const initialState = {
  cart: [],
  user: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.item],
      };
    case "REMOVE_FROM_CART":
      const index = state.cart.findIndex((cartItem) => {
        return cartItem.id === action.id;
      });
      let newCart = [...state.cart];
      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Cant Remove product ${action.id} as it is not in your cart`
        );
      }

      return {
        ...state,
        cart: newCart,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "RESET_CART":
      return {
        cart: [],
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
