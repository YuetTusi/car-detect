import { ReadingState } from './index';
import { GetState, SetState } from '..';

const reading = (setState: SetState, _: GetState): ReadingState => ({
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
});

export { reading };
