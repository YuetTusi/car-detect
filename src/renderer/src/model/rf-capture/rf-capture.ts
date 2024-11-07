import log from 'electron-log/renderer';
import { create } from 'zustand';
import { RfCaptureState } from './index';
import { request } from '@renderer/util/http';
import { RFData } from '@renderer/schema/rf-data';

const useRfCapture = create<RfCaptureState>((setState, getState) => ({
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

      if (rfCaptureData.length === 0) {
        setState({ rfCaptureData: data! });
      } else {
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
      }
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
