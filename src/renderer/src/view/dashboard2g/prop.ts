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

export interface Dashboard2gProp extends PropsWithChildren {}

export interface BandTableProp extends PropsWithChildren {}

export interface RfTableProp extends PropsWithChildren {}

export interface LocationTableProp extends PropsWithChildren {}
