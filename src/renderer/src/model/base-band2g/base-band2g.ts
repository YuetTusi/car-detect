import log from 'electron-log/renderer';
import { create } from 'zustand';
import { BaseBand2gState } from './index';
import { request } from '@renderer/util/http';
import { BasebandInfo } from '@renderer/schema/baseband-info';

const useBaseBand2g = create<BaseBand2gState>((setState) => ({
  /**
   * 设备数据
   */
  baseBand2gData: [],
  /**
   * 更新设备数据
   * @param payload 设备数据
   */
  setBaseBand2gData(payload: BasebandInfo[]): void {
    setState({ baseBand2gData: payload });
  },
  /**
   * 查询设备数据
   * @returns
   */
  async queryBaseBand2gData(): Promise<boolean> {
    try {
      const { success, data } = await request<BasebandInfo[]>(
        '/api/v1/get2GBasebandInfo',
        null,
      );

      if (!success) {
        setState({ baseBand2gData: [] });
        return false;
      }
      setState({ baseBand2gData: data ?? [] });
      return true;
    } catch (error) {
      log.error(
        `查询设备数据失败 @model>base-band2g>queryBaseBand2gData():${error.message}`,
      );
      return false;
    }
  },
}));

export { useBaseBand2g };
