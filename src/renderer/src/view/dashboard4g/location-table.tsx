import { FC } from 'react';
import { Table } from 'antd';
import { useLocation4g } from '@renderer/model';
import { getLocationColumns } from './column';
import { LocationTableProp } from './prop';
import { helper } from '@renderer/util/helper';

/**
 * 定位数据（只有设置了黑白名单才会有数据） 
 */
const LocationTable: FC<LocationTableProp> = () => {

    const { location4gData } = useLocation4g();
    const columns = getLocationColumns(location4gData);

    const renderData = (): any[] => {
        const fields: string[] = columns.map(col => col.dataIndex);//取所有的列名

        return location4gData.map(item => {
            let row: Record<string, any> = {};
            for (let i = 0; i < fields.length; i++) {
                row = {
                    ...row,
                    [fields[i]]: item[fields[i]]?.value ?? ''//用每一个列名去找每行对应的字段.value值
                };
            }
            return row;
        });
    };

    return <Table
        columns={columns}
        dataSource={renderData()}
        rowKey={() => helper.nextId()}
        bordered={true}
        pagination={false}
    // scroll={{ x: 800 }}
    />;
};

export { LocationTable };