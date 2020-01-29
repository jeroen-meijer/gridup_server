import admin from 'firebase-admin';
import changeCaseKeys from 'change-case-keys';

import { ValueChanged } from './utilityTypes';

export const toCamelCase = (obj: Record<string, unknown>) => changeCaseKeys(obj, 'camelize');
export const toSnakeCase = (obj: Record<string, unknown>) => changeCaseKeys(obj, 'underscored');
export const toDashCase = (obj: Record<string, unknown>) => changeCaseKeys(obj, 'dasherize');

export const snapshotCallback = <T>(callback: ValueChanged<T>) => (
  snapshot: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData>
) => {
  return callback(toCamelCase(snapshot.data()) as T);
};
