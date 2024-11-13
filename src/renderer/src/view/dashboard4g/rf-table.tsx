import { FC } from 'react';
import { App, Table } from 'antd';
import { helper } from '@renderer/util/helper';
import { useRfCapture4g } from '@renderer/model';
import { request } from '@renderer/util/http';
import { getRfColumns } from './column';
import { ActionType, RfTableProp } from './prop';

// //黑白名单缓存
// const whiteListSet = new Set<string>();
// const blackListSet = new Set<string>();

/**
 * 侦码数据 
 */
const RfTable: FC<RfTableProp> = () => {

    const { modal, message } = App.useApp();
    const {
        rfCapture4gData, whiteListCache, blackListCache, addToBlackList, addToWhiteList
    } = useRfCapture4g();
    const columns = getRfColumns(rfCapture4gData, (actionType, record) => {
        const type = actionType === ActionType.WhiteList ? '白名单' : '黑名单';
        modal.confirm({
            async onOk() {
                const { IMSI } = record;
                const params = actionType === ActionType.WhiteList
                    ? { whiteList: whiteListCache.concat(IMSI).join(',') }
                    : { blackList: blackListCache.concat(IMSI).join(',') };
                message.destroy();
                try {
                    const { success, error_message } = await request('/api/v1/set4GBlackWhiteList', params, 'POST');
                    if (success) {
                        message.success(`${type}添加成功`);
                        if (actionType === ActionType.WhiteList) {
                            addToWhiteList(IMSI);
                        } else {
                            addToBlackList(IMSI);
                        }
                    } else {
                        message.warning(`${type}添加失败 ${error_message}`);
                    }
                } catch (error) {
                    console.log(error);
                    message.warning(`操作失败 ${error.message}`);
                }
            },
            centered: true,
            title: type,
            content: `确认将 IMSI:${record.IMSI} 加入${type}？`,
            okText: '是',
            cancelText: '否'
        });
    });

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

    return <Table
        columns={columns}
        dataSource={renderData()}
        rowKey={() => helper.nextId()}
        bordered={true}
        pagination={false}
    // scroll={{ y: 800 }}
    />;
};

export { RfTable };