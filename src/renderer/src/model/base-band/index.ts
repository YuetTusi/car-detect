import { BasebandInfo } from '@renderer/schema/baseband-info';
import { useBaseBand } from './base-band';

interface BaseBandState {
  /**
   * 设备数据
   */
  baseBandData: BasebandInfo[];
  /**
   * 更新设备数据
   * @param payload 设备数据
   */
  setBaseBandData: (payload: BasebandInfo[]) => void;
  /**
   * 查询设备数据
   * @returns
   */
  queryBaseBandData: () => Promise<boolean>;
}

export type { BaseBandState };
export { useBaseBand };
