import log from 'electron-log/renderer';
import { create } from 'zustand';
import { RfState } from './index';
import { request } from '@renderer/util/http';

const useRf = create<RfState>((setState) => ({
  /**
   * 侦码结果
   */
  rfData: [],
  /**
   * 更新侦码结果
   * @param payload 侦码数据
   */
  setRfData(payload: any[]): void {
    setState({ rfData: payload });
  },
  /**
   * 查询侦码数据
   * @returns
   */
  async queryRfData(): Promise<void> {
    const url = 'http://localhost:3000/data';
    try {
      const res = await request(url, null);
      console.log(res);
      setState({ rfData: res as any });
    } catch (error) {
      console.log(error);
      log.error(`查询侦码数据失败 @model>rf>queryRfData():${error.message}`);
    }
  },
}));

export { useRf };
