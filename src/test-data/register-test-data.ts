export type BrandRegisterAccountData = {
  contactName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

export const brandRegisterPasswordReference =
  '`src/test-data/register-test-data.ts` default valid password';

function createRegisterTimestamp() {
  return new Date()
    .toISOString()
    .replace(/[-:.TZ]/g, '')
    .slice(0, 14);
}

export function createBrandRegisterAccountData(): BrandRegisterAccountData {
  const timestamp = createRegisterTimestamp();

  return {
    contactName: `jojoetest${timestamp}`,
    email: `jojoetest${timestamp}@example.com`,
    password: 'Password123!',
    confirmPassword: 'Different123!',
    phone: '0812345678',
  };
}

export function createValidBrandRegisterAccountData(): BrandRegisterAccountData {
  const timestamp = createRegisterTimestamp();

  return {
    contactName: `jojoetest${timestamp}`,
    email: `jojoetest${timestamp}@example.com`,
    password: 'Password123!',
    confirmPassword: 'Password123!',
    phone: '0812345678',
  };
}

export type BrandProfileData = {
  companyName: string;
  industry: string;
};

export function createValidBrandProfileData(): BrandProfileData {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:.TZ]/g, '')
    .slice(0, 14);

  return {
    companyName: `Jojoetest Company ${timestamp}`,
    industry: 'Food',
  };
}
