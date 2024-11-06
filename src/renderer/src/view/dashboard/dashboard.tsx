import log from 'electron-log/renderer';
import { FC, JSX, useState } from 'react';
import { DashboardProp } from './prop';
import { Panel } from '@renderer/components/panel';
import { request } from '@renderer/util/http';
// import { polling } from '@renderer/util/polling';
import { Category, ResultTableBox } from './styled/box';
import { BasebandInfo } from '@renderer/schema/baseband-info';
import { useReading, useRf } from '@renderer/model';
import { RFData } from '@renderer/schema/rf-data';
import { helper } from '@renderer/util/helper';
// import { useReading } from '@renderer/model';

const { ipcRenderer } = window.electron;


const Dashboard: FC<DashboardProp> = () => {

    const { rfData, queryRfData } = useRf();

    const renderRfTable = (data: RFData[]): JSX.Element[] => {

        if (helper.isNullOrUndefined(data)) {
            return [];
        }

        return data.map((item, index) => {
            const rows: JSX.Element[] = [];
            for (const [k, v] of Object.entries(item)) {
                rows.push(<tr key={`R_${k}`}>
                    <td>{v.name}</td>
                    <td>{v.value}</td>
                </tr>);
            }

            return <fieldset key={`RF_${index}`}>
                <legend>{item.ULFCN.value}</legend>
                <div style={{ padding: '14px' }}>
                    <ResultTableBox>
                        <tbody>
                            {rows}
                        </tbody>
                    </ResultTableBox>
                </div>
            </fieldset>;
        });
    };

    return <div style={{ margin: '5px' }}>
        <div>
            <button type="button" onClick={async () => {
                const res = await request('/api/v1/enable4GRF', {
                    "cmDlarfcn": "38950",
                    "cmUlarfcn": "38950",
                    "cmPci": "501",
                    "cmCellId": "111111",
                    "cmTac": "11111",
                    "cuDlarfcn": "1650",
                    "cuUlarfcn": "19650",
                    "cuPci": "500",
                    "cuCellId": "222222",
                    "cuTac": "22222"
                }, 'POST');

                console.clear();
                console.log(res);
            }}>test</button>
        </div>
        <Panel title="结果">
            <Category>
                {renderRfTable(rfData)}
                {/* <fieldset>
                    <legend>4G</legend>
                    <div style={{ padding: '14px' }}>
                        <ResultTableBox>
                            <tbody>
                                {renderRfTable(rfData[0] as any)}
                            </tbody>
                        </ResultTableBox>
                    </div>
                </fieldset> */}

            </Category>
        </Panel>
    </div>;
};

export { Dashboard };