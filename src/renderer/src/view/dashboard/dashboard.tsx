import { FC } from 'react';
import { Table } from 'antd';
import { DashboardProp } from './prop';
import { Panel } from '@renderer/components/panel';
import { request } from '@renderer/util/http';
import { polling } from '@renderer/util/polling';
// import { useReading } from '@renderer/model';

const Dashboard: FC<DashboardProp> = () => {

    return <div style={{ margin: '5px' }}>
        <div>
            <button type="button" onClick={async () => {

                polling(async (): Promise<boolean> => {
                    const res = await request('/demo.json', null);
                    console.log(res);
                    return true;
                });





                // fetch('http://127.0.0.1:8081/demo.json', {
                //     method: 'get',
                //     headers: { "Content-Type": "application/json;charset=utf8" },
                //     mode: "cors" //跨域请求
                // })
                //     .then(res => {
                //         return res.json();
                //     })
                //     .then(json => {
                //         console.log(json);
                //         console.log(JSON.parse(json));
                //     })
                //     .catch(err => console.log(err));

            }}>test</button>
        </div>
        <Panel title="数据">
            <Table
                columns={[{
                    title: '运营商',
                    dataIndex: 'col1',
                    key: 'col1'
                }, {
                    title: 'RSSI',
                    dataIndex: 'col2',
                    key: 'col2'
                }, {
                    title: 'IMSI',
                    dataIndex: 'col3',
                    key: 'col3'
                }, {
                    title: 'IMEI',
                    dataIndex: 'col4',
                    key: 'col4'
                }, {
                    title: '归属地',
                    dataIndex: 'col5',
                    key: 'col5'
                }, {
                    title: '时间',
                    dataIndex: 'col6',
                    key: 'col6'
                }]}
            />
        </Panel>
    </div>;
};

export { Dashboard };