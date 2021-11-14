import { createStore, combineReducers } from "redux";
// Reducers.
import auth from "./auth/authReducer";

// The inital state. Will be merged with partials states.
const initState = {};

// Combine all partial reducers.
const rootReducer = combineReducers({
    auth,
    // Add your stores here.
});

// Create reduc store of all existing stores. Also init devtools.
const store = createStore(
    rootReducer,
    initState,
);

export default store;
