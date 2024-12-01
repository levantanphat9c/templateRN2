/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from 'i18next';
import lodash, { capitalize, isArray } from 'lodash';
import React from 'react';
import { NativeScrollEvent } from 'react-native';

export function formatNumber(value?: number, digit = 0, toFixed = false, offsetRate?: number) {
  if (value == null || Number.isNaN(value)) {
    return '--';
  }

  if (offsetRate != null) {
    value /= offsetRate;
  }

  const result = Intl.NumberFormat('en-US', {
    minimumFractionDigits: toFixed ? digit : 0,
    maximumFractionDigits: digit,
  }).format(value);

  // Eliminate result like -0.00
  if (Number(result) === 0 && result.startsWith('-'))
    return toFixed ? Number(0).toFixed(digit) : '0';

  return result;
}

export interface IFormatNumberV2 {
  value: number | null;
  digit?: number;
  toFixed?: boolean;
  offsetRate?: number;
  round?: boolean | 'ceil' | 'floor';
}

export function formatNumberV2({
  value,
  digit = 0,
  toFixed = false,
  offsetRate,
  round,
}: IFormatNumberV2) {
  if (value == null || Number.isNaN(value)) {
    return '--';
  }

  if (value === 0) return '0';

  if (offsetRate != null) {
    value /= offsetRate;
  }

  if (round) {
    if (typeof round === 'boolean') {
      value = Math.round(value);
    } else {
      value = Math[round](value);
    }
  }

  const result = Intl.NumberFormat('en-US', {
    minimumFractionDigits: toFixed ? digit : 0,
    maximumFractionDigits: digit,
  }).format(value);

  // Eliminate result like -0.00
  if (Number(result) === 0 && result.startsWith('-')) {
    return toFixed ? Number(0).toFixed(digit) : '0';
  }

  return result;
}

export interface IRoundedBigPrice extends IFormatNumberV2 {
  startThreshold?: 'K' | 'M' | 'B';
}
export const thresholds = [
  { threshold: 1e12, suffix: 'T' },
  { threshold: 1e9, suffix: 'B' },
  { threshold: 1e6, suffix: 'M' },
  { threshold: 1e3, suffix: 'K' },
];
export function roundedBigPrice(params: IRoundedBigPrice) {
  const { startThreshold = 'K', value, digit, toFixed, offsetRate, round } = params;

  if (value == null || Number.isNaN(value)) return '--';
  if (value === 0) return '0';

  const absValue = Math.abs(value);

  const startThresholdIndex = thresholds.findIndex(({ suffix }) => suffix === startThreshold);
  const thresholdsList = thresholds.slice(0, startThresholdIndex + 1);

  const matchingThreshold = thresholdsList.find(t => absValue >= t.threshold);
  const { threshold, suffix } = matchingThreshold || { threshold: 1, suffix: '' };

  const translatedSuffix = (() => {
    switch (suffix) {
      case 'K':
        return i18n.t('COMMON.THOUSAND');
      case 'M':
        return i18n.t('COMMON.MIL');
      case 'B':
        return i18n.t('COMMON.BIL');
      case 'T':
        return i18n.t('COMMON.TRIL');
      default:
        return suffix;
    }
  })();

  const formattedValue = formatNumberV2({
    value: value / threshold,
    digit,
    toFixed,
    offsetRate,
    round,
  });

  return formattedValue + translatedSuffix;
}

export function addCommaSeparator(value?: number, defaultDecimalDigit = 0) {
  if (value == null || Number.isNaN(value)) {
    return 'N/A';
  }
  // Add comma separator, keep decimal places intact
  const result = Intl.NumberFormat('en-US').format(value);
  // Eliminate result like -0.00, -0.000, ...
  if (Number(result) === 0 && result.startsWith('-')) return Number(0).toFixed(defaultDecimalDigit);
  return result;
}

export function formatCurrency(value?: number, notPrefix?: boolean) {
  if (value == null || isNaN(value) || value === 0) {
    return '0';
  }
  const billion = 1000000000;
  const million = 1000000;

  if (value / billion > 1) {
    return `${formatNumber(value, 2, true, billion)} ${notPrefix ? '' : i18n.t('COMMON.BIL')}`;
  }

  if (value / million > 1) {
    return `${formatNumber(value, 2, true, million)} ${notPrefix ? '' : i18n.t('COMMON.MIL')}`;
  }

  return `${formatNumber(value)}`;
}

