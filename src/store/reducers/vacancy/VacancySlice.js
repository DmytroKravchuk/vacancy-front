import {createSlice} from "@reduxjs/toolkit";

import { addVacancy, getVacancies, deleteVacancy, updateVacancy } from "./ActionCreators";

const initialState = {
    vacancies: []
}

const vacancySlice = createSlice({
    name: "vacancyReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getVacancies.fulfilled, (state, action) => {
            state.vacancies = action.payload;
        })
        builder.addCase(addVacancy.fulfilled, (state, action) => {
            state.vacancies = [...state.vacancies, action.payload];
        })
        builder.addCase(deleteVacancy.fulfilled, (state, action) => {
            state.vacancies = state.vacancies.filter(item => item._id !== action.payload.id);
        })
        builder.addCase(updateVacancy.fulfilled, (state, action) => {
            state.vacancies = state.vacancies.map(item => {
                if (item._id === action.payload._id) {
                    return action.payload;
                }
                return item;
            });
        })
    }
});

export default vacancySlice.reducer;
// export const {} = authSlice.actions;