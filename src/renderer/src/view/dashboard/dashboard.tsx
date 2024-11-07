
import { FC } from 'react';
import { DashboardProp } from './prop';
import { Panel } from '@renderer/components/panel';
import { useBaseBand, useRfCapture } from '@renderer/model';
import { BandTable } from './band-table';
import { RfTable } from './rf-table';
import { Category } from './styled/box';

// const { ipcRenderer } = window.electron;


const Dashboard: FC<DashboardProp> = () => {

    const { queryBaseBandData } = useBaseBand();
    const { queryRfCaptureData } = useRfCapture();

    return <div style={{ margin: '5px' }}>
        <div>
            <button type="button" onClick={async () => {
                queryBaseBandData();
                queryRfCaptureData();
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
        </Panel>
    </div>;
};

export { Dashboard };