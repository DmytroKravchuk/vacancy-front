import React from "react";
import Tooltip from "antd/lib/tooltip";
import PropTypes from 'prop-types';

import "./style.scss";
import ModalButton from "../ModalButton";

const VacancyHeader = ({text, icon, tooltip}) => {
    return (
        <h1 className="vacancy-header">
            <span>{text}
                <Tooltip title={tooltip}>
                    {icon}
                </Tooltip>
            </span>
            <ModalButton text="Создать вакансию" />
        </h1>
    )
}

VacancyHeader.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    tooltip: PropTypes.string.isRequired,
};

export default VacancyHeader