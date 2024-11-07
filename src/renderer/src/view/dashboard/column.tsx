import union from 'lodash/union';
import { PlusCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { BasebandInfo } from '@renderer/schema/baseband-info';
import { RFData } from '@renderer/schema/rf-data';
import { ActionType } from './prop';

const { Group } = Button;

/**
 * 板卡设备表列头
 */
export const getBandColumns = (data: BasebandInfo[]): any[] => {

    let allfields: string[] = [];
    data.forEach(item => {
        //# 由于每条数据的健可能数量不等，因此将所有数据的key取并集
        allfields = union(allfields, Object.keys(item));
    });

    return allfields.map((item, index) => {
        let title = '';

        for (let i = 0; i < data.length; i++) {
            for (const [k, v] of Object.entries(data[i])) {
                if (k === item) {
                    title = v.name;
                    break;
                }
            }
        }

        return {
            title,
            key: item,
            dataIndex: item,
            textWrap: 'word-break',
            // ellipsis: true,
            width: index === 0 ? 50 : undefined
        };
    });
};

/**
 * 侦码表列头
 */
export const getRfColumns = (data: RFData[], handle: (actionType: ActionType, record: RFData) => void): any[] => {

    let allfields: string[] = [];
    data.forEach(item => {
        //# 由于每条数据的健可能数量不等，因此将所有数据的key取并集
        allfields = union(allfields, Object.keys(item));
    });

    const columns: any[] = allfields.map((item, index) => {
        let title = '';

        for (let i = 0; i < data.length; i++) {
            for (const [k, v] of Object.entries(data[i])) {
                if (k === item) {
                    title = v.name;
                    break;
                }
            }
        }

        return {
            title,
            key: item,
            dataIndex: item,
            textWrap: 'word-break',
            // ellipsis: true,
            width: index === 0 ? 50 : undefined
        };
    });

    if (columns.length > 0) {
        columns.push({
            title: '操作',
            key: 'list',
            dataIndex: 'list',
            width: 50,
            align: 'center',
            render: (_, record: RFData) => {
                return <Group>
                    <Button
                        onClick={() => {
                            handle(ActionType.WhiteList, record);
                        }}
                        type="primary"
                        size="small">
                        <PlusCircleFilled />
                        <span>白名单</span>
                    </Button>
                    <Button
                        onClick={() => {
                            handle(ActionType.BlackList, record);
                        }}
                        type="primary"
                        size="small">
                        <PlusCircleFilled />
                        <span>黑名单</span>
                    </Button>
                </Group>;
            }
        });
    }

    return columns;
};
