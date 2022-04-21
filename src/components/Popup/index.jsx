import React from "react";
import Modal from "antd/lib/modal";
import PropTypes from "prop-types";

import VacancyForm from "../VacancyForm";

const Popup = ({isModalVisible, showModal, setIsModalVisible, id}) => {
    return (
        <Modal
            title="Создать вакансию"
            visible={isModalVisible}
            style={{ top: 40 }}
            width={680}
            footer={null}
            onCancel={showModal(false)}
        >
            <VacancyForm setIsModalVisible={setIsModalVisible} id={id} />
        </Modal>
    )
}

Popup.propTypes = {
    isModalVisible: PropTypes.bool.isRequired,
    showModal: PropTypes.func.isRequired,
    setIsModalVisible: PropTypes.func.isRequired
}

export default Popup;