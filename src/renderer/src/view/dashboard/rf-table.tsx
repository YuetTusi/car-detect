import { FC } from 'react';
import { Table } from 'antd';
import { helper } from '@renderer/util/helper';
import { useRfCapture } from '@renderer/model';
import { getRfColumns } from './column';
import { RfTableProp } from './prop';

/**
 * 侦码数据 
 */
const RfTable: FC<RfTableProp> = () => {

    const { rfCaptureData } = useRfCapture();
    const columns = getRfColumns(rfCaptureData);

    const renderData = (): any[] => {
        const fields: string[] = columns.map(col => col.dataIndex);//取所有的列名

        return rfCaptureData.map(item => {
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

export { RfTable };