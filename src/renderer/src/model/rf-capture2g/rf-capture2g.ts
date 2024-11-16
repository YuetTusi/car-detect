import log from 'electron-log/renderer';
import { create } from 'zustand';
import { RfCapture2gState } from './index';
import { request } from '@renderer/util/http';
import { RFData } from '@renderer/schema/rf-data';

const useRfCapture2g = create<RfCapture2gState>((setState) => ({
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
   * 查询侦码数据
   * @returns
   */
  async queryRfCapture2gData(): Promise<boolean> {
    const url = '/api/v1/get2GRFCaptureDatas';
    try {
      const { success, data } = await request<RFData[]>(url, null);
      if (!success) {
        return false;
      }
      console.log(data ?? []);

      setState({ rfCapture2gData: data ?? [] });
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
