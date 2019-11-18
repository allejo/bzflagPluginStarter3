import { Map } from 'immutable';

export interface IImmutable<T, K = string, V = any> extends Map<K, V> {
  toJS(): T;
  get<I extends keyof T>(key: I & K): T[I] & V;
}
