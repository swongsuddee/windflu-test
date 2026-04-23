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
