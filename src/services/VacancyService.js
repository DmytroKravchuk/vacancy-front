import $api from "../http";

export class VacancyService {
    static async getVacancies() {
        return await $api.get("/vacancies");
    }

    static async addVacancy(data) {
        return await $api.post("/vacancy", data);
    }

    static async updateVacancy(id, data) {
        return await $api.put(`/vacancy?id=${id}`, data);
    }

    static async deleteVacancy(id) {
        return await $api.delete(`/vacancy?id=${id}`);
    }
}