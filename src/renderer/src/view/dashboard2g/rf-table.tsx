import { FC, useState } from 'react';
import { App, Button, Table } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { request } from '@renderer/util/http';
import { useRfCapture2g } from '@renderer/model';
import { getRfColumns } from './column';
import { RfTableProp } from './prop';
import { ButtonBar } from './styled/box';

/**
 * 侦码数据 
 */
const RfTable: FC<RfTableProp> = () => {

    const { modal, message } = App.useApp();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const {
        rfCapture2gData
    } = useRfCapture2g();


    const columns = getRfColumns(rfCapture2gData);

    const renderData = (): any[] => {
        const fields: string[] = columns.map(col => col.dataIndex);//取所有的列名

        return rfCapture2gData.map(item => {
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

    return <>
        <ButtonBar>
            <Button
                onClick={() => {
                    modal.confirm({
                        async onOk() {
                            message.destroy();
                            try {
                                const { success, error_message } = await request('/api/v1/enable2GRF', {
                                    "cmArfcn": "50",
                                    "cuArfcn": "120",
                                    blackList: selectedRowKeys.join(',')
                                }, 'POST');
                                if (success) {
                                    message.success('添加成功');
                                    setSelectedRowKeys([]);
                                } else {
                                    message.warning(`添加失败 ${error_message}`);
                                }
                            } catch (error) {
                                message.warning(`添加失败 ${error.message}`);
                            }
                        },
                        centered: true,
                        content: `确认将勾选的 ${selectedRowKeys.length} 项侦码数据加入黑名单？`,
                        title: '黑名单',
                        okText: '是',
                        cancelText: '否'
                    });
                }}
                disabled={selectedRowKeys.length === 0}
                type="primary">
                <PlusCircleFilled />
                <span>黑名单</span>
            </Button>
        </ButtonBar>
        <Table
            columns={columns}
            dataSource={renderData()}
            rowKey="IMEI"
            rowSelection={{
                selectedRowKeys,
                onChange(selectedRowKeys) {
                    setSelectedRowKeys(selectedRowKeys);
                },
            }}
            bordered={true}
            pagination={false}
        // scroll={{ y: 800 }}
        />
    </>;
};

export { RfTable };