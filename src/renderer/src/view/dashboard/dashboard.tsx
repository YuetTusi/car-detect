import log from 'electron-log/renderer';
import { FC, JSX, useState } from 'react';
import { DashboardProp } from './prop';
import { Panel } from '@renderer/components/panel';
import { request } from '@renderer/util/http';
// import { polling } from '@renderer/util/polling';
import { Category, ResultTableBox } from './styled/box';
import { BasebandInfo } from '@renderer/schema/baseband-info';
import { useRf } from '@renderer/model';
import { RFData } from '@renderer/schema/rf-data';
import { helper } from '@renderer/util/helper';
// import { useReading } from '@renderer/model';

const { ipcRenderer } = window.electron;


const Dashboard: FC<DashboardProp> = () => {

    const [data, setData] = useState<any>();
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

                queryRfData();

                // const res = await request('http://localhost:3000/data', null);

                // console.log(res);
                // const res = await request('/demo.json', null);

                // const r = await ipcRenderer.invoke('update', ["test", { _id: 'T00mMGnkYKfBecNJ' }, { test: 'xyz' }]);

                // const r = await ipcRenderer.invoke('all', ['test']);
                // console.log(r);
                // db.insert(res[0]);
                // setData(res[0]);
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