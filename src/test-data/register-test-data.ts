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

export type CreatorRegisterAccountData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const creatorRegisterPasswordReference =
  '`src/test-data/register-test-data.ts` default valid password';

export function createValidCreatorRegisterAccountData(): CreatorRegisterAccountData {
  const timestamp = createRegisterTimestamp();

  return {
    email: `jojoetest${timestamp}@example.com`,
    password: 'Password123!',
    confirmPassword: 'Password123!',
  };
}

export type CreatorSocialProfileData = {
  tiktokUsername?: string;
  instagramUsername?: string;
};

export function createCreatorSocialProfileData(): CreatorSocialProfileData {
  const timestamp = createRegisterTimestamp().slice(-8);

  return {
    tiktokUsername: `jojoetiktok${timestamp}`,
  };
}

export type CreatorPersonalProfileData = {
  firstName: string;
  lastName: string;
  displayName: string;
  phone: string;
};

export function createCreatorPersonalProfileData(): CreatorPersonalProfileData {
  const timestamp = createRegisterTimestamp().slice(-6);

  return {
    firstName: 'Jojoe',
    lastName: 'Test',
    displayName: `jojoedisplay${timestamp}`,
    phone: '0812345678',
  };
}
