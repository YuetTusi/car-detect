import log from 'electron-log/renderer';
import { FC, JSX, useEffect, useState } from 'react';
import { DashboardProp } from './prop';
import { Panel } from '@renderer/components/panel';
import { request } from '@renderer/util/http';
// import { polling } from '@renderer/util/polling';
import { Category, ResultTableBox } from './styled/box';
import { BasebandInfo } from '@renderer/schema/baseband-info';
import { useBaseBand } from '@renderer/model';
import { RFData } from '@renderer/schema/rf-data';
import { helper } from '@renderer/util/helper';
import { BandTable } from './band-table';
// import { useReading } from '@renderer/model';

const { ipcRenderer } = window.electron;


const Dashboard: FC<DashboardProp> = () => {

    const { queryBaseBandData } = useBaseBand();

    return <div style={{ margin: '5px' }}>
        <div>
            <button type="button" onClick={async () => {
                queryBaseBandData();
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
        </Panel>
    </div>;
};

export { Dashboard };