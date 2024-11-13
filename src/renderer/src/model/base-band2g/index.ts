import { BasebandInfo } from '@renderer/schema/baseband-info';
import { useBaseBand2g } from './base-band2g';

interface BaseBand2gState {
  /**
   * 设备数据
   */
  baseBand2gData: BasebandInfo[];
  /**
   * 更新设备数据
   * @param payload 设备数据
   */
  setBaseBand2gData: (payload: BasebandInfo[]) => void;
  /**
   * 查询设备数据
   * @returns
   */
  queryBaseBand2gData: () => Promise<boolean>;
}

export type { BaseBand2gState };
export { useBaseBand2g };
