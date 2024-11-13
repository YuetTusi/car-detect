import log from 'electron-log/renderer';
import { create } from 'zustand';
import { BaseBand4gState } from './index';
import { request } from '@renderer/util/http';
import { BasebandInfo } from '@renderer/schema/baseband-info';

const useBaseBand4g = create<BaseBand4gState>((setState) => ({
  /**
   * 设备数据
   */
  baseBand4gData: [],
  /**
   * 更新设备数据
   * @param payload 设备数据
   */
  setBaseBand4gData(payload: BasebandInfo[]): void {
    setState({ baseBand4gData: payload });
  },
  /**
   * 查询设备数据
   * @returns
   */
  async queryBaseBand4gData(): Promise<boolean> {
    try {
      const { success, data } = await request<BasebandInfo[]>(
        '/api/v1/get4GBasebandInfo',
        null,
      );

      if (!success) {
        setState({ baseBand4gData: [] });
        return false;
      }
      setState({ baseBand4gData: data ?? [] });
      return true;
    } catch (error) {
      log.error(
        `查询设备数据失败 @model>base-band4g>queryBaseBand4gData():${error.message}`,
      );
      return false;
    }
  },
}));

export { useBaseBand4g };
