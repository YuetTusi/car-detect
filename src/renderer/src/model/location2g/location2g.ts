import { create } from 'zustand';
import log from 'electron-log/renderer';
import { request } from '@renderer/util/http';
import { Location } from '@renderer/schema/location';
import { Location2gState } from '.';

const useLocation2g = create<Location2gState>((setState, getState) => ({
  /**
   * 定位数据
   */
  location2gData: [],
  /**
   * 更新定位数据
   */
  setLocation2gData(payload: any[]): void {
    setState({ location2gData: payload });
  },
  /**
   * 查询定位数据
   */
  async queryLocation2gData(): Promise<boolean> {
    const url = '/api/v1/get2GRFLocationDatas';

    try {
      const { success, data } = await request(url, null);
      const { location2gData } = getState();
      if (!success) {
        return false;
      }

      if (location2gData.length === 0) {
        setState({ location2gData: data! });
      } else {
        const next: Location[] = location2gData;
        for (let i = 0; i < data!.length; i++) {
          const index = next.findIndex(
            (item) => item.IMSI.value === data![i].IMSI.value,
          );
          if (index === -1) {
            next.push(data![i]);
          } else {
            next[index] = {
              ...next[index],
              RSSI: { ...data![i].RSSI },
              RSRP: { ...data![i].RSRP },
            };
          }
        }
        setState({ location2gData: next });
      }
      return true;
    } catch (error) {
      log.error(
        `查询侦码数据失败 @model>location2g>queryLocation2gData():${error.message}`,
      );
      return false;
    }
  },
}));

export { useLocation2g };
