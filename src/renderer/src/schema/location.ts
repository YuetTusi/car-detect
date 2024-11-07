import { NameValue } from './name-value';

export interface Location {
  FCN: NameValue;
  IMSI: NameValue;
  RNTI: NameValue;
  RSRP: NameValue;
  RSSI: NameValue;
  TIME: NameValue;
  [othersProperty: string]: any;
}
