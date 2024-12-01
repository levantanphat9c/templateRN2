import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

import { formatTemplateNameList } from './TemplateName.helper';
import { TemplateNameActions } from './TemplateName.redux';
import { IPayloadGetTemplateNameRequest } from './TemplateName.type';

function* doTemplateName(action: PayloadAction<IPayloadGetTemplateNameRequest>) {
  try {
    // To do something

    yield put(
      TemplateNameActions.getTemplateNameSuccess({
        data: formatTemplateNameList([]),
        symbolCode: action.payload.symbolCode,
      }),
    );
  } catch (error) {
    // To do error
    yield put(
      TemplateNameActions.getTemplateNameFailure({ symbolCode: action.payload.symbolCode }),
    );
  }
}

export function* TemplateNameSagas() {
  yield takeLatest(TemplateNameActions.getTemplateNameRequest.type, doTemplateName);
}
