import { ADD_FAV, REMOVE_FAV } from "./actions/types.js";


const initialState = {
    data: [],
    myFavorites: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_FAV:
        return {
          ...state,
          myFavorites: [...state.myFavorites, action.payload],
        };
      case REMOVE_FAV:
        return {
          ...state,
          myFavorites: state.myFavorites.filter(
            (fav) => fav.id !== action.payload
          ),
        };
      default:
        return state;
    }
  }
  export default rootReducer;  