export function formatTickNumber({
  value,
  fixedNumber = 0,
  delimiter = '',
  unit = undefined,
  disableUnitK = false,
  fixedNumberDisableK = 0,
  toFixedDisableK = false,
}: {
  value: number;
  fixedNumber?: number;
  delimiter?: string;
  unit?: string;
  disableUnitK?: boolean;
  fixedNumberDisableK?: number;
  toFixedDisableK?: boolean;
}) {
  if (value === 0 || value === undefined) return '0';
  if (Number.isNaN(Number(value))) return '0';
  if (Math.abs(value) < 10) return value.toFixed(fixedNumber) + (unit ?? '');
  if (Math.abs(value) < 1000) return value.toFixed(fixedNumber) + (unit ?? '');
  if (Math.abs(value) < 1000000)
    return disableUnitK
      ? formatNumber(value, fixedNumberDisableK, toFixedDisableK) + (unit ?? '')
      : (value / 1000).toFixed(fixedNumber) + delimiter + (unit ?? i18n.t('COMMON.THOUSAND'));
  if (Math.abs(value) < 1000000000)
    return (value / 1000000).toFixed(fixedNumber) + delimiter + (unit ?? i18n.t('COMMON.MIL'));
  return (
    formatNumber(value / 1000000000, fixedNumber, true) + delimiter + (unit ?? i18n.t('COMMON.BIL'))
  );
}

export function formatLocaleStringToNumber(value: string) {
  return Number(value.replace(/[.,]/g, ''));
}

export function formatNumberToStringWithCommas(value: number | string = 0) {
  if (value == null) return '--';

  if (Number.isInteger(value)) {
    return value.toLocaleString('en');
  }
  const formatNumberWithoutComma = formatLocaleStringToNumber(value as string);
  if (Number.isInteger(formatNumberWithoutComma)) {
    return formatNumberWithoutComma.toLocaleString('en');
  }
  return '';
}

