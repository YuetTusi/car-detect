import debounce from 'lodash/debounce';
import { FC, MouseEvent } from 'react';
import { PlayCircleOutlined, PoweroffOutlined } from '@ant-design/icons';
import { App, Button } from 'antd';
import { useIsSet } from '@renderer/hook';
import { request } from '@renderer/util/http';
import { Panel } from '@renderer/components/panel';
import {
    useBaseBand4g,
    useLocation4g,
    useRfCapture4g
} from '@renderer/model';
import { BandTable } from './band-table';
import { RfTable } from './rf-table';
import { LocationTable } from './location-table';
import { SwitchBar, Category } from './styled/box';
import { Dashboard4gProp } from './prop';

const Dashboard4g: FC<Dashboard4gProp> = () => {

    const { message } = App.useApp();
    const isSet = useIsSet();
    const { setBaseBand4gData } = useBaseBand4g();
    const { setRfCapture4gData } = useRfCapture4g();
    const { setLocation4gData } = useLocation4g();

    /**
     * 开启4G
     */
    const enable4gClick = debounce(async (event: MouseEvent): Promise<void> => {
        event.preventDefault();
        try {
            const res = await request('/api/v1/enable4GRF', {}, 'POST');
            if (res.success) {
                setBaseBand4gData([]);
                setLocation4gData([]);
                setRfCapture4gData([]);
                message.success('设置成功');
            } else {
                message.warning(`设置失败 ${res.error_message}`);
            }
        } catch (error) {
            message.warning(`设置失败 ${error.message}`);
        }
    }, 500, { leading: true, trailing: false });

    /**
     * 关闭4G
     */
    const disable4gClick = debounce(async (event: MouseEvent): Promise<void> => {
        event.preventDefault();
        try {
            const res = await request('/api/v1/disable4GRF', null);
            if (res.success) {
                setBaseBand4gData([]);
                setLocation4gData([]);
                setRfCapture4gData([]);
                message.success('设置成功');
            } else {
                message.warning(`设置失败 ${res.error_message}`);
            }
        } catch (error) {
            message.warning(`设置失败 ${error.message}`);
        }
    }, 500, { leading: true, trailing: false });

    return <div style={{ margin: '5px' }}>
        <Panel title="4G">
            <SwitchBar style={{ display: isSet ? 'block' : 'none' }}>
                <Button onClick={enable4gClick} type="primary">
                    <PlayCircleOutlined />
                    <span>开启</span>
                </Button>
                <Button onClick={disable4gClick} type="primary">
                    <PoweroffOutlined />
                    <span>关闭</span>
                </Button>
            </SwitchBar>
            <Category>
                <fieldset>
                    <legend>设备</legend>
                    <div style={{ padding: '14px' }}>
                        <BandTable />
                    </div>
                </fieldset>
            </Category>
            <Category>
                <fieldset>
                    <legend>侦码</legend>
                    <div style={{ padding: '14px' }}>
                        <RfTable />
                    </div>
                </fieldset>
            </Category>
            <Category>
                <fieldset>
                    <legend>定位</legend>
                    <div style={{ padding: '14px' }}>
                        <LocationTable />
                    </div>
                </fieldset>
            </Category>
        </Panel>
    </div>;
};

export { Dashboard4g };