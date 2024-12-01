import { ArrayElement } from '@/Constants';

import { formatTemplateNameList } from './TemplateName.helper';

export type ITemplateNameItem = ArrayElement<ReturnType<typeof formatTemplateNameList>>;

export interface IPayloadGetTemplateNameListRequest {
  offset?: number;
  isRefresh?: boolean;
  q?: string;
  callback?: {
    handleFail?: (error?: any) => void;
    handleSuccess?: () => void;
  };
}

export interface IPayloadGetTemplateNameListSuccess {
  data: ITemplateNameItem[];
}

export interface IPayloadGetTemplateNameListResponse {
  c0: string;
  c1: string;
}
