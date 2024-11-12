import { FormInstance } from 'antd';
import { PropsWithChildren } from 'react';

export interface LayoutProp extends PropsWithChildren {}

export interface Set4gFormProp extends PropsWithChildren {
  formRef: FormInstance<Set4gFormValue>;
}

export interface Set2gFormProp extends PropsWithChildren {
  formRef: FormInstance<Set2gFormValue>;
}

export interface Set4gFormValue {
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

export interface Set2gFormValue {
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
