import mapValues from 'lodash/mapValues';
import { FC, useState } from 'react';
import {
    CheckCircleOutlined, LoadingOutlined
} from '@ant-design/icons';
import { App, Col, Row, Button, Form, InputNumber } from 'antd';
import { Set4gFormProp } from './prop';
import { request } from '@renderer/util/http';
import { Sort } from './styled/box';

const { Item } = Form;

/**
 * 移动联通4G表单
 */
const Set4gForm: FC<Set4gFormProp> = ({ formRef }) => {

    const { message } = App.useApp();
    const [loading, setLoading] = useState<boolean>(false);

    return <Form
        form={formRef}
        layout="vertical" style={{ padding: '10px' }}>
        <Sort>
            <fieldset>
                <legend>
                    移动
                </legend>
                <div className="form-box">
                    <Row gutter={12}>
                        <Col span={12}>
                            <Item label="Cell ID" name="cmCellId" >
                                <InputNumber min={0} max={268435455} style={{ width: '100%' }} />
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label="TAC" name="cmTac">
                                <InputNumber min={0} max={65535} style={{ width: '100%' }} />
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Item label="上行频点" name="cmUlarfcn">
                                <InputNumber style={{ width: '100%' }} />
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label="下行频点" name="cmDlarfcn">
                                <InputNumber style={{ width: '100%' }} />
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={24}>
                            <Item label="PCI" name="cmPci">
                                <InputNumber style={{ width: '100%' }} />
                            </Item>
                        </Col>
                    </Row>
                </div>
            </fieldset>
            <fieldset style={{ marginTop: '14px' }}>
                <legend>
                    联通
                </legend>
                <div className="form-box">
                    <Row gutter={12}>
                        <Col span={12}>
                            <Item label="Cell ID" name="cuCellId" >
                                <InputNumber min={0} max={268435455} style={{ width: '100%' }} />
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label="TAC" name="cuTac">
                                <InputNumber min={0} max={65535} style={{ width: '100%' }} />
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Item label="上行频点" name="cuUlarfcn">
                                <InputNumber style={{ width: '100%' }} />
                            </Item>
                        </Col>
                        <Col span={12}>
                            <Item label="下行频点" name="cuDlarfcn">
                                <InputNumber style={{ width: '100%' }} />
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={24}>
                            <Item label="PCI" name="cuPci">
                                <InputNumber style={{ width: '100%' }} />
                            </Item>
                        </Col>
                    </Row>
                </div>
            </fieldset>
        </Sort>
        <Row style={{ marginTop: '14px' }}>
            <Col span={24}>
                <Item className="fn-align-right">
                    <Button
                        onClick={async () => {
                            message.destroy();
                            const values = formRef.getFieldsValue();
                            try {
                                setLoading(true);
                                const res = await request('/api/v1/enable4GRF',
                                    mapValues(values, value => typeof value === 'number' ? String(value) : value), 'POST');
                                if (res.success) {
                                    message.success('设置成功');
                                } else {
                                    message.success(`设置失败 ${res.error_message}`);
                                }
                            } catch (error) {
                                console.log(error);
                                message.warning(`设置失败 ${error.message}`);
                            } finally {
                                setLoading(false);
                            }
                        }}
                        disabled={loading}
                        type="primary">
                        {loading ? <LoadingOutlined /> : <CheckCircleOutlined />}
                        <span>设置</span>
                    </Button>
                </Item>
            </Col>
        </Row>
    </Form>;
};

export { Set4gForm };