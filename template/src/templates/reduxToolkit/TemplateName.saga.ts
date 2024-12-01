import { put, takeLatest } from 'redux-saga/effects';

import { formatTemplateNameList } from './TemplateName.helper';
import { TemplateNameActions } from './TemplateName.redux';

function* doTemplateName() {
  try {
    // To do something
    yield put(
      TemplateNameActions.getTemplateNameListSuccess({
        data: formatTemplateNameList([]),
      }),
    );
  } catch (error) {
    // To do error
    yield put(TemplateNameActions.getTemplateNameListFailure());
  }
}

export function* TemplateNameSagas() {
  yield takeLatest(TemplateNameActions.getTemplateNameListRequest.type, doTemplateName);
}
