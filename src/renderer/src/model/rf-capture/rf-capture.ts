import log from 'electron-log/renderer';
import { create } from 'zustand';
import { RfCaptureState } from './index';
import { request } from '@renderer/util/http';

const useRfCapture = create<RfCaptureState>((setState) => ({
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
      const { success, data } = await request(url, null);
      console.log(data);
      if (!success) {
        setState({ rfCaptureData: [] });
        return false;
      }
      setState({ rfCaptureData: data ?? [] });
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
