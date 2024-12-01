import { mapV2 } from '@/Utils';

import { IPayloadGetTemplateNameListResponse } from './TemplateName.type';

export const formatTemplateNameList = (data: IPayloadGetTemplateNameListResponse[]) => {
  return mapV2(data, item => {
    return {
      c0: item.c0,
      c1: item.c1,
    };
  });
};
