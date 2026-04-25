import { existsSync } from 'fs';
import { creatorStorageStatePath } from '../../../../playwright/auth-storage';

type AuthRole = 'creator';

const authStorageStateByRole = {
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
