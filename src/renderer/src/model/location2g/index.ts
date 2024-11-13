import { Location } from '@renderer/schema/location';
import { useLocation2g } from './location2g';

interface Location2gState {
  /**
   * 定位数据
   */
  location2gData: Location[];
  /**
   * 更新定位数据
   */
  setLocation2gData: (payload: Location[]) => void;
  /**
   * 查询定位数据
   */
  queryLocation2gData: () => Promise<boolean>;
}

export type { Location2gState };
export { useLocation2g };
