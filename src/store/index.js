import { combineReducers, configureStore } from "@reduxjs/toolkit";
import vacancyReducer from "./reducers/vacancy/VacancySlice";

const rootReducer = combineReducers({
    vacancyReducer,
});

export const setupStore = () => configureStore({
    reducer: rootReducer,
})
