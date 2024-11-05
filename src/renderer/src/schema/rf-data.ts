import { NameValue } from './name-value';

/**
 * 侦码信息
 */
export interface RFData {
  IMSI: NameValue;
  TMSI: NameValue;
  IMEI: NameValue;
  /**
   * 场强
   */
  RSSI: NameValue;
  /**
   * 采集时间
   */
  TIME: NameValue;
  BAND: NameValue;
  /**
   * MAC地址
   */
  MAC: NameValue;
  SN: NameValue;
  /**
   * 经度
   */
  LONGITUDE: NameValue;
  /**
   * 纬度
   */
  LATITUDE: NameValue;
  /**
   * 上行频点（以此为依据与设置的上行频点判断 是联通还是移动）
   */
  ULFCN: NameValue;
  [othersProperty: string]: any;
}
