import {createAsyncThunk} from '@reduxjs/toolkit'
import {notification} from "antd";
import {VacancyService} from "../../../services/VacancyService";

export const getVacancies = createAsyncThunk(
    "get/vacancy",
    async () => {
        try {
            const response = await VacancyService.getVacancies();
            return response.data;
        } catch (e) {
            console.log(e);
            notification.error({message: e.message || "get/vacancy error"})
        }
    }
);

export const addVacancy = createAsyncThunk(
    "post/vacancy",
    async (payload) => {
        try {
            const response = await VacancyService.addVacancy(payload);
            return response.data;
        } catch (e) {
            console.log(e);
            notification.error({message: e.message || "post/vacancy error"})
        }
    }
);

export const deleteVacancy = createAsyncThunk(
    "delete/vacancy",
    async (payload) => {
        try {
            const response = await VacancyService.deleteVacancy(payload);
            return response.data;
        } catch (e) {
            console.log(e);
            notification.error({message: e.message || "delete/vacancy error"})
        }
    }
);

export const updateVacancy = createAsyncThunk(
    "update/vacancy",
    async (payload) => {
        const {id, data} = payload;
        try {
            const response = await VacancyService.updateVacancy(id, data);
            return response.data;
        } catch (e) {
            console.log(e);
            notification.error({message: e.message || "update/vacancy error"})
        }
    }
);

