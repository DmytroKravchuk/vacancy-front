import React from "react";
import Button from "antd/lib/button";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { deleteVacancy } from "../../store/reducers/vacancy/ActionCreators";
import ModalButton from "../ModalButton";

const VacancyTooltip = ({id}) => {
    const dispatch = useDispatch();

    const deleteHandler = () => {
        dispatch(deleteVacancy(id))
    };

    return (
        <div className="vacancy-tooltip">
            <ModalButton text="Редактировать" type="text" isDefaultStyle={true} id={id} />
            <Button type="text" onClick={deleteHandler}>Удалить</Button>
        </div>
    )
}

VacancyTooltip.propTypes = {
    id: PropTypes.string.isRequired
}

export default VacancyTooltip;