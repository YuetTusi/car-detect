import { FormInstance } from 'antd';
import { PropsWithChildren } from 'react';

export interface LayoutProp extends PropsWithChildren {}

export interface SetFormProp extends PropsWithChildren {
  formRef: FormInstance<SetFormValue>;
}

/**
 * 表单
 */
export interface SetFormValue {
  PLMN: string;
  BAND: string;
  ULARFCN: string;
  DLARFCN: string;
  PCI: string;
  TAC: string;
  CI: string;
}
