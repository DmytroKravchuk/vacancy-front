import React from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";

import "./style.scss";
import { Select } from "antd";

const VacancyForm = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
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
                <Form.Item
                    label="Город работы:"
                    name="city"
                    rules={ [
                        {
                            required: true,
                            message: 'Пожалуйста, укажите город работы.',
                        },
                    ] }
                >
                    <Select>

                    </Select>
                </Form.Item>
            </section>

            <Form.Item
                wrapperCol={ {
                    offset: 8,
                    span: 16,
                } }
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default VacancyForm;