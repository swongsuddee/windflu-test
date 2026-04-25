import { readFile, writeFile } from 'fs/promises';
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
  'src/test/web-ui/creator-register-flow/register-success-accounts.md'
);

export async function appendRegisterSuccessAccount(account: RegisteredSuccessAccount) {
  const row = `| ${account.createdAt} | ${account.flow} | \`${account.contactName}\` | \`${account.email}\` | ${account.role} | ${account.status} | ${account.passwordReference} | ${account.notes} |\n`;
  const currentContent = await readFile(registerSuccessAccountsPath, 'utf8');
  const placeholderRow =
    '| _No entries yet_ | Brand register valid flow | `jojoetestYYYYMMDDHHMMSS`   | `jojoetestYYYYMMDDHHMMSS@example.com` | Brand | _TBD_  | `_reference only_` | Add real rows only after a successful run. |\n';
  const tableDivider =
    '| ---------------- | ------------------------- | --------------------------- | ------------------------------------- | ----- | ------ | ------------------ | ------------------------------------------ |\n';

  let nextContent: string;

  if (currentContent.includes(placeholderRow)) {
    nextContent = currentContent.replace(placeholderRow, row);
  } else if (currentContent.includes(tableDivider)) {
    nextContent = currentContent.replace(tableDivider, `${tableDivider}${row}`);
  } else {
    nextContent = `${currentContent.trimEnd()}\n${row}`;
  }

  await writeFile(registerSuccessAccountsPath, nextContent, 'utf8');
}
