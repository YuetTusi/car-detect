import { RFData } from '@renderer/schema/rf-data';
import { useRfCapture2g } from './rf-capture2g';

interface RfCapture2gState {
  /**
   * 侦码结果
   */
  rfCapture2gData: RFData[];
  /**
   * 更新侦码结果
   * @param payload 侦码数据
   */
  setRfCapture2gData: (payload: any[]) => void;
  /**
   * 查询侦码数据
   * @returns
   */
  queryRfCapture2gData: () => Promise<boolean>;
}

export type { RfCapture2gState };
export { useRfCapture2g };
