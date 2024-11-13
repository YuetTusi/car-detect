import log from 'electron-log/renderer';
import { create } from 'zustand';
import { RfCapture2gState } from './index';
import { request } from '@renderer/util/http';
import { RFData } from '@renderer/schema/rf-data';

const useRfCapture2g = create<RfCapture2gState>((setState, getState) => ({
  blackListCache: [],
  whiteListCache: [],
  /**
   * 侦码结果
   */
  rfCapture2gData: [],
  /**
   * 更新侦码结果
   * @param payload 侦码数据
   */
  setRfCapture2gData(payload: any[]): void {
    setState({ rfCapture2gData: payload });
  },
  /**
   * 加到黑名单
   * @param payload IMSI
   * @returns
   */
  addToBlackList(payload: string): void {
    const list = getState().blackListCache;
    list.push(payload);
    setState({ blackListCache: Array.from(new Set(list)) });
  },
  /**
   * 加到白名单
   * @param payload IMSI
   * @returns
   */
  addToWhiteList(payload: string): void {
    const list = getState().whiteListCache;
    list.push(payload);
    setState({ whiteListCache: Array.from(new Set(list)) });
  },
  /**
   * 清空黑名单
   */
  clearBlackList(): void {
    setState({ blackListCache: [] });
  },
  /**
   * 清空白名单
   */
  clearWhiteList(): void {
    setState({ whiteListCache: [] });
  },
  /**
   * 查询侦码数据
   * @returns
   */
  async queryRfCapture2gData(): Promise<boolean> {
    const url = '/api/v1/get2GRFCaptureDatas';
    try {
      const { success, data } = await request<RFData[]>(url, null);
      const { rfCapture2gData } = getState();
      if (!success) {
        return false;
      }

      const next: RFData[] = rfCapture2gData;
      for (let i = 0; i < data!.length; i++) {
        const index = next.findIndex(
          (item) => item.IMSI.value === data![i].IMSI.value,
        );
        if (index === -1) {
          next.push(data![i]);
        } else {
          next[index] = { ...next[index], RSSI: { ...data![i].RSSI } };
          // next[0].push({ ...has, RSSI: { ...data![i].RSSI } });
        }
      }
      setState({ rfCapture2gData: next });
      return true;
    } catch (error) {
      console.log(error);
      log.error(
        `查询侦码数据失败 @model>rf-capture2g>queryRfCapture2gData():${error.message}`,
      );
      return false;
    }
  },
}));

export { useRfCapture2g };
