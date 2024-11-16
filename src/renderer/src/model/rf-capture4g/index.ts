import { RFData } from '@renderer/schema/rf-data';
import { useRfCapture4g } from './rf-capture4g';

interface RfCapture4gState {
  /**
   * 侦码结果
   */
  rfCapture4gData: RFData[];
  /**
   * 更新侦码结果
   * @param payload 侦码数据
   */
  setRfCapture4gData: (payload: any[]) => void;
  /**
   * 查询侦码数据
   * @returns
   */
  queryRfCapture4gData: () => Promise<boolean>;
}

export type { RfCapture4gState };
export { useRfCapture4g };
