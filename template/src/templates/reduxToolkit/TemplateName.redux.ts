import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReducerStatus } from '@/Interfaces';
import { RootState } from '@/ReduxSaga';

import {
  IPayloadGetTemplateNameListRequest,
  IPayloadGetTemplateNameListSuccess,
  ITemplateNameItem,
} from './TemplateName.type';

const initialState = {
  templateNameList: [] as ITemplateNameItem[],
  status: 'IDLE' as ReducerStatus,
};

export const TemplateNameSelectors = {
  selectTemplateNameList: (state: RootState) => state.TemplateNameReducer.templateNameList || [],
};

const templateNameSlice = createSlice({
  initialState,
  name: 'TemplateName',
  reducers: {
    getTemplateNameListRequest(state, _action: PayloadAction<IPayloadGetTemplateNameListRequest>) {
      state.status = 'PROCESSING';
    },
    getTemplateNameListSuccess(state, action: PayloadAction<IPayloadGetTemplateNameListSuccess>) {
      const { data } = action.payload;
      state.status = 'SUCCEEDED';
      state.templateNameList = data;
    },
    getTemplateNameListFailure(state) {
      state.status = 'FAILED';
    },
  },
});

export const TemplateNameActions = templateNameSlice.actions;
export const TemplateNameReducer = templateNameSlice.reducer;
