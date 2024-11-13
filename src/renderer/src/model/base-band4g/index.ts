import { BasebandInfo } from '@renderer/schema/baseband-info';
import { useBaseBand4g } from './base-band4g';

interface BaseBand4gState {
  /**
   * 设备数据
   */
  baseBand4gData: BasebandInfo[];
  /**
   * 更新设备数据
   * @param payload 设备数据
   */
  setBaseBand4gData: (payload: BasebandInfo[]) => void;
  /**
   * 查询设备数据
   * @returns
   */
  queryBaseBand4gData: () => Promise<boolean>;
}

export type { BaseBand4gState };
export { useBaseBand4g };
