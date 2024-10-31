import { FC } from 'react';
import {
    CarOutlined,
    FileTextOutlined,
    DesktopOutlined,
    SaveOutlined
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { LayoutProp } from './prop';
import { LayoutBox } from './styled/box';
import { Panel } from '../panel';

const { Item } = Form;

const Layout: FC<LayoutProp> = ({ children }) => {

    return <LayoutBox>
        <div className="layout-left">
            <div className="layout-logo">
                <CarOutlined style={{ color: '#fdc46a' }} />
                <span>车检管理系统</span>
            </div>
            <div className="layout-fn">
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
                <div style={{ padding: '0 5px 5px 5px' }}>
                    <Panel title="参数设置">
                        <Form layout="vertical" style={{ margin: '10px' }}>
                            <Item label="频点">
                                <Input />
                            </Item>
                            <Item>
                                <Button onClick={() => {
                                }} type="primary">
                                    <SaveOutlined />
                                    <span>保存</span>
                                </Button>
                            </Item>
                        </Form>
                    </Panel>
                </div>
            </div>
        </div>
        <div className="layout-right">
            <div className="layout-header">

            </div>
            <div className="layout-content">
                {children}
            </div>
        </div>
    </LayoutBox>;
};

export { Layout };