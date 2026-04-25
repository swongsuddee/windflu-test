import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

type RegisteredSuccessAccount = {
  createdAt: string;
  flow: string;
  contactName: string;
  email: string;
  role: string;
  status: string;
  password: string;
  notes: string;
};

const registerSuccessAccountsPath = path.resolve(
  process.cwd(),
  'src/test-data/register-success-accounts.md'
);

const defaultRegisterSuccessAccountsContent = `# Register Success Accounts

Purpose: shared local record of successfully created registration accounts from
valid registration flows.

This file is intentionally gitignored because it stores generated test
passwords.

Do not record OTPs, cookies, auth tokens, or recovery links in this file.

## Recording Rules

- Add newest successful accounts at the top.
- Record only accounts that completed the intended registration success flow.
- This file stores the actual generated password for each successful account.
- If an account becomes reusable across authenticated tests, summarize it
  separately in \`src/test-data/registered-accounts.md\` using a password
  reference only.

## Success Registry

| Created At | Flow | Display Name / Contact Name | Email | Role | Status | Password | Notes |
| ---------- | ---- | --------------------------- | ----- | ---- | ------ | -------- | ----- |
| _No entries yet_ | REG-VAL-001 | \`jojoetestYYYYMMDDHHMMSS\` | \`jojoetestYYYYMMDDHHMMSS@example.com\` | Brand | _TBD_ | \`generated-password\` | Add real rows only after a successful run. |
`;

async function ensureRegisterSuccessAccountsFile() {
  await mkdir(path.dirname(registerSuccessAccountsPath), { recursive: true });

  try {
    await readFile(registerSuccessAccountsPath, 'utf8');
  } catch (error) {
    const fileError = error as { code?: string };

    if (fileError.code !== 'ENOENT') {
      throw error;
    }

    await writeFile(registerSuccessAccountsPath, defaultRegisterSuccessAccountsContent, 'utf8');
  }
}

export async function appendRegisterSuccessAccount(account: RegisteredSuccessAccount) {
  await ensureRegisterSuccessAccountsFile();

  const row = `| ${account.createdAt} | ${account.flow} | \`${account.contactName}\` | \`${account.email}\` | ${account.role} | ${account.status} | \`${account.password}\` | ${account.notes} |\n`;
  const currentContent = await readFile(registerSuccessAccountsPath, 'utf8');
  const placeholderRow =
    '| _No entries yet_ | REG-VAL-001 | `jojoetestYYYYMMDDHHMMSS` | `jojoetestYYYYMMDDHHMMSS@example.com` | Brand | _TBD_ | `generated-password` | Add real rows only after a successful run. |\n';
  const tableDivider =
    '| ---------- | ---- | --------------------------- | ----- | ---- | ------ | -------- | ----- |\n';

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
