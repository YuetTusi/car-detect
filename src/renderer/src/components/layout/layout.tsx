import { FC } from 'react';
import {
    CarOutlined,
    FileTextOutlined,
    DesktopOutlined
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { App, Form, Tabs } from 'antd';
import { Set4gForm } from './set4g-form';
import { Set2gForm } from './set2g-form';
import { useIsSet, useSubscribe } from '@renderer/hook';
import {
    useBaseBand4g,
    useLocation4g,
    useRfCapture4g,
    useBaseBand2g,
    useLocation2g,
    useRfCapture2g
} from '@renderer/model';
import { Panel } from '../panel';
import { LayoutBox } from './styled/box';
import { LayoutProp, Set2gFormValue, Set4gFormValue } from './prop';

const { useForm } = Form;

const Layout: FC<LayoutProp> = ({ children }) => {

    const { modal } = App.useApp();
    const [set4gFormRef] = useForm<Set4gFormValue>();
    const [set2gFormRef] = useForm<Set2gFormValue>();
    const isSet = useIsSet();
    const { queryBaseBand4gData } = useBaseBand4g();
    const { queryRfCapture4gData } = useRfCapture4g();
    const { queryLocation4gData } = useLocation4g();
    const { queryBaseBand2gData } = useBaseBand2g();
    const { queryLocation2gData } = useLocation2g();
    const { queryRfCapture2gData } = useRfCapture2g();

    useSubscribe('polling', () => {
        Promise.all([
            queryBaseBand4gData(),
            queryRfCapture4gData(),
            queryLocation4gData(),
            queryBaseBand2gData(),
            queryLocation2gData(),
            queryRfCapture2gData()
        ]);
    });

    useSubscribe('start-service', (_, success) => {
        if (!success) {
            modal.warning({
                title: '警告',
                content: '服务启动失败',
                centered: true,
                okText: '确定'
            });
        }
    });

    return <LayoutBox>
        <div className="layout-left">
            <div className="layout-logo">
                <CarOutlined style={{ color: '#fdc46a' }} />
                <span>车检管理系统</span>
            </div>
            <div className="layout-fn" style={{ display: isSet ? 'block' : 'none' }}>
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
                                    children: <Set2gForm formRef={set2gFormRef} />
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
                        <span>4G数据</span>
                    </NavLink>
                    <NavLink to="/2g" className="fn-button">
                        <DesktopOutlined />
                        <span>2G数据</span>
                    </NavLink>
                    <NavLink to="/log" className="fn-button">
                        <FileTextOutlined />
                        <span>日志记录</span>
                    </NavLink>
                </div>
                {/* <button type="button" onClick={async () => {
                    const isSet = await window.electron.ipcRenderer.invoke('is-set');
                    console.clear();
                    console.log(isSet);
                }}>test</button> */}
            </div>
            <div className="layout-content" style={{ left: isSet ? '0px' : '-340px' }}>
                {children}
            </div>
        </div>
    </LayoutBox >;
};

export { Layout };