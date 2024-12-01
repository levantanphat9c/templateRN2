import {
  check,
  checkNotifications,
  PERMISSIONS,
  request,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';

import { IS_IOS } from '@/Constants';

export const requestPermissionCamera = async () => {
  if (IS_IOS) {
    return request(PERMISSIONS.IOS.CAMERA);
  }

  return request(PERMISSIONS.ANDROID.CAMERA);
};

export const checkPermissionCamera = async () => {
  if (IS_IOS) {
    const status = await check(PERMISSIONS.IOS.CAMERA);

    return status;
  }
  const status = await check(PERMISSIONS.ANDROID.CAMERA);

  return status;
};

export const requestNotificationPermission = async () => {
  try {
    const { status } = await requestNotifications(['alert', 'sound', 'badge']);

    return status;
  } catch (error) {
    // handle error
    return null;
  }
};

export const checkNotificationPermission = async () => {
  try {
    const { status } = await checkNotifications();
    return status;
  } catch (error) {
    // handle error
    return null;
  }
};

export const requestPhotoPermission = async () => {
  if (IS_IOS) {
    return request(PERMISSIONS.IOS.PHOTO_LIBRARY);
  }

  return request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
};

export const PERMISSION_STATUS = RESULTS;
