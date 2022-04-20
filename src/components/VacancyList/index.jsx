import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import EmptyList from "./EmptyList";
import { getVacancies } from "../../store/reducers/vacancy/ActionCreators";

const VacancyList = () => {
    const dispatch = useDispatch();
    const {vacancies} = useSelector(state => state.vacancyReducer);
    console.log(vacancies);
    useEffect(() => {
        dispatch(getVacancies());
    }, []);

    if (!vacancies.length) {
        return (
            <EmptyList text="Нет вакансий." />
        )
    }

    return (
        <div className="vacancy-list-wrapper">
        </div>
    )
}

export default VacancyList;