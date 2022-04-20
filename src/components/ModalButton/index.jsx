import React, { useState } from "react";
import Button from "antd/lib/button";
import PropTypes from 'prop-types';
import Popup from "../Popup";

const ModalButton = ({text, type, isDefaultStyle, id}) => {
    const [ isModalVisible, setIsModalVisible ] = useState( false );

    const showModal = value => () => setIsModalVisible( value );

    return (<>
        <Button
            type={ type || "primary" }
            className={ isDefaultStyle ? null : "modal-btn" }
            onClick={ showModal(true) }
        >{ text }</Button>
        <Popup isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} showModal={showModal} id={id} />
    </>)
}

ModalButton.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    isDefaultStyle: PropTypes.bool,
    id: PropTypes.string,
}

export default ModalButton;