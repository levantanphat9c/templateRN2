import { mapV2 } from '@/Utils';

import { IPayloadGetTemplateNameResponse } from './TemplateName.type';

export const formatTemplateNameList = (data: IPayloadGetTemplateNameResponse[]) => {
  return mapV2(data, item => {
    return {
      groupId: item.c0,
      groupName: item.c1,
    };
  });
};
