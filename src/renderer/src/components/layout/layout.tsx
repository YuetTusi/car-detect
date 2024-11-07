import { FC } from 'react';
import {
    CarOutlined,
    FileTextOutlined,
    DesktopOutlined,
    SaveOutlined
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { Col, Row, Button, Form, Tabs } from 'antd';
import { Cm4gForm } from './cm4g-form';
import { LayoutProp, Set4gFormValue } from './prop';
import { LayoutBox } from './styled/box';
import { Panel } from '../panel';
import { Cu4gForm } from './cu4g-form';
import { Set4gForm } from './set4g-form';

const { Item, useForm } = Form;

const Layout: FC<LayoutProp> = ({ children }) => {

    const [set4gFormRef] = useForm<Set4gFormValue>();

    return <LayoutBox>
        <div className="layout-left">
            <div className="layout-logo">
                <CarOutlined style={{ color: '#fdc46a' }} />
                <span>车检管理系统</span>
            </div>
            <div className="layout-fn">
                <div style={{ padding: '0 5px 5px 5px' }}>
                    <Panel title="移动设置">
                        <Tabs
                            items={[
                                {
                                    key: '4g',
                                    label: '4G',
                                    children: <Set4gForm formRef={set4gFormRef} />
                                },
                                {
                                    key: '2g',
                                    label: '2G',
                                    children: null
                                }
                            ]}
                            type="card"
                            size="small">
                        </Tabs>
                    </Panel>
                </div>
            </div>
        </div>
        <div className="layout-right">
            <div className="layout-header">
                <div className="fn-button-group">
                    {/* <NavLink to="/" className="fn-button">
                        <SettingOutlined />
                        <span>参数设置</span>
                    </NavLink> */}
                    <NavLink to="/" className="fn-button">
                        <DesktopOutlined />
                        <span>数据展示</span>
                    </NavLink>
                    <NavLink to="/log" className="fn-button">
                        <FileTextOutlined />
                        <span>日志记录</span>
                    </NavLink>
                </div>
            </div>
            <div className="layout-content">
                {children}
            </div>
        </div>
    </LayoutBox>;
};

export { Layout };