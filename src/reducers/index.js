// import {
//     Add_products,
//     Add_cart,
//     Product_view,
//     Cart_items,
//     update_cart,
//     delete_cart
//   } from "../actions";
  
//   let initialState = {
//     products: [],
//     cart: [],
//     itemToDisplay: "",
//     totalCart: 0,
//   };
//   export default function products(state = initialState, actions) {
//     switch (actions.type) {
//       case Add_products:
//         return {
//           ...state,
//           products: actions.products,
//         };
       
//       case Add_cart:
//         let flag = state.cart.indexOf(actions.cart);
//         if (flag!==-1) {
//           actions.cart.qty += 1;
//           return {
//             ...state,
//           };
//         } else {
//           return {
//             ...state,
//             cart: [actions.cart, ...state.cart],
//           };
//         }
        
  
//       case Product_view:
//         return {
//           ...state,
//           itemToDisplay: actions.view,
//         };
//         break;
//       case Cart_items:
//         let { cart } = state;
//         let total = cart.reduce((total, item) => {
//           return (total += item.qty);
//         }, 0);
//         return {
//           ...state,
//           totalCart: total,
//         };
//         break;
//       case update_cart:
//         let index = state.cart.indexOf(actions.updatedItem);
//         let updatedCart = null;
//         if (index !== -1) {
//           state.cart[index] = actions.updatedItem;
//           updatedCart = state.cart;
//         }
//         return {
//           ...state,
//           cart: [...updatedCart],
//         };
//       case delete_cart:
//         let position = state.cart.indexOf(actions.item);
//         state.cart.splice(position, 1);
//         return {
//           ...state,
//         }
//       default:
//         return state;
//     }
//   }


// src/reducers/index.js
import {
  Add_products,
  Add_cart,
  Product_view,
  Cart_items,
  update_cart,
  delete_cart,
} from "../actions";

let initialState = {
  products: [],
  cart: [],
  itemToDisplay: "",
  totalCart: 0,
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case Add_products:
      return {
        ...state,
        products: action.products,
      };

    case Add_cart:
      const exists = state.cart.find((item) => item.id === action.cart.id);
      if (exists) {
        const updatedCart = state.cart.map((item) =>
          item.id === action.cart.id ? { ...item, qty: item.qty + 1 } : item
        );
        return { ...state, cart: updatedCart };
      } else {
        return { ...state, cart: [...state.cart, action.cart] };
      }

    case Product_view:
      return {
        ...state,
        itemToDisplay: action.view,
      };

    case Cart_items:
      const total = state.cart.reduce((acc, item) => acc + item.qty, 0);
      return { ...state, totalCart: total };

    case update_cart:
      const updatedCart = state.cart.map((item) =>
        item.id === action.updatedItem.id ? action.updatedItem : item
      );
      return { ...state, cart: updatedCart };

    case delete_cart:
      const filteredCart = state.cart.filter(
        (item) => item.id !== action.item.id
      );
      return { ...state, cart: filteredCart };

    default:
      return state;
  }
}

