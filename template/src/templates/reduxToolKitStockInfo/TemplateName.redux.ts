import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReducerStatus } from '@/Interfaces';
import { RootState } from '@/ReduxSaga';

import {
  IPayloadGetTemplateNameRequest,
  IPayloadGetTemplateNameSuccess,
  ITemplateNameItem,
} from './TemplateName.type';

const initialState = {
  templateName: {} as { [key: string]: ITemplateNameItem[] },
  status: {} as { [key: string]: ReducerStatus },
};

export const TemplateNameSelectors = {
  selectTemplateName: (symbolCode: string) => (state: RootState) =>
    state.TemplateNameReducer.templateName[symbolCode],
  selectStatus: (symbolCode: string) => (state: RootState) =>
    state.TemplateNameReducer.status[symbolCode],
};

const templateNameSlice = createSlice({
  initialState,
  name: 'TemplateName',
  reducers: {
    getTemplateNameRequest(state, action: PayloadAction<IPayloadGetTemplateNameRequest>) {
      const { symbolCode } = action.payload;
      state.status[symbolCode] = 'PROCESSING';
      if (action.payload.refresh) {
        state.status[symbolCode] = 'REFRESHING';
      }
    },
    getTemplateNameSuccess(state, action: PayloadAction<IPayloadGetTemplateNameSuccess>) {
      const { data, symbolCode } = action.payload;
      state.status[symbolCode] = 'SUCCEEDED';
      state.templateName[symbolCode] = data;
    },
    getTemplateNameFailure(state, action: PayloadAction<{ symbolCode: string }>) {
      const { symbolCode } = action.payload;
      state.status[symbolCode] = 'FAILED';
    },
    clearData(state, action: PayloadAction<{ symbolCode: string }>) {
      const { symbolCode } = action.payload;
      state.templateName[symbolCode] = [];
      state.status[symbolCode] = 'IDLE';
    },
  },
});

export const TemplateNameActions = templateNameSlice.actions;
export const TemplateNameReducer = templateNameSlice.reducer;
