
// Sample engagement data
export const engagementData = [
  {
    name: 'أحد',
    instagram: 1200,
    facebook: 800,
    tiktok: 1400,
    email: 300,
  },
  {
    name: 'إثنين',
    instagram: 1400,
    facebook: 1000,
    tiktok: 1600,
    email: 450,
  },
  {
    name: 'ثلاثاء',
    instagram: 1500,
    facebook: 1200,
    tiktok: 1800,
    email: 380,
  },
  {
    name: 'أربعاء',
    instagram: 1800,
    facebook: 1500,
    tiktok: 2200,
    email: 520,
  },
  {
    name: 'خميس',
    instagram: 2000,
    facebook: 1700,
    tiktok: 2500,
    email: 590,
  },
  {
    name: 'جمعة',
    instagram: 1600,
    facebook: 1300,
    tiktok: 2000,
    email: 400,
  },
  {
    name: 'سبت',
    instagram: 1300,
    facebook: 900,
    tiktok: 1600,
    email: 350,
  },
];

// Previous week data for comparison
export const prevWeekData = [
  {
    name: 'أحد',
    instagram: 1000,
    facebook: 700,
    tiktok: 1200,
    email: 250,
  },
  {
    name: 'إثنين',
    instagram: 1200,
    facebook: 900,
    tiktok: 1500,
    email: 380,
  },
  {
    name: 'ثلاثاء',
    instagram: 1300,
    facebook: 1100,
    tiktok: 1600,
    email: 320,
  },
  {
    name: 'أربعاء',
    instagram: 1500,
    facebook: 1300,
    tiktok: 1900,
    email: 450,
  },
  {
    name: 'خميس',
    instagram: 1800,
    facebook: 1500,
    tiktok: 2300,
    email: 500,
  },
  {
    name: 'جمعة',
    instagram: 1400,
    facebook: 1100,
    tiktok: 1800,
    email: 370,
  },
  {
    name: 'سبت',
    instagram: 1100,
    facebook: 800,
    tiktok: 1400,
    email: 300,
  },
];

// Function to calculate totals for each platform
export const calculateTotals = (data: any[]) => {
  return data.reduce(
    (acc, curr) => {
      return {
        instagram: acc.instagram + (curr.instagram || 0),
        facebook: acc.facebook + (curr.facebook || 0),
        tiktok: acc.tiktok + (curr.tiktok || 0),
        email: acc.email + (curr.email || 0),
      };
    },
    { instagram: 0, facebook: 0, tiktok: 0, email: 0 }
  );
};

// Additional export for month and year data if needed
export const getMonthData = () => {
  return [...engagementData, ...engagementData, ...engagementData];
};

export const getYearData = () => {
  const result = [];
  for (let i = 0; i < 12; i++) {
    result.push(...engagementData.map(item => ({
      ...item,
      name: `${item.name} (${i + 1})`
    })));
  }
  return result;
};
