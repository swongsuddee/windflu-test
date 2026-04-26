import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

type CreatedCampaignRecord = {
  createdAt: string;
  flow: string;
  brandAccount: string;
  campaignTitle: string;
  status: string;
  paymentMethod: string;
  notes: string;
};

const createdCampaignsPath = path.resolve(process.cwd(), 'src/test-data/created-campaigns.md');

const defaultCreatedCampaignsContent = `# Created Campaigns

Purpose: shared local record of successfully created campaigns from the
automated brand create-campaign success flow.

This file is intentionally gitignored because it is a local QA workspace
registry and may change frequently across runs.

Do not record auth tokens, cookies, payment secrets, or private personal data
in this file.

## Recording Rules

- Add newest successful campaigns at the top.
- Record only campaigns that completed the intended brand-side success flow.
- Keep entries limited to safe campaign metadata needed for QA traceability.
- If a created campaign later becomes reusable for another module, reference it
  by title or local note only.

## Campaign Registry

| Created At | Flow | Brand Account | Campaign Title | Status | Payment Method | Notes |
| ---------- | ---- | ------------- | -------------- | ------ | -------------- | ----- |
| _No entries yet_ | BRC-008 | \`brand@example.com\` | \`ครั้งที่ XXXXX-ตัวอย่างแคมเปญ\` | _TBD_ | QR | Add real rows only after a successful run. |
`;

async function ensureCreatedCampaignsFile() {
  await mkdir(path.dirname(createdCampaignsPath), { recursive: true });

  try {
    await readFile(createdCampaignsPath, 'utf8');
  } catch (error) {
    const fileError = error as { code?: string };

    if (fileError.code !== 'ENOENT') {
      throw error;
    }

    await writeFile(createdCampaignsPath, defaultCreatedCampaignsContent, 'utf8');
  }
}

export async function appendCreatedCampaign(record: CreatedCampaignRecord) {
  await ensureCreatedCampaignsFile();

  const row = `| ${record.createdAt} | ${record.flow} | \`${record.brandAccount}\` | \`${record.campaignTitle}\` | ${record.status} | ${record.paymentMethod} | ${record.notes} |\n`;
  const currentContent = await readFile(createdCampaignsPath, 'utf8');
  const placeholderRow =
    '| _No entries yet_ | BRC-008 | `brand@example.com` | `ครั้งที่ XXXXX-ตัวอย่างแคมเปญ` | _TBD_ | QR | Add real rows only after a successful run. |\n';
  const tableDivider =
    '| ---------- | ---- | ------------- | -------------- | ------ | -------------- | ----- |\n';

  let nextContent: string;

  if (currentContent.includes(placeholderRow)) {
    nextContent = currentContent.replace(placeholderRow, row);
  } else if (currentContent.includes(tableDivider)) {
    nextContent = currentContent.replace(tableDivider, `${tableDivider}${row}`);
  } else {
    nextContent = `${currentContent.trimEnd()}\n${row}`;
  }

  await writeFile(createdCampaignsPath, nextContent, 'utf8');
}
