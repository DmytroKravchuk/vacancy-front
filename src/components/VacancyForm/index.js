import React, { useCallback, useEffect, useState } from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Select from "antd/lib/select";
import Radio from "antd/lib/radio";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { addVacancy, updateVacancy } from "../../store/reducers/vacancy/ActionCreators";
import cities from "../../cities.json";
import "./style.scss";

const VacancyForm = ({setIsModalVisible, id}) => {
    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    const {vacancies} = useSelector( state => state.vacancyReducer );
    const defaultData = vacancies.filter( item => item._id === id )[0];
    const [ salaryRadioValue, setSalaryRadioValue ] = useState( "range" );
    const [ price, setPrice ] = useState( {
        range: {
            from: defaultData?.price?.from || null,
            to: defaultData?.price?.to || null
        }, oneValue: {
            static: defaultData?.price?.static || null
        }
    } );
    const [ isValid, setIsValid ] = useState( {range: true, oneValue: true} );
    const [ isSubmit, setSubmit ] = useState( false );
    const [ isLoading, setLoading ] = useState( false );

    const onSetSalaryRadioValue = e => setSalaryRadioValue( e.target.value );

    const validationSalary = () => {
        return !!(price.range.from && price.range.to && salaryRadioValue === "range") ||
            !!(price.oneValue.static && salaryRadioValue === "oneValue") || salaryRadioValue === "none";
    };

    const toggleSalaryError = useCallback( () => {
        setIsValid( state => {
            return {
                ...state,
                range: !!(price.range.from && price.range.to),
                oneValue: !!price.oneValue.static
            }
        } );
    }, [ price ] );

    const onFinish = (values) => {
        if (validationSalary()) {
            setLoading( true );
            if (id) {
                dispatch( updateVacancy( {id, data: {...values, price: price[salaryRadioValue]}} ) ).then( () => {
                    setIsModalVisible( false );
                } ).finally( () => {
                    setLoading( false );
                } )
            } else {
                dispatch( addVacancy( {...values, price: price[salaryRadioValue]} ) ).then( () => {
                    setIsModalVisible( false );
                } ).finally( () => {
                    setLoading( false );
                } )
            }
        }
        setSubmit( true );
    };

    const onFinishFailed = (errorInfo) => {
        console.log( 'Failed:', errorInfo );
        setSubmit( true );
        setLoading( false );
    };

    const onReset = () => {
        form.resetFields();
        setIsModalVisible( false );
    }

    const salaryHandler = ({type, name}) => e => {
        setPrice( state => {
            const newValue = {...state[type]};
            newValue[name] = e.target.value;
            return {
                ...state,
                [type]: newValue
            };
        } )
    };

    useEffect( () => {
        if (isSubmit) {
            toggleSalaryError();
        }
    }, [ price, toggleSalaryError, isSubmit ] );

    return (
        <Form
            form={ form }
            name="vacancy"
            initialValues={ {
                name: defaultData?.name,
                city: defaultData?.city,
                address: defaultData?.address,
                priceComment: defaultData?.priceComment,
            } }
            layout="vertical"
            onFinish={ onFinish }
            onFinishFailed={ onFinishFailed }
            autoComplete="off"
        >
            <section>
                <div className="headline">???????????????? ??????????????????<span className="required-icon">*</span></div>
                <Form.Item
                    name="name"
                    rules={ [
                        {
                            required: true,
                            message: '????????????????????, ?????????????? ???????????????? ??????????????????.',
                        },
                    ] }
                >
                    <Input/>
                </Form.Item>
            </section>
            <section>
                <div className="headline">?????????????? ????????????<span className="required-icon">*</span></div>
                <Form.Item
                    label="?????????? ????????????:"
                    name="city"
                    rules={ [
                        {
                            required: true,
                            message: '????????????????????, ?????????????? ?????????? ????????????.',
                        },
                    ] }
                    wrapperCol={ {
                        span: 10,
                    } }
                >
                    <Select showSearch>
                        { cities.map( ({id, name}) => (
                            <Select.Option value={ name } key={ id }>{ name }</Select.Option>
                        ) ) }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="?????????? ????????????:"
                    name="address"
                    rules={ [
                        {
                            required: true,
                            message: '????????????????????, ?????????????? ?????????? ????????????.',
                        },
                    ] }
                    wrapperCol={ {
                        span: 10,
                    } }
                >
                    <Input placeholder="?????????? ?? ??????"/>
                </Form.Item>
            </section>
            <section>
                <div className="headline">????????????????<span className="required-icon">*</span></div>
                <Radio.Group value={ salaryRadioValue } onChange={ onSetSalaryRadioValue }>
                    <Radio value="range">????????????????</Radio>
                    { salaryRadioValue === "range" && (<div className="input-wrapper">
                        <div>
                            <Input
                                allowClear
                                value={ price.range.from }
                                onChange={ salaryHandler( {type: "range", name: "from"} ) }
                                status={ !isValid.range && "error" }
                            />
                            <i>-</i>
                            <Input
                                allowClear
                                value={ price.range.to }
                                onChange={ salaryHandler( {type: "range", name: "to"} ) }
                                status={ !isValid.range && "error" }
                            />
                        </div>
                        { !isValid.range && (
                            <div className="ant-form-item-explain ant-form-item-explain-connected custom-error">
                                <div className="ant-form-item-explain-error">????????????????????, ?????????????? ?????????????????????? ??
                                    ???????????????????????? ???????????????? ????????????????.
                                </div>
                            </div>) }
                    </div>) }
                    <Radio value="oneValue">???????? ????????????????</Radio>
                    { salaryRadioValue === "oneValue" && (<div className="input-wrapper">
                        <div>
                            <Input
                                allowClear
                                value={ price.oneValue.static }
                                onChange={ salaryHandler( {type: "oneValue", name: "static"} ) }
                                status={ !isValid.oneValue && "error" }
                            />
                        </div>
                        { !isValid.oneValue && (
                            <div className="ant-form-item-explain ant-form-item-explain-connected custom-error">
                                <div className="ant-form-item-explain-error">????????????????????, ?????????????? ???????????????? ????????????????.
                                </div>
                            </div>) }
                    </div>) }
                    <Radio value="none">???? ?????????????????? (???? ??????????????????????????)</Radio>
                </Radio.Group>
                <Form.Item
                    label="?????????????????????? ?? ????????????????"
                    name="priceComment"
                    wrapperCol={ {
                        span: 10,
                    } }
                >
                    <Input/>
                </Form.Item>
            </section>
            <section>
                <Form.Item
                >
                    <Button type="primary" htmlType="submit" disabled={ isLoading } loading={ isLoading }>
                        ??????????????????
                    </Button>
                    ??????
                    <Button type="text" onClick={ onReset }>????????????????</Button>
                </Form.Item>
            </section>
        </Form>
    )
}

VacancyForm.propTypes = {
    setIsModalVisible: PropTypes.func.isRequired,
    id: PropTypes.string,
}
export default VacancyForm;