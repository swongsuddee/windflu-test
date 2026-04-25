import { appendFile } from 'fs/promises';
import path from 'path';

type RegisteredSuccessAccount = {
  createdAt: string;
  flow: string;
  contactName: string;
  email: string;
  role: string;
  status: string;
  passwordReference: string;
  notes: string;
};

const registerSuccessAccountsPath = path.resolve(
  process.cwd(),
  'src/test/web-ui/register-flow/register-success-accounts.md'
);

export async function appendRegisterSuccessAccount(account: RegisteredSuccessAccount) {
  const row = `| ${account.createdAt} | ${account.flow} | \`${account.contactName}\` | \`${account.email}\` | ${account.role} | ${account.status} | ${account.passwordReference} | ${account.notes} |\n`;

  await appendFile(registerSuccessAccountsPath, row, 'utf8');
}
