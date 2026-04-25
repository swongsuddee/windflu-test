type LoginCredentials = {
  email: string;
  password: string;
};

function credentialsFromEnv(
  prefix: 'WINDFLU_BRAND' | 'WINDFLU_CREATOR'
): LoginCredentials | undefined {
  const email = process.env[`${prefix}_EMAIL`]?.trim();
  const password = process.env[`${prefix}_PASSWORD`]?.trim();

  if (!email || !password) {
    return undefined;
  }

  return { email, password };
}

export const brandLoginTestData = {
  emptyCredentials: {
    email: '',
    password: '',
  },
  validShapeCredentials: {
    email: 'qa@example.com',
    password: 'Password123!',
  },
  invalidEmail: 'invalid-email',
  validRecoveryEmail: 'qa@example.com',
} as const;

export const creatorLoginTestData = {
  emptyCredentials: {
    email: '',
    password: '',
  },
  validShapeCredentials: {
    email: 'qa@example.com',
    password: 'Password123!',
  },
  invalidEmail: 'invalid-email',
  validRecoveryEmail: 'qa@example.com',
} as const;

export function getBrandLoginCredentials() {
  return credentialsFromEnv('WINDFLU_BRAND');
}

export function getCreatorLoginCredentials() {
  return credentialsFromEnv('WINDFLU_CREATOR');
}
