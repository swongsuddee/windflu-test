export type BrandRegisterAccountData = {
  contactName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

function createRegisterTimestamp() {
  return new Date()
    .toISOString()
    .replace(/[-:.TZ]/g, '')
    .slice(0, 14);
}

function createPasswordRandomSegment() {
  return Math.random().toString(36).slice(2, 8);
}

function createValidRegisterPassword() {
  const timestamp = createRegisterTimestamp().slice(-6);
  const randomSegment = createPasswordRandomSegment();

  return `Wf${timestamp}${randomSegment}Aa1!`;
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
  const password = createValidRegisterPassword();

  return {
    contactName: `jojoetest${timestamp}`,
    email: `jojoetest${timestamp}@example.com`,
    password,
    confirmPassword: password,
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

export function createValidCreatorRegisterAccountData(): CreatorRegisterAccountData {
  const timestamp = createRegisterTimestamp();
  const password = createValidRegisterPassword();

  return {
    email: `jojoetest${timestamp}@example.com`,
    password,
    confirmPassword: password,
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
