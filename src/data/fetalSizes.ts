export interface FetalSize {
  week: number;
  comparison: { he: string; en: string };
  lengthCm: number;
  weightGrams: number;
  emoji: string;
}

export const fetalSizes: FetalSize[] = [
  { week: 4, comparison: { he: 'גרגיר פרג', en: 'Poppy seed' }, lengthCm: 0.1, weightGrams: 0, emoji: '🌱' },
  { week: 5, comparison: { he: 'זרע שומשום', en: 'Sesame seed' }, lengthCm: 0.2, weightGrams: 0, emoji: '🌿' },
  { week: 6, comparison: { he: 'אפונה', en: 'Pea' }, lengthCm: 0.6, weightGrams: 0, emoji: '🫛' },
  { week: 7, comparison: { he: 'אוכמנית', en: 'Blueberry' }, lengthCm: 1.0, weightGrams: 1, emoji: '🫐' },
  { week: 8, comparison: { he: 'פטל', en: 'Raspberry' }, lengthCm: 1.6, weightGrams: 1, emoji: '🍓' },
  { week: 9, comparison: { he: 'דובדבן', en: 'Cherry' }, lengthCm: 2.3, weightGrams: 2, emoji: '🍒' },
  { week: 10, comparison: { he: 'תות', en: 'Strawberry' }, lengthCm: 3.1, weightGrams: 4, emoji: '🍓' },
  { week: 11, comparison: { he: 'תאנה', en: 'Fig' }, lengthCm: 4.1, weightGrams: 7, emoji: '🍈' },
  { week: 12, comparison: { he: 'ליים', en: 'Lime' }, lengthCm: 5.4, weightGrams: 14, emoji: '🍋' },
  { week: 13, comparison: { he: 'אפונת סוכר', en: 'Snap pea' }, lengthCm: 7.4, weightGrams: 23, emoji: '🫛' },
  { week: 14, comparison: { he: 'לימון', en: 'Lemon' }, lengthCm: 8.7, weightGrams: 43, emoji: '🍋' },
  { week: 15, comparison: { he: 'תפוח', en: 'Apple' }, lengthCm: 10.1, weightGrams: 70, emoji: '🍎' },
  { week: 16, comparison: { he: 'אבוקדו', en: 'Avocado' }, lengthCm: 11.6, weightGrams: 100, emoji: '🥑' },
  { week: 17, comparison: { he: 'צנון', en: 'Turnip' }, lengthCm: 13.0, weightGrams: 140, emoji: '🥕' },
  { week: 18, comparison: { he: 'פלפל', en: 'Bell pepper' }, lengthCm: 14.2, weightGrams: 190, emoji: '🫑' },
  { week: 19, comparison: { he: 'עגבנייה', en: 'Tomato' }, lengthCm: 15.3, weightGrams: 240, emoji: '🍅' },
  { week: 20, comparison: { he: 'בננה', en: 'Banana' }, lengthCm: 25.6, weightGrams: 300, emoji: '🍌' },
  { week: 21, comparison: { he: 'גזר', en: 'Carrot' }, lengthCm: 26.7, weightGrams: 360, emoji: '🥕' },
  { week: 22, comparison: { he: 'פפאיה', en: 'Papaya' }, lengthCm: 27.8, weightGrams: 430, emoji: '🍈' },
  { week: 23, comparison: { he: 'מנגו', en: 'Mango' }, lengthCm: 28.9, weightGrams: 501, emoji: '🥭' },
  { week: 24, comparison: { he: 'תירס', en: 'Corn' }, lengthCm: 30.0, weightGrams: 600, emoji: '🌽' },
  { week: 25, comparison: { he: 'צנון לבן', en: 'Rutabaga' }, lengthCm: 34.6, weightGrams: 660, emoji: '🥔' },
  { week: 26, comparison: { he: 'חסה', en: 'Head of lettuce' }, lengthCm: 35.6, weightGrams: 760, emoji: '🥬' },
  { week: 27, comparison: { he: 'כרובית', en: 'Cauliflower' }, lengthCm: 36.6, weightGrams: 875, emoji: '🥦' },
  { week: 28, comparison: { he: 'חציל', en: 'Eggplant' }, lengthCm: 37.6, weightGrams: 1005, emoji: '🍆' },
  { week: 29, comparison: { he: 'דלעת', en: 'Butternut squash' }, lengthCm: 38.6, weightGrams: 1153, emoji: '🎃' },
  { week: 30, comparison: { he: 'כרוב', en: 'Cabbage' }, lengthCm: 39.9, weightGrams: 1319, emoji: '🥬' },
  { week: 31, comparison: { he: 'קוקוס', en: 'Coconut' }, lengthCm: 41.1, weightGrams: 1502, emoji: '🥥' },
  { week: 32, comparison: { he: 'ג׳יקמה', en: 'Jicama' }, lengthCm: 42.4, weightGrams: 1702, emoji: '🥔' },
  { week: 33, comparison: { he: 'אננס', en: 'Pineapple' }, lengthCm: 43.7, weightGrams: 1918, emoji: '🍍' },
  { week: 34, comparison: { he: 'בטטה', en: 'Cantaloupe' }, lengthCm: 45.0, weightGrams: 2146, emoji: '🍈' },
  { week: 35, comparison: { he: 'מלון ירוק', en: 'Honeydew melon' }, lengthCm: 46.2, weightGrams: 2383, emoji: '🍈' },
  { week: 36, comparison: { he: 'ראש חסה רומאי', en: 'Romaine lettuce' }, lengthCm: 47.4, weightGrams: 2622, emoji: '🥬' },
  { week: 37, comparison: { he: 'מנגולד', en: 'Swiss chard bunch' }, lengthCm: 48.6, weightGrams: 2859, emoji: '🥬' },
  { week: 38, comparison: { he: 'כרישה', en: 'Leek' }, lengthCm: 49.8, weightGrams: 3083, emoji: '🧅' },
  { week: 39, comparison: { he: 'אבטיח קטן', en: 'Small watermelon' }, lengthCm: 50.7, weightGrams: 3288, emoji: '🍉' },
  { week: 40, comparison: { he: 'אבטיח', en: 'Watermelon' }, lengthCm: 51.2, weightGrams: 3462, emoji: '🍉' },
];

export function getFetalSizeForWeek(week: number): FetalSize {
  const size = fetalSizes.find((s) => s.week === week);
  return size ?? fetalSizes[0];
}
