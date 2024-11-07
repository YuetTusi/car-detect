/**
 * 默认设置参数
 */
export const defaultSetting = {
  cmDlarfcn: '38950',
  cmUlarfcn: '38950',
  cmPci: '501',
  cmCellId: '111111',
  cmTac: '11111',
  cuDlarfcn: '1650',
  cuUlarfcn: '19650',
  cuPci: '500',
  cuCellId: '222222',
  cuTac: '22222',
};

export const helper = {
  /**
   * 判断是否为空或未定义
   * @param value
   * @returns
   */
  isNullOrUndefined(value: any): boolean {
    return value === undefined || value === undefined;
  },
  /**
   * 生成[a,b]间随机值
   * @param a 下限
   * @param b 上限
   */
  rnd(a: number, b: number): number {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  },
  /**
   * 生成随机串
   * @param size 长度
   */
  nextId(size: number = 8): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < size; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },
};
