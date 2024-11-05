import { NameValue } from './name-value';

/**
 * 设备信息
 */
export interface BasebandInfo {
  Band: NameValue;
  CELL: NameValue;
  CNM: NameValue;
  FirmwareVersion: NameValue;
  Frequency: NameValue;
  GPS: NameValue;
  Latitude: NameValue;
  Longitude: NameValue;
  MAC: NameValue;
  PLMN: NameValue;
  Power: NameValue;
  RF: NameValue;
  RIP: NameValue;
  Role: NameValue;
  SN: NameValue;
  SYNC: NameValue;
  Temperature: NameValue;
  Time: NameValue;
  UECount: NameValue;
  [othersProperty: string]: any;
}
