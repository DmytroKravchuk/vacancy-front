import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";

import VacancyList from "./components/VacancyList";
import VacancyHeader from "./components/VacancyHeader";
import ModalButton from "./components/ModalButton";


const App = () => {
    return (
        <div className="app">
            <VacancyHeader
                text="Вакансии и отклики"
                icon={<InfoCircleOutlined/>}
                tooltip="Example tooltip"
            />
            <VacancyList />
            <footer>
                <ModalButton text="Создать вакансию" />
            </footer>
        </div>
    )
}

export default App;