import union from 'lodash/union';
import { BasebandInfo } from '@renderer/schema/baseband-info';

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

