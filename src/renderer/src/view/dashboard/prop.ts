import { PropsWithChildren } from 'react';

export enum ActionType {
  /**
   * 白名单
   */
  WhiteList,
  /**
   * 黑名单
   */
  BlackList,
}

export interface DashboardProp extends PropsWithChildren {}

export interface BandTableProp extends PropsWithChildren {}

export interface RfTableProp extends PropsWithChildren {}
