import { RFData } from '@renderer/schema/rf-data';
import { useRfCapture } from './rf-capture';

interface RfCaptureState {
  /**
   * 侦码结果
   */
  rfCaptureData: RFData[];
  /**
   * 更新侦码结果
   * @param payload 侦码数据
   */
  setRfCaptureData: (payload: any[]) => void;
  /**
   * 查询侦码数据
   * @returns
   */
  queryRfCaptureData: () => Promise<boolean>;
}

export type { RfCaptureState };
export { useRfCapture };
