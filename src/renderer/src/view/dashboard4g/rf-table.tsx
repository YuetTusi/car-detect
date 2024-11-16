import { FC, useState } from 'react';
import { PlusCircleFilled } from '@ant-design/icons';
import { App, Button, Table } from 'antd';
import { useRfCapture4g } from '@renderer/model';
import { request } from '@renderer/util/http';
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
        rfCapture4gData,
    } = useRfCapture4g();
    const columns = getRfColumns(rfCapture4gData);

    const renderData = (): any[] => {
        const fields: string[] = columns.map(col => col.dataIndex);//取所有的列名

        return rfCapture4gData.map(item => {
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
                                const { success, error_message } = await request('/api/v1/set4GBlackWhiteList', {
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
            rowKey={'IMSI'}
            rowSelection={{
                selectedRowKeys,
                onChange(selectedRowKeys) {
                    setSelectedRowKeys(selectedRowKeys);
                },
            }}
            bordered={true}
            pagination={false}
        />
    </>;
};

export { RfTable };