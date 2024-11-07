import log from 'electron-log/renderer';
import union from 'lodash/union';
import { create } from 'zustand';
import { BaseBandState } from './index';
import { request } from '@renderer/util/http';
import { BasebandInfo } from '@renderer/schema/baseband-info';

const useBaseBand = create<BaseBandState>((setState) => ({
  /**
   * 设备数据
   */
  baseBandData: [],
  /**
   * 更新设备数据
   * @param payload 设备数据
   */
  setBaseBandData(payload: BasebandInfo[]): void {
    setState({ baseBandData: payload });
  },
  /**
   * 查询设备数据
   * @returns
   */
  async queryBaseBandData(): Promise<boolean> {
    try {
      const { success, data } = await request<BasebandInfo[]>(
        '/api/v1/get4GBasebandInfo',
        null,
      );
      console.log(data);
      if (!success) {
        setState({ baseBandData: [] });
        return false;
      }
      setState({ baseBandData: data ?? [] });
      return true;
    } catch (error) {
      log.error(
        `查询设备数据失败 @model>base-band>queryBaseBandData():${error.message}`,
      );
      return false;
    }
  },
}));

export { useBaseBand };
