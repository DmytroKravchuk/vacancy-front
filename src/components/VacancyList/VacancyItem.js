import React from "react";
import PropTypes from 'prop-types';
import { DownOutlined } from "@ant-design/icons";
import Tooltip from "antd/lib/tooltip";

import VacancyTooltip from "./VacancyTooltip";

const VacancyItem = ({data}) => {
    const {name, price, priceComment, city, address, _id} = data;

    return (
        <section className="vacancy-item">
            <h2>{name}</h2>
            <div className="vacancy-item-salary">{price.static || `${price.from} - ${price.to}`}
                <span className="vacancy-item-salary-description">{ priceComment ? ` - ${priceComment}` : null}</span>
            </div>
            <div className="wrapper">
                <div className="vacancy-item-salary-address">{`${city}, ${address}`}</div>
                <Tooltip
                    placement="bottomLeft"
                    title={<VacancyTooltip id={_id}/>}
                    color="#fff"
                    overlayStyle={{zIndex: 0}}
                >
                    <span className="vacancy-item-props">Ещё <DownOutlined /></span>
                </Tooltip>
            </div>
        </section>
    )
}

VacancyItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default VacancyItem;