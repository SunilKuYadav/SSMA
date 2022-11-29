import React from 'react';
import {Dimensions, Platform} from 'react-native';

export const isIphoneWithNotch = (): boolean => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
};

export const formatSeconds = (secs: number) => {
  var sec_num = parseInt(secs.toString(), 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;

  return [hours, minutes, seconds].map(v => (v < 10 ? '0' + v : v)).join(':');
};

export function forceCast<T>(input: any): T {
  // ... do runtime checks here

  // @ts-ignore <-- forces TS compiler to compile this as-is
  return input;
}

export const memoize = <T = any>(fn: any) => {
  const cache = new Map();
  const cached = function (this: any, val: T) {
    return cache.has(val)
      ? cache.get(val)
      : cache.set(val, fn.call(this, val)) && cache.get(val);
  };
  cached.cache = cache;
  return cached;
};
