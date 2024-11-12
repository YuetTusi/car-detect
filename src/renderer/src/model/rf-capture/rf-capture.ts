import log from 'electron-log/renderer';
import { create } from 'zustand';
import { RfCaptureState } from './index';
import { request } from '@renderer/util/http';
import { RFData } from '@renderer/schema/rf-data';

const useRfCapture = create<RfCaptureState>((setState, getState) => ({
  blackListCache: [],
  whiteListCache: [],
  /**
   * 侦码结果
   */
  rfCaptureData: [],
  /**
   * 更新侦码结果
   * @param payload 侦码数据
   */
  setRfCaptureData(payload: any[]): void {
    setState({ rfCaptureData: payload });
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
  async queryRfCaptureData(): Promise<boolean> {
    const url = '/api/v1/get4GRFCaptureDatas';
    try {
      const { success, data } = await request<RFData[]>(url, null);
      const { rfCaptureData } = getState();
      if (!success) {
        return false;
      }

      const next: RFData[] = rfCaptureData;
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
      setState({ rfCaptureData: next });
      return true;
    } catch (error) {
      console.log(error);
      log.error(
        `查询侦码数据失败 @model>rf>queryRfCaptureData():${error.message}`,
      );
      return false;
    }
  },
}));

export { useRfCapture };