export function sameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export const isCloseToBottom = (
  { layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent,
  paddingToBottom = 10,
) => {
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

export const mapV2 = <T, S>(
  input: T[] | undefined | null,
  callback: (value: T, index: number, array: T[]) => S,
): S[] => {
  if (isArray(input)) return input.map(callback);

  return [];
};

export const filterV2 = <T extends object | number | string>(
  input: T[] | undefined | null,
  callback: (value: T, index: number, array: T[]) => boolean,
): T[] => {
  if (!isArray(input)) return [];

  return input.filter(callback);
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const insertObjectIf = <T1 extends {}>(condition: any, elements1: T1): Partial<T1> => {
  return condition ? elements1 : ({} as T1);
};

export const insertObjectIfElse = <T1, T2>(
  condition: boolean,
  elements1: T1,
  elements2: T2,
): Partial<T1 | T2> => {
  return condition ? elements1 : elements2;
};

export const oneOf =
  <T extends (...args: A) => any, U, A extends any[]>(truthy: T | undefined | null, falsy: U) =>
  (...args: Parameters<T>): ReturnType<T> | U => {
    return truthy ? truthy(...args) : falsy;
  };

export const precisionNumber = (value: number, toFixed: number = 5) => {
  return Number(value?.toFixed(toFixed));
};

export const precisionSum = (value1: number, value2: number, toFixed: number = 5) => {
  return precisionNumber(value1 + value2, toFixed);
};

export const precisionMinus = (value1: number, value2: number, toFixed: number = 5) => {
  return precisionNumber(value1 - value2, toFixed);
};

export const precisionMultiple = (value1: number, value2: number, toFixed: number = 5) => {
  return precisionNumber(value1 * value2, toFixed);
};

export const precisionDivident = (value1: number, value2: number, toFixed: number = 8) => {
  return precisionNumber(value1 / value2, toFixed);
};

export const precisionCompare2Number = (value1: number, value2: number) => {
  return Math.abs(value1 - value2) < 0.00000001;
};

export const formatBigNumberToAbbreviation = (value: number) => {
  if (lodash.inRange(Math.abs(value), 1000, 1000000)) {
    return `${parseFloat((value / 1000).toFixed(1))}K`;
  }
  if (lodash.inRange(Math.abs(value), 1000000, 1000000000)) {
    return `${parseFloat((value / 1000000).toFixed(1))}M`;
  }
  if (Math.abs(value) >= 1000000000) {
    return `${parseFloat((value / 1000000000).toFixed(1))}B`;
  }
  return `${value}`;
};

export const findFirstDiffPos = (a: string, b: string) => {
  // make sure a !== b before call
  let i = 0;
  while (a[i] === b[i]) i++;
  return i;
};

export const replaceCharacter = (value: string, index: number, replacement: string) => {
  return value.slice(0, index) + replacement + value.slice(index + replacement.length);
};

export function formatNumberWithNull(
  value?: number,
  digit = 0,
  offsetRate?: number,
  toFixed = false,
) {
  if (value == null || Number.isNaN(value)) {
    return '--';
  }

  if (offsetRate != null) {
    value /= offsetRate;
  }

  const result = Intl.NumberFormat('en-US', {
    minimumFractionDigits: toFixed ? digit : 0,
    maximumFractionDigits: digit,
  }).format(value);

  // Eliminate result like -0.00
  if (Number(result) === 0 && result.startsWith('-')) return '0';

  return result;
}

export const checkChildIsElement = (children: React.ReactNode) => {
  if (children == null) return false;

  if (isArray(children)) {
    let isElement = false;
    React.Children.forEach(children, child => {
      if (isElement) return;
      isElement = React.isValidElement(child);
    });
    return isElement;
  }

  return React.isValidElement(children);
};

const sRange = [50, 75];
const lRange = [25, 60];

const getHashOfString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // tslint:disable-next-line: no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);
  return hash;
};

const normalizeHash = (hash: number, min: number, max: number) => {
  return Math.floor((hash % (max - min)) + min);
};

const generateHSL = (name: string, saturationRange: number[], lightnessRange: number[]) => {
  const hash = getHashOfString(name);
  const h = normalizeHash(hash, 0, 360);
  const s = normalizeHash(hash, saturationRange[0], saturationRange[1]);
  const l = normalizeHash(hash, lightnessRange[0], lightnessRange[1]);
  return [h, s, l];
};

const HSLtoString = (hsl: number[]) => {
  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};

export const generateColorHsl = (name: string): string => {
  return HSLtoString(generateHSL(name, sRange, lRange));
};

export const removeElementAtIndex = (arr: any[], index: number) => {
  const newArr = [...arr];
  newArr.splice(index, 1);
  return newArr;
};

export const getLabelFromSnake = (str: string) => {
  return capitalize(str.replace(/_/g, ' '));
};
export function toLowerCaseNonAccentVietnamese(str: string) {
  str = str.toLowerCase();
  //     We can also use this instead of from line 11 to line 17
  //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
  //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
  //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
  //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
  //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
  //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
  //     str = str.replace(/\u0111/g, "d");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str.replace(/\s+$/g, '');
}

export function isStringContainString(str: string, search: string): boolean {
  return toLowerCaseNonAccentVietnamese(str).includes(toLowerCaseNonAccentVietnamese(search));
}
export function getRandomNumber(from: number, to: number, floor = true) {
  const result = Math.random() * (to - from + 1) + from;
  return floor ? Math.floor(result) : result;
}

export function parseJsonString(jsonString: string) {
  const isArray = jsonString.startsWith('[') || jsonString.endsWith(']');
  const isObject = jsonString.startsWith('{') || jsonString.endsWith('}');

  try {
    if (jsonString === '') return jsonString;
    return JSON.parse(jsonString);
  } catch (e) {
    if (isArray) return [];
    if (isObject) return {};
    return jsonString;
  }
}

export function commaStringToNumber(value: string) {
  return +value.replace(/,/g, '').replace(/\./g, '');
}
export function secretString(value: string, start = 4, end = 4) {
  if (value.length < start || value.length < end) {
    return value;
  }
  return value.slice(0, end) + '*'.repeat(value.length - start - end);
}

export const jsonParse = (data: string) => {
  try {
    const result = JSON.parse(data);
    return result;
  } catch {
    return 'parse error';
  }
};

export function stringToSlug(str: string, slug = '-', option: 0 | 1 = 0) {
  // remove accents
  let from = '';
  let to = '';
  // remove all marks (Latin alphabet)
  if (option === 0) {
    from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ';
    to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
  }

  //remove tone mark (Vietnamese alphabet)
  if (option === 1) {
    from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ';
    to = 'aaaaaăăăăăăââââââeeeeeêêêêêêđuuuuuưưưưưưoooooôôôôôôơơơơơơiiiiiaeiiouuncyyyyy';
  }

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], 'gi'), to[i]);
  }

  str = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, slug)
    .replace(/-+/g, slug);

  return str;
}
