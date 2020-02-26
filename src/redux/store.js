import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import rootReducers from "./reducers/rootReducers";

const store = createStore(rootReducers, devToolsEnhancer());

export default store;
