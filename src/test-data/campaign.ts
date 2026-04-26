const baseBrandCampaignTitle = 'เดินเล่นเบา ๆ ทางไม่ไกล';

function createCampaignIncrementLabel() {
  return new Date()
    .toISOString()
    .replace(/[-:.TZ]/g, '')
    .slice(4, 14);
}

export function createBrandCreateCampaignTestData() {
  const incrementLabel = createCampaignIncrementLabel();

  return {
    title: `ครั้งที่ ${incrementLabel}-${baseBrandCampaignTitle}`,
    detail: `บางครั้งการออกเดินทาง ไม่จำเป็นต้องไปไกลเสมอไป
แค่มีเส้นทางให้ก้าว มีภูเขาให้มอง และมีอากาศดี ๆ ให้หายใจ ก็เพียงพอแล้ว
ทริปนี้สำหรับคนที่อยากพักจากความวุ่นวาย
เดินช้า ๆ แบบไม่ต้องรีบ เหนื่อยนิดหน่อยพอให้หัวใจเต้นแรงขึ้น และได้เห็นวิวสวย ๆ ระหว่างทาง
ระยะทางอาจไม่ไกล
แต่ความสบายใจที่ได้กลับมา อาจมากกว่าที่คิด
เดินเล่นเบา ๆ ทางไม่ไกล แต่ความสุขเกินระยะทาง`,
    imagePath: 'src/assets/campaign-image-1.jpg',
  } as const;
}
