import { existsSync } from 'fs';
import {
  brandStorageStatePath,
  creatorStorageStatePath,
} from '../../../../playwright/auth-storage';

type AuthRole = 'brand' | 'creator';

const authStorageStateByRole = {
  brand: brandStorageStatePath,
  creator: creatorStorageStatePath,
} as const satisfies Record<AuthRole, string>;

export function getAuthStorageStatePath(role: AuthRole) {
  return authStorageStateByRole[role];
}

export function hasAuthStorageState(role: AuthRole) {
  return existsSync(getAuthStorageStatePath(role));
}

export function resolveAuthStorageState(role: AuthRole) {
  const storageStatePath = getAuthStorageStatePath(role);

  return existsSync(storageStatePath) ? storageStatePath : undefined;
}
