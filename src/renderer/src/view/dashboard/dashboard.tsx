import { FC, JSX, useState } from 'react';
import { DashboardProp } from './prop';
import { Panel } from '@renderer/components/panel';
import { request } from '@renderer/util/http';
// import { polling } from '@renderer/util/polling';
import { BasebandInfo } from '@renderer/schema/BasebandInfo';
import { ResultTableBox } from './styled/box';
// import { useReading } from '@renderer/model';

const { ipcRenderer } = window.electron;


const Dashboard: FC<DashboardProp> = () => {


    const [data, setData] = useState<any>();

    const renderTable = (data: BasebandInfo): JSX.Element[] => {

        if (data === undefined) {
            return [];
        }

        const rows: JSX.Element[] = [];

        for (const [k, v] of Object.entries(data)) {

            rows.push(<tr key={`R_${k}`}>
                <td>{v.name}</td>
                <td>{v.value}</td>
            </tr>);
        }

        return rows;
    };

    return <div style={{ margin: '5px' }}>
        <div>
            <button type="button" onClick={async () => {

                // const res = await request('http://localhost:3000/data', null);
                // const res = await request('/demo.json', null);

                // const r = await ipcRenderer.invoke('update', ["test", { _id: 'T00mMGnkYKfBecNJ' }, { test: 'xyz' }]);

                const r = await ipcRenderer.invoke('all', ['test']);
                console.log(r);
                // db.insert(res[0]);
                // setData(res[0]);
            }}>test</button>
        </div>
        <Panel title="结果">
            <ResultTableBox>
                <tbody>
                    {renderTable(data)}
                </tbody>
            </ResultTableBox>
        </Panel>
    </div>;
};

export { Dashboard };