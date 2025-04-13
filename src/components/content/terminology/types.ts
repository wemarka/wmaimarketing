
export interface TerminologyItem {
  id: string;
  term: string;
  definition: string;
  category: string;
}

export const initialTerms: TerminologyItem[] = [
  { id: "1", term: "جمال طبيعي", definition: "مظهر طبيعي وصحي دون استخدام مستحضرات تجميل ظاهرة", category: "مفاهيم عامة" },
  { id: "2", term: "نضارة البشرة", definition: "بشرة صحية ومشرقة ومرطبة", category: "العناية بالبشرة" },
  { id: "3", term: "ترطيب عميق", definition: "ترطيب يصل إلى الطبقات العميقة من البشرة", category: "العناية بالبشرة" },
  { id: "4", term: "مستحضرات خالية من البارابين", definition: "منتجات لا تحتوي على مواد حافظة صناعية تعرف باسم البارابين", category: "مكونات" },
  { id: "5", term: "تغذية الشعر", definition: "توفير العناصر الغذائية اللازمة لصحة الشعر", category: "العناية بالشعر" },
];
