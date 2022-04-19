import React, { useState } from "react";

import "./style.scss";
import EmptyList from "./EmptyList";

const VacancyList = () => {
    const [list, setList] = useState([]);

    if (!list.length) {
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