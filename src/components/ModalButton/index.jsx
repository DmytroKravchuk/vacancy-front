import React, { useState } from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import PropTypes from 'prop-types';
import VacancyForm from "../VacancyForm";

const ModalButton = ({text}) => {
    const [ isModalVisible, setIsModalVisible ] = useState( false );

    const showModal = () => setIsModalVisible( true );

    return (<>
        <Button type="primary" className="modal-btn" onClick={ showModal }>{ text }</Button>
        <Modal title="Создать вакансию" visible={isModalVisible} centered={true} width={680} footer={null}>
            <VacancyForm isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
        </Modal>
    </>)
}

ModalButton.propTypes = {
    text: PropTypes.string.isRequired
}

export default ModalButton;