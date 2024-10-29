import { FC } from 'react';
import { Table } from 'antd';
import { DashboardProp } from './prop';
import { Panel } from '@renderer/components/panel';

const Dashboard: FC<DashboardProp> = () => {

    return <div style={{ margin: '5px' }}>
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