import { FC } from 'react';
import { App, Table } from 'antd';
import { helper } from '@renderer/util/helper';
import { useRfCapture2g } from '@renderer/model';
import { request } from '@renderer/util/http';
import { getRfColumns } from './column';
import { ActionType, RfTableProp } from './prop';

/**
 * 侦码数据 
 */
const RfTable: FC<RfTableProp> = () => {

    const { modal, message } = App.useApp();
    const {
        rfCapture2gData,
        whiteListCache,
        blackListCache,
        addToBlackList,
        addToWhiteList,
        // setRfCapture2gData
    } = useRfCapture2g();
    // const { setBaseBand2gData } = useBaseBand2g();
    // const { setLocation2gData } = useLocation2g();
    const columns = getRfColumns(rfCapture2gData, (actionType, { IMSI }) => {
        let type: string = '';
        let params: Record<string, any> = {};
        switch (actionType) {
            case ActionType.BlackList:
                type = '黑名单';
                params = { blackList: blackListCache.concat(IMSI).join(',') };
                break;
            case ActionType.WhiteList:
                type = '白名单';
                params = { whiteList: whiteListCache.concat(IMSI).join(',') };
                break;
            default:
                console.warn('未知类型', actionType);
                break;
        }
        modal.confirm({
            async onOk() {
                message.destroy();
                try {
                    const { success, error_message } = await request('/api/v1/enable2GRF', {
                        "cmArfcn": "53",
                        "cuArfcn": "125",
                        ...params
                    }, 'POST');
                    if (success) {
                        message.success(`${type}添加成功`);
                        if (actionType === ActionType.WhiteList) {
                            addToWhiteList(IMSI);
                        } else {
                            addToBlackList(IMSI);
                        }
                        // setBaseBand2gData([]);
                        // setLocation2gData([]);
                        // setRfCapture2gData([]);
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
            content: `确认将 IMSI:${IMSI} 加入${type}？`,
            okText: '是',
            cancelText: '否'
        });
    });

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