import React, { useCallback, useEffect, useState } from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Select from "antd/lib/select";
import Radio from "antd/lib/radio";
import PropTypes from "prop-types";

import cities from "../../cities.json";
import "./style.scss";

const VacancyForm = ({setIsModalVisible}) => {
    const [form] = Form.useForm();
    const [salaryRadioValue, setSalaryRadioValue] = useState("range");
    const [salary, setSalary] = useState({range: [null, null], oneValue: [null]});
    const [isValid, setIsValid] = useState({range: true, oneValue: true});
    const [isSubmit, setSubmit] = useState(false);

    const onSetSalaryRadioValue = e => setSalaryRadioValue(e.target.value);

    const validationSalary = () => {
        return !!(salary.range[0] && salary.range[1] && salaryRadioValue === "range") ||
            !!(salary.oneValue[0] && salaryRadioValue === "oneValue") || salaryRadioValue === "none";
    };

    const toggleSalaryError = useCallback(() => {
        setIsValid(state => ({
                ...state,
                range: !!(salary.range[0] && salary.range[1]),
                oneValue: !!salary.oneValue[0]
        }));
    }, [salary]);

    const onFinish = (values) => {
        console.log(validationSalary());
        if (validationSalary()) {
            console.log('Success:', values);
            setIsModalVisible(false);
        }
        setSubmit(true);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setSubmit(true);
    };

    const onReset = () => {
        form.resetFields();
        setIsModalVisible(false);
    }

    const salaryHandler = ({type, index}) => e => {
        setSalary(state => {
            const newValue = [...state[type]];
            newValue[index] = e.target.value;
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
    }, [salary, toggleSalaryError, isSubmit]);

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
                            value={salary.range[0]}
                            onChange={salaryHandler({type: "range", index: 0})}
                            status={ !isValid.range && "error" }
                        />
                        <i>-</i>
                        <Input
                            allowClear
                            value={salary.range[1]}
                            onChange={salaryHandler({type: "range", index: 1})}
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
                            value={salary.oneValue[0]}
                            onChange={salaryHandler({type: "oneValue", index: 0})}
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
                    name="commentSalary"
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
                    <Button type="primary" htmlType="submit">
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