export type BrandRegisterAccountData = {
  contactName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

export function createBrandRegisterAccountData(): BrandRegisterAccountData {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:.TZ]/g, '')
    .slice(0, 14);

  return {
    contactName: `jojoetest${timestamp}`,
    email: `jojoetest${timestamp}@example.com`,
    password: 'Password123!',
    confirmPassword: 'Different123!',
    phone: '0812345678',
  };
}
