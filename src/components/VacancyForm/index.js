import React, { useCallback, useEffect, useState } from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Select from "antd/lib/select";
import Radio from "antd/lib/radio";
import PropTypes from "prop-types";

import cities from "../../cities.json";
import "./style.scss";
import { useDispatch } from "react-redux";
import { addVacancy } from "../../store/reducers/vacancy/ActionCreators";

const VacancyForm = ({setIsModalVisible}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [salaryRadioValue, setSalaryRadioValue] = useState("range");
    const [price, setPrice] = useState({range: {from: null, to: null}, oneValue: {static: null}});
    const [isValid, setIsValid] = useState({range: true, oneValue: true});
    const [isSubmit, setSubmit] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const onSetSalaryRadioValue = e => setSalaryRadioValue(e.target.value);

    const validationSalary = () => {
        return !!(price.range.from && price.range.to && salaryRadioValue === "range") ||
            !!(price.oneValue.static && salaryRadioValue === "oneValue") || salaryRadioValue === "none";
    };

    const toggleSalaryError = useCallback(() => {
        setIsValid(state => {
            console.log(!!price.oneValue.static);
            return {
            ...state,
                range: !!(price.range.from && price.range.to),
                oneValue: !!price.oneValue.static
            }
        });
    }, [price]);

    const onFinish = (values) => {
        if (validationSalary()) {
            setLoading(true);
            dispatch(addVacancy( {...values, price: price[salaryRadioValue]})).then(() => {
                setIsModalVisible(false);
            }).finally(() => {
                setLoading(false);
            })
        }
        setSubmit(true);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setSubmit(true);
        setLoading(false);
    };

    const onReset = () => {
        form.resetFields();
        setIsModalVisible(false);
    }

    const salaryHandler = ({type, name}) => e => {
        setPrice(state => {
            const newValue = {...state[type]};
            newValue[name] = e.target.value;
            return {
                ...state,
                [type]: newValue
            };
        })
    };

    useEffect(() => {
        if (isSubmit) {
            toggleSalaryError();
        }
    }, [price, toggleSalaryError, isSubmit]);
    console.log(isValid);
    return (
        <Form
            form={form}
            name="vacancy"
            initialValues={ {} }
            layout="vertical"
            onFinish={ onFinish }
            onFinishFailed={ onFinishFailed }
            autoComplete="off"
        >
            <section>
                <div className="headline">Название должности<span className="required-icon">*</span></div>
                <Form.Item
                    name="name"
                    rules={ [
                        {
                            required: true,
                            message: 'Пожалуйста, укажите название должности.',
                        },
                    ] }
                >
                    <Input/>
                </Form.Item>
            </section>
            <section>
                <div className="headline">Условия работы<span className="required-icon">*</span></div>
                <Form.Item
                    label="Город работы:"
                    name="city"
                    rules={ [
                        {
                            required: true,
                            message: 'Пожалуйста, укажите город работы.',
                        },
                    ] }
                    wrapperCol={ {
                        span: 10,
                    } }
                >
                    <Select showSearch>
                        {cities.map(({id, name}) => (
                            <Select.Option value={name} key={id}>{name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Адрес работы:"
                    name="address"
                    rules={ [
                        {
                            required: true,
                            message: 'Пожалуйста, укажите город работы.',
                        },
                    ] }
                    wrapperCol={ {
                        span: 10,
                    } }
                >
                    <Input placeholder="Улица и дом"/>
                </Form.Item>
            </section>
            <section>
                <div className="headline">Зарплата<span className="required-icon">*</span></div>
                <Radio.Group value={salaryRadioValue} onChange={onSetSalaryRadioValue}>
                    <Radio value="range">Диапазон</Radio>
                    {salaryRadioValue === "range" && (<div className="input-wrapper">
                        <Input
                            allowClear
                            value={price.range.from}
                            onChange={salaryHandler({type: "range", name: "from"})}
                            status={ !isValid.range && "error" }
                        />
                        <i>-</i>
                        <Input
                            allowClear
                            value={price.range.to}
                            onChange={salaryHandler({type: "range", name: "to"})}
                            status={ !isValid.range && "error" }
                        />
                        {!isValid.range && (<div className="ant-form-item-explain ant-form-item-explain-connected custom-error">
                            <div className="ant-form-item-explain-error">Пожалуйста, укажите минимальное и максимальное значение зарплаты.</div>
                        </div>)}
                    </div>)}
                    <Radio value="oneValue">Одно значение</Radio>
                    {salaryRadioValue === "oneValue" && (<div className="input-wrapper">
                        <Input
                            allowClear
                            value={price.oneValue.static}
                            onChange={salaryHandler({type: "oneValue", name: "static"})}
                            status={ !isValid.oneValue && "error" }
                        />
                        {!isValid.oneValue && (<div className="ant-form-item-explain ant-form-item-explain-connected custom-error">
                            <div className="ant-form-item-explain-error">Пожалуйста, укажите значение зарплаты.</div>
                        </div>)}
                    </div>)}
                    <Radio value="none">Не указывать (не рекомендуется)</Radio>
                </Radio.Group>
                <Form.Item
                    label="Комментарий к зарплате"
                    name="priceComment"
                    wrapperCol={ {
                        span: 10,
                    } }
                >
                    <Input />
                </Form.Item>
            </section>
            <section>
                <Form.Item
                >
                    <Button type="primary" htmlType="submit" disabled={isLoading} loading={isLoading}>
                        Сохранить
                    </Button>
                    или
                    <Button type="text" onClick={onReset}>Отменить</Button>
                </Form.Item>
            </section>
        </Form>
    )
}

VacancyForm.propTypes = {
    setIsModalVisible: PropTypes.func.isRequired
}
export default VacancyForm;