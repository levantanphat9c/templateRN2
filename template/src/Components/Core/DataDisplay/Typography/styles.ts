import { IS_ANDROID } from '@/Constants';
import { getStylesHook } from '@/Hooks';

import { TYPOGRAPHY_VARIANT } from './type';

export const textStyle = getStylesHook({
  container: {
    textAlignVertical: 'center',
  },
  secureTextEntryIconContainer: {
    flexDirection: 'row',
  },
  [TYPOGRAPHY_VARIANT.BOLD_10]: {
    fontSize: 10,
    fontWeight: IS_ANDROID ? undefined : IS_ANDROID ? undefined : '700',
    lineHeight: 12,
    fontFamily: IS_ANDROID ? 'Lato-Bold' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.BOLD_11]: {
    fontSize: 11,
    fontWeight: IS_ANDROID ? undefined : IS_ANDROID ? undefined : '700',
    lineHeight: 16,
    fontFamily: IS_ANDROID ? 'Lato-Bold' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.BOLD_12]: {
    fontSize: 12,
    fontWeight: IS_ANDROID ? undefined : IS_ANDROID ? undefined : '700',
    lineHeight: 18,
    fontFamily: IS_ANDROID ? 'Lato-Bold' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.BOLD_13]: {
    fontSize: 13,
    fontWeight: IS_ANDROID ? undefined : IS_ANDROID ? undefined : '700',
    lineHeight: 20,
    fontFamily: IS_ANDROID ? 'Lato-Bold' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.BOLD_14]: {
    fontSize: 14,
    fontWeight: IS_ANDROID ? undefined : IS_ANDROID ? undefined : '700',
    lineHeight: 20,
    fontFamily: IS_ANDROID ? 'Lato-Bold' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.BOLD_15]: {
    fontSize: 15,
    fontWeight: IS_ANDROID ? undefined : IS_ANDROID ? undefined : '700',
    lineHeight: 20,
    fontFamily: IS_ANDROID ? 'Lato-Bold' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.BOLD_16]: {
    fontSize: 16,
    fontWeight: IS_ANDROID ? undefined : '700',
    lineHeight: 26,
    fontFamily: IS_ANDROID ? 'Lato-Bold' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.BOLD_18]: {
    fontSize: 18,
    fontWeight: IS_ANDROID ? undefined : '700',
    lineHeight: 26,
    fontFamily: IS_ANDROID ? 'Lato-Bold' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.BOLD_20]: {
    fontSize: 20,
    fontWeight: IS_ANDROID ? undefined : '700',
    lineHeight: 28,
    fontFamily: IS_ANDROID ? 'Lato-Bold' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.BOLD_22]: {
    fontSize: 22,
    fontWeight: IS_ANDROID ? undefined : '700',
    lineHeight: 30,
    fontFamily: IS_ANDROID ? 'Lato-Bold' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.BOLD_24]: {
    fontSize: 24,
    fontWeight: IS_ANDROID ? undefined : '700',
    lineHeight: 30,
    fontFamily: IS_ANDROID ? 'Lato-Bold' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.BOLD_28]: {
    fontSize: 28,
    fontWeight: IS_ANDROID ? undefined : '700',
    lineHeight: 36,
    fontFamily: IS_ANDROID ? 'Lato-Bold' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.BOLD_44]: {
    fontSize: 44,
    fontWeight: IS_ANDROID ? undefined : '700',
    lineHeight: 48,
    fontFamily: IS_ANDROID ? 'Lato-Bold' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.BOLD_40]: {
    fontSize: 40,
    fontWeight: IS_ANDROID ? undefined : '700',
    lineHeight: 48,
    fontFamily: IS_ANDROID ? 'Lato-Bold' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.MEDIUM_11]: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 16,
    fontFamily: IS_ANDROID ? 'Lato-Medium' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.MEDIUM_12]: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    fontFamily: IS_ANDROID ? 'Lato-Medium' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.MEDIUM_13]: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: IS_ANDROID ? 'Lato-Medium' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.MEDIUM_14]: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: IS_ANDROID ? 'Lato-Medium' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.MEDIUM_15]: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: IS_ANDROID ? 'Lato-Medium' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.MEDIUM_16]: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 26,
    fontFamily: IS_ANDROID ? 'Lato-Medium' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.MEDIUM_18]: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    fontFamily: IS_ANDROID ? 'Lato-Medium' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.MEDIUM_20]: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
    fontFamily: IS_ANDROID ? 'Lato-Medium' : 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.REGULAR_11]: {
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 16,
    fontFamily: 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.REGULAR_12]: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    fontFamily: 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.REGULAR_13]: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.REGULAR_14]: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.REGULAR_15]: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.REGULAR_16]: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 26,
    fontFamily: 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.REGULAR_18]: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 26,
    fontFamily: 'Lato-Regular',
  },
  [TYPOGRAPHY_VARIANT.REGULAR_20]: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 28,
    fontFamily: 'Lato-Regular',
  },
});

export default textStyle;
