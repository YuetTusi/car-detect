import { create } from 'zustand';
import log from 'electron-log/renderer';
import { request } from '@renderer/util/http';
import { RFData } from '@renderer/schema/rf-data';
import { RfCapture4gState } from './index';

const useRfCapture4g = create<RfCapture4gState>((setState) => ({
  /**
   * 侦码结果
   */
  rfCapture4gData: [],
  /**
   * 更新侦码结果
   * @param payload 侦码数据
   */
  setRfCapture4gData(payload: any[]): void {
    setState({ rfCapture4gData: payload });
  },
  /**
   * 查询侦码数据
   * @returns
   */
  async queryRfCapture4gData(): Promise<boolean> {
    const url = '/api/v1/get4GRFCaptureDatas';
    try {
      const { success, data } = await request<RFData[]>(url, null);

      if (!success) {
        return false;
      }

      setState({ rfCapture4gData: data ?? [] });
      return true;
    } catch (error) {
      console.log(error);
      log.error(
        `查询侦码数据失败 @model>rf-capture4g>queryRfCapture4gData():${error.message}`,
      );
      return false;
    }
  },
}));

export { useRfCapture4g };
