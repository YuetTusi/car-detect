import { Location } from '@renderer/schema/location';
import { useLocation4g } from './location4g';

interface Location4gState {
  /**
   * 定位数据
   */
  location4gData: Location[];
  /**
   * 更新定位数据
   */
  setLocation4gData: (payload: Location[]) => void;
  /**
   * 查询定位数据
   */
  queryLocation4gData: () => Promise<boolean>;
}

export type { Location4gState };
export { useLocation4g };
