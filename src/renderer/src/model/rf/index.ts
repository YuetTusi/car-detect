import { RFData } from '@renderer/schema/rf-data';
import { useRf } from './rf';

interface RfState {
  /**
   * 侦码结果
   */
  rfData: RFData[];
  /**
   * 更新侦码结果
   * @param payload 侦码数据
   */
  setRfData: (payload: any[]) => void;
  /**
   * 查询侦码数据
   * @returns
   */
  queryRfData: () => Promise<void>;
}

export type { RfState };
export { useRf };
