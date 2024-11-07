
import { FC } from 'react';
import { Panel } from '@renderer/components/panel';
import { useBaseBand, useLocation4g, useRfCapture } from '@renderer/model';
import { BandTable } from './band-table';
import { RfTable } from './rf-table';
import { LocationTable } from './location-table';
import { Category } from './styled/box';
import { DashboardProp } from './prop';
// const { ipcRenderer } = window.electron;


const Dashboard: FC<DashboardProp> = () => {

    const { queryBaseBandData } = useBaseBand();
    const { queryRfCaptureData } = useRfCapture();
    const { queryLocation4gData } = useLocation4g();

    return <div style={{ margin: '5px' }}>
        <div>
            <button type="button" onClick={async () => {
                queryBaseBandData();
                queryRfCaptureData();
                queryLocation4gData();
            }}>test</button>
        </div>
        <Panel title="结果">
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

export { Dashboard };