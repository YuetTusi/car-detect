import { create } from 'zustand';
import { GetState, SetState } from '..';
import { ReadingState } from '.';

const useReading = create<ReadingState>((setState: SetState, _: GetState) => ({
  /**
   * 读取中状态
   */
  reading: false,
  /**
   * 设置读取中状态
   * @param payload 读取中
   */
  setReading(payload: boolean): void {
    setState({ reading: payload });
  },
}));

export { useReading };
