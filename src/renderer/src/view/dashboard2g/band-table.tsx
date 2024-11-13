import { FC } from 'react';
import { Table } from 'antd';
import { useBaseBand2g } from '@renderer/model';
import { helper } from '@renderer/util/helper';
import { getBandColumns } from './column';
import { BandTableProp } from './prop';

/**
 * 设备数据 
 */
const BandTable: FC<BandTableProp> = () => {

    const { baseBand2gData } = useBaseBand2g();
    const columns = getBandColumns(baseBand2gData);

    const renderData = (): any[] => {
        const fields: string[] = columns.map(col => col.dataIndex);//取所有的列名

        return baseBand2gData.map(item => {
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

export { BandTable };