import { ArrayElement } from '@/Constants';

import { formatTemplateNameList } from './TemplateName.helper';

export type ITemplateNameItem = ArrayElement<ReturnType<typeof formatTemplateNameList>>;

export interface IPayloadGetTemplateNameRequest {
  symbolCode: string;
  refresh?: boolean;
  refreshEventName?: string;
}

export interface IPayloadGetTemplateNameSuccess {
  data: ITemplateNameItem[];
  symbolCode: string;
}

export interface IPayloadGetTemplateNameResponse {
  /**
   * Group ID
   */
  c0: string;
  /**
   * Group name
   */
  c1: string;
}
