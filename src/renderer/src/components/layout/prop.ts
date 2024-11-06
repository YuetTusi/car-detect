import { FormInstance } from 'antd';
import { PropsWithChildren } from 'react';

export interface LayoutProp extends PropsWithChildren {}

export interface Cm4gFormProp extends PropsWithChildren {
  formRef: FormInstance<Cm4gFormValue>;
}

export interface Cu4gFormProp extends PropsWithChildren {
  formRef: FormInstance<Cu4gFormValue>;
}

/**
 * 移动表单
 */
export interface Cm4gFormValue {
  /**
   * 下行频点
   */
  cmDlarfcn: number;
  /**
   * 上行频点
   */
  cmUlarfcn: number;
  /**
   * PCI
   */
  cmPci: number;
  /**
   * CellID
   */
  cmCellId: number;
  /**
   * TAC
   */
  cmTac: number;
}

/**
 * 联通表单
 */
export interface Cu4gFormValue {
  /**
   * 下行频点
   */
  cuDlarfcn: number;
  /**
   * 上行频点
   */
  cuUlarfcn: number;
  /**
   * PCI
   */
  cuPci: number;
  /**
   * CellID
   */
  cuCellId: number;
  /**
   * TAC
   */
  cuTac: number;
}
