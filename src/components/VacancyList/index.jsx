import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import EmptyList from "./EmptyList";
import { getVacancies } from "../../store/reducers/vacancy/ActionCreators";
import VacancyItem from "./VacancyItem";

const VacancyList = () => {
    const dispatch = useDispatch();
    const {vacancies} = useSelector(state => state.vacancyReducer);

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
            {vacancies.map(data => <VacancyItem data={data} key={data._id} />)}
        </div>
    )
}

export default VacancyList;