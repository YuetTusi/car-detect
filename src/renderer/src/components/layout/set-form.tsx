import { FC } from 'react';
import {
    SaveOutlined
} from '@ant-design/icons';
import { Col, Row, Button, Form, Input } from 'antd';
import { SetFormProp } from './prop';

const { Item } = Form;

const SetForm: FC<SetFormProp> = ({ formRef }) => {
    return <Form
        form={formRef}
        layout="vertical" style={{ padding: '10px' }}>
        <Row gutter={12}>
            <Col span={12}>
                <Item label="PLMN" name="PLMN">
                    <Input />
                </Item>
            </Col>
            <Col span={12}>
                <Item label="BAND" name="BAND">
                    <Input />
                </Item>
            </Col>
        </Row>
        <Row gutter={12}>
            <Col span={12}>
                <Item label="上行频点" name="ULARFCN">
                    <Input />
                </Item>
            </Col>
            <Col span={12}>
                <Item label="下行频点" name="DLARFCN">
                    <Input />
                </Item>
            </Col>
        </Row>
        <Row gutter={12}>
            <Col span={12}>
                <Item label="PCI" name="PCI">
                    <Input />
                </Item>
            </Col>
            <Col span={12}>
                <Item label="TAC" name="TAC">
                    <Input />
                </Item>
            </Col>
        </Row>
        <Row gutter={12}>
            <Col span={24}>
                <Item label="CI" name="CI">
                    <Input />
                </Item>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Item className="fn-align-right">
                    <Button
                        onClick={() => {
                            const values = formRef.getFieldsValue();

                            console.log(values);
                        }}
                        type="primary">
                        <SaveOutlined />
                        <span>保存</span>
                    </Button>
                </Item>
            </Col>
        </Row>
    </Form>;
};

export { SetForm };