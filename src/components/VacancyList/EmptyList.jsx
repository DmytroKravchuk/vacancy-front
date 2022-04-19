import React from "react";
import PropTypes from 'prop-types';

const EmptyList = ({text}) => {
    return (
        <section className="vacancy-list-wrapper empty-list">
            <p>{text}</p>
        </section>
    )
}

EmptyList.propTypes = {
    text: PropTypes.string.isRequired
}

export default EmptyList;