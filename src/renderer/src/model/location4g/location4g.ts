import log from 'electron-log/renderer';
import { create } from 'zustand';
import { Location4gState } from '.';
import { request } from '@renderer/util/http';
import { Location } from '@renderer/schema/location';

const useLocation4g = create<Location4gState>((setState, getState) => ({
  /**
   * 定位数据
   */
  location4gData: [],
  /**
   * 更新定位数据
   */
  setLocation4gData(payload: any[]): void {
    setState({ location4gData: payload });
  },
  /**
   * 查询定位数据
   */
  async queryLocation4gData(): Promise<boolean> {
    const url = '/api/v1/get4GRFLocationDatas';

    try {
      const { success, data } = await request(url, null);
      const { location4gData } = getState();
      if (!success) {
        return false;
      }

      if (location4gData.length === 0) {
        setState({ location4gData: data! });
      } else {
        const next: Location[] = location4gData;
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
        setState({ location4gData: next });
      }
      return true;
    } catch (error) {
      log.error(
        `查询侦码数据失败 @model>rf>queryRfCaptureData():${error.message}`,
      );
      return false;
    }
  },
}));

export { useLocation4g };
