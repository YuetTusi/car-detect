import debounce from 'lodash/debounce';
import { FC, MouseEvent } from 'react';
import { App, Button } from 'antd';
import { PlayCircleOutlined, PoweroffOutlined } from '@ant-design/icons';
import { useIsSet } from '@renderer/hook';
import { request } from '@renderer/util/http';
import { Panel } from '@renderer/components/panel';
import { useBaseBand2g, useLocation2g, useRfCapture2g } from '@renderer/model';
import { BandTable } from './band-table';
import { RfTable } from './rf-table';
import { LocationTable } from './location-table';
import { Category, SwitchBar } from './styled/box';
import { Dashboard2gProp } from './prop';

const Dashboard2g: FC<Dashboard2gProp> = () => {

    const { message } = App.useApp();
    const isSet = useIsSet();
    const { setRfCapture2gData } = useRfCapture2g();
    const { setBaseBand2gData } = useBaseBand2g();
    const { setLocation2gData } = useLocation2g();

    /**
     * 开启2G
     */
    const enable2gClick = debounce(async (event: MouseEvent): Promise<void> => {
        event.preventDefault();
        try {
            const res = await request('/api/v1/enable2GRF', {}, 'POST');
            if (res.success) {
                setBaseBand2gData([]);
                setLocation2gData([]);
                setRfCapture2gData([]);
                message.success('设置成功');
            } else {
                message.warning(`设置失败 ${res.error_message}`);
            }
        } catch (error) {
            message.warning(`设置失败 ${error.message}`);
        }
    }, 500, { leading: true, trailing: false });

    /**
     * 关闭2G
     */
    const disable2gClick = debounce(async (event: MouseEvent): Promise<void> => {
        event.preventDefault();
        try {
            const res = await request('/api/v1/disable2GRF', null);
            if (res.success) {
                setBaseBand2gData([]);
                setLocation2gData([]);
                setRfCapture2gData([]);
                message.success('设置成功');
            } else {
                message.warning(`设置失败 ${res.error_message}`);
            }
        } catch (error) {
            message.warning(`设置失败 ${error.message}`);
        }
    }, 500, { leading: true, trailing: false });

    return <div style={{ margin: '5px' }}>
        <Panel title="2G">
            <SwitchBar style={{ display: isSet ? 'block' : 'none' }}>
                <Button onClick={enable2gClick} type="primary">
                    <PlayCircleOutlined />
                    <span>开启</span>
                </Button>
                <Button onClick={disable2gClick} type="primary">
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

export { Dashboard2g };