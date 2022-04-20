import {createSlice} from "@reduxjs/toolkit";

import {getVacancies} from "./ActionCreators";

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
    }
});

export default vacancySlice.reducer;
// export const {} = authSlice.actions;