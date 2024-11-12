import { RFData } from '@renderer/schema/rf-data';
import { useRfCapture } from './rf-capture';

interface RfCaptureState {
  /**
   * 黑名单缓存
   */
  blackListCache: string[];
  /**
   * 白名单缓存
   */
  whiteListCache: string[];
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
   * 加到黑名单
   * @param payload IMSI
   * @returns
   */
  addToBlackList: (payload: string) => void;
  /**
   * 加到白名单
   * @param payload IMSI
   * @returns
   */
  addToWhiteList: (payload: string) => void;
  /**
   * 清空黑名单
   */
  clearBlackList: () => void;
  /**
   * 清空白名单
   */
  clearWhiteList: () => void;
  /**
   * 查询侦码数据
   * @returns
   */
  queryRfCaptureData: () => Promise<boolean>;
}

export type { RfCaptureState };
export { useRfCapture };
