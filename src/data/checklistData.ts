export type ChecklistCategory = 'medical' | 'preparation' | 'shopping' | 'personal' | 'legal';

export interface ChecklistItem {
  id: string;
  title: { he: string; en: string };
  description: { he: string; en: string };
  category: ChecklistCategory;
  weekDue: number;
  isRequired: boolean;
  trimester: 1 | 2 | 3 | 4; // 4 = hospital bag
}

export const checklistItems: ChecklistItem[] = [
  // First Trimester
  {
    id: 't1_ob',
    title: { he: 'בחרי גינקולוג/מיילדת', en: 'Choose OB/GYN or midwife' },
    description: {
      he: 'בחרי רופא/ה גינקולוג/ית או מיילדת שילווה אותך לאורך ההריון',
      en: 'Choose an OB/GYN or midwife who will accompany you throughout pregnancy',
    },
    category: 'medical',
    weekDue: 8,
    isRequired: true,
    trimester: 1,
  },
  {
    id: 't1_hmo',
    title: { he: 'בחירת תכנית הריון בקופת חולים', en: 'Choose HMO pregnancy package' },
    description: {
      he: 'הירשמי לתכנית הריון בקופת החולים שלך לקבלת הטבות ומעקב',
      en: 'Register for your HMO pregnancy package to receive benefits and monitoring',
    },
    category: 'medical',
    weekDue: 8,
    isRequired: true,
    trimester: 1,
  },
  {
    id: 't1_prenatal_appt',
    title: { he: 'קביעת פגישת מעקב ראשונה', en: 'Schedule first prenatal appointment' },
    description: {
      he: 'קבעי פגישת מעקב ראשונה עם הגינקולוג/ית',
      en: 'Schedule your first prenatal checkup appointment',
    },
    category: 'medical',
    weekDue: 8,
    isRequired: true,
    trimester: 1,
  },
  {
    id: 't1_vitamins',
    title: { he: 'התחילי ויטמינים לפני לידה', en: 'Start prenatal vitamins' },
    description: {
      he: 'חומצה פולית + ויטמין D + אומגה 3 — חיוני בשליש הראשון',
      en: 'Folic acid + Vitamin D + Omega 3 — essential in the first trimester',
    },
    category: 'medical',
    weekDue: 5,
    isRequired: true,
    trimester: 1,
  },
  {
    id: 't1_lifestyle',
    title: { he: 'שינויי אורח חיים', en: 'Lifestyle changes' },
    description: {
      he: 'הפסקת אלכוהול, עישון, דגים חיים, גבינות רכות',
      en: 'Stop alcohol, smoking, raw fish, soft cheeses',
    },
    category: 'personal',
    weekDue: 4,
    isRequired: true,
    trimester: 1,
  },
  {
    id: 't1_blood_tests',
    title: { he: 'בדיקות דם שגרתיות (שבוע 8)', en: 'Routine blood tests (week 8)' },
    description: {
      he: 'ספירת דם, סוג דם, אדמת, CMV, טוקסופלסמה, הפטיטיס, HIV, TSH',
      en: 'CBC, blood type, rubella, CMV, toxoplasmosis, hepatitis, HIV, TSH',
    },
    category: 'medical',
    weekDue: 8,
    isRequired: true,
    trimester: 1,
  },
  {
    id: 't1_nt_scan',
    title: { he: 'שקיפות עורפית + בדיקות דם (שבוע 11-13)', en: 'NT scan + blood screening (week 11-13)' },
    description: {
      he: 'אולטרסאונד שקיפות עורפית ובדיקות דם לאיתור תסמונת דאון',
      en: 'Nuchal translucency ultrasound and blood tests for Down syndrome screening',
    },
    category: 'medical',
    weekDue: 12,
    isRequired: true,
    trimester: 1,
  },
  {
    id: 't1_nipt',
    title: { he: 'בדיקת DNA חופשי (NIPT)', en: 'NIPT cell-free DNA test' },
    description: {
      he: 'בדיקת דם מתקדמת לגילוי מוקדם של חריגות כרומוזומליות',
      en: 'Advanced blood test for early detection of chromosomal abnormalities',
    },
    category: 'medical',
    weekDue: 12,
    isRequired: false,
    trimester: 1,
  },
  {
    id: 't1_employer',
    title: { he: 'הודיעי למעסיק (אם נדרש)', en: 'Notify employer (if needed)' },
    description: {
      he: 'זכות עובדת בהריון — הגנה מפיטורין מהשבוע הראשון',
      en: 'Pregnant worker rights — protection from dismissal from week 1',
    },
    category: 'legal',
    weekDue: 12,
    isRequired: false,
    trimester: 1,
  },
  {
    id: 't1_tipat_halav',
    title: { he: 'הירשמי לטיפת חלב', en: 'Register at Tipat Halav' },
    description: {
      he: 'הירשמי בתחנת טיפת חלב הקרובה לאחר הלידה',
      en: 'Register at your nearest Tipat Halav well-baby clinic',
    },
    category: 'medical',
    weekDue: 13,
    isRequired: true,
    trimester: 1,
  },

  // Second Trimester
  {
    id: 't2_morphology',
    title: { he: 'אולטרסאונד מורפולוגי (שבוע 18-22)', en: 'Morphology ultrasound / Level 2 scan' },
    description: {
      he: 'הבדיקה החשובה ביותר! בדיקת כל האיברים, עמוד שדרה, לב, שפה שסועה, גפיים, שליה',
      en: 'Most important scan! Checks all organs, spine, heart, cleft lip, limbs, placenta position',
    },
    category: 'medical',
    weekDue: 20,
    isRequired: true,
    trimester: 2,
  },
  {
    id: 't2_diabetes',
    title: { he: 'בדיקת סוכרת הריון (שבוע 24-28)', en: 'Gestational diabetes test (week 24-28)' },
    description: {
      he: 'בדיקת העמסת סוכר (GCT/OGTT) לאיתור סוכרת הריון',
      en: 'Glucose challenge/tolerance test (GCT/OGTT) for gestational diabetes screening',
    },
    category: 'medical',
    weekDue: 26,
    isRequired: true,
    trimester: 2,
  },
  {
    id: 't2_hospital',
    title: { he: 'מחקר בתי חולים ובחירה', en: 'Research and choose birth hospital' },
    description: {
      he: 'בקרי בחדרי לידה, הכירי את המדיניות ובחרי בית חולים עד שבוע 20',
      en: 'Visit delivery wards, learn about policies, choose hospital by week 20',
    },
    category: 'preparation',
    weekDue: 20,
    isRequired: true,
    trimester: 2,
  },
  {
    id: 't2_birth_course',
    title: { he: 'קורס לידה', en: 'Prenatal classes / birth preparation course' },
    description: {
      he: 'הירשמי לקורס לידה — הכנה מנטלית ופיזית ללידה',
      en: 'Enroll in birth preparation class — mental and physical preparation for labor',
    },
    category: 'preparation',
    weekDue: 24,
    isRequired: false,
    trimester: 2,
  },
  {
    id: 't2_shopping',
    title: { he: 'קניית עגלה, כיסא בטיחות, עריסה', en: 'Buy stroller, car seat, crib' },
    description: {
      he: 'התחילי בקנייה של הציוד הגדול — לפעמים יש המתנה ארוכה על מוצרים',
      en: 'Start purchasing big items — some products have long waiting times',
    },
    category: 'shopping',
    weekDue: 22,
    isRequired: true,
    trimester: 2,
  },
  {
    id: 't2_birth_plan',
    title: { he: 'הכיני תכנית לידה', en: 'Prepare birth plan' },
    description: {
      he: 'תכנית לידה — העדפות שלך לגבי תהליך הלידה',
      en: 'Birth plan — your preferences for the labor and delivery process',
    },
    category: 'preparation',
    weekDue: 25,
    isRequired: false,
    trimester: 2,
  },
  {
    id: 't2_maternity_leave',
    title: { he: 'טפסי חופשת לידה (ביטוח לאומי)', en: 'Maternity leave paperwork (National Insurance)' },
    description: {
      he: 'טופס 6 ביטוח לאומי — הגישי לא יאוחר משבוע 26',
      en: 'National Insurance form 6 — submit no later than week 26',
    },
    category: 'legal',
    weekDue: 26,
    isRequired: true,
    trimester: 2,
  },
  {
    id: 't2_dental',
    title: { he: 'בדיקת שיניים', en: 'Dental checkup' },
    description: {
      he: 'בדיקת שיניים מכוסה בקופת חולים במהלך ההריון',
      en: 'Dental checkup is covered by HMO during pregnancy',
    },
    category: 'medical',
    weekDue: 20,
    isRequired: false,
    trimester: 2,
  },

  // Third Trimester
  {
    id: 't3_gbs',
    title: { he: 'בדיקת GBS (שבוע 35-37)', en: 'GBS Group B Strep test (week 35-37)' },
    description: {
      he: 'תרבית סטרפטוקוק קבוצה B — בדיקה רגילה להגנת התינוק',
      en: 'Group B Streptococcus culture — routine test to protect baby',
    },
    category: 'medical',
    weekDue: 36,
    isRequired: true,
    trimester: 3,
  },
  {
    id: 't3_perineal',
    title: { he: 'עיסוי פרינאום (מהשבוע 34)', en: 'Perineal massage (from week 34)' },
    description: {
      he: 'עיסוי יומי של הפרינאום להפחתת קרעים בלידה',
      en: 'Daily perineal massage to reduce tearing during birth',
    },
    category: 'personal',
    weekDue: 34,
    isRequired: false,
    trimester: 3,
  },
  {
    id: 't3_baby_room',
    title: { he: 'הכנת חדר התינוק', en: "Baby's room setup" },
    description: {
      he: 'הכנת חדר התינוק — עריסה, החתלה, ארון בגדים',
      en: "Set up baby's room — crib, changing table, dresser",
    },
    category: 'preparation',
    weekDue: 34,
    isRequired: false,
    trimester: 3,
  },
  {
    id: 't3_car_seat',
    title: { he: 'התקנת כיסא בטיחות (ובדיקה!)', en: 'Install car seat (and test it!)' },
    description: {
      he: 'ודאי שכיסא הבטיחות מותקן נכון — בלי זה לא תצאי מבית החולים',
      en: 'Make sure car seat is correctly installed — required before leaving hospital',
    },
    category: 'preparation',
    weekDue: 35,
    isRequired: true,
    trimester: 3,
  },
  {
    id: 't3_freeze_meals',
    title: { he: 'הקפאת ארוחות', en: 'Freeze meals' },
    description: {
      he: 'הכיני ארוחות מוכנות לשבועות הראשונים אחרי הלידה',
      en: 'Prepare meals in advance for the first weeks after birth',
    },
    category: 'personal',
    weekDue: 36,
    isRequired: false,
    trimester: 3,
  },
  {
    id: 't3_postbirth_help',
    title: { he: 'ארגון עזרה אחרי הלידה', en: 'Arrange post-birth help' },
    description: {
      he: 'תאמי עזרה ממשפחה, דולה, אחות לילה',
      en: 'Coordinate help from family, doula, or night nurse',
    },
    category: 'personal',
    weekDue: 36,
    isRequired: false,
    trimester: 3,
  },
  {
    id: 't3_birth_registration',
    title: { he: 'ניירת רישום תעודת לידה', en: 'Birth registration paperwork' },
    description: {
      he: 'הכיני את ניירת הנדרשת לרישום הילד/ה במשרד הפנים',
      en: 'Prepare documentation needed for birth registration at Ministry of Interior',
    },
    category: 'legal',
    weekDue: 37,
    isRequired: true,
    trimester: 3,
  },
  {
    id: 't3_hmo_register_baby',
    title: { he: 'רישום הילד/ה לקופת חולים', en: 'Register child at HMO' },
    description: {
      he: 'רשמי את הילד/ה לקופת חולים תוך 30 יום מהלידה',
      en: 'Register the baby with the HMO within 30 days of birth',
    },
    category: 'medical',
    weekDue: 38,
    isRequired: true,
    trimester: 3,
  },

  // Hospital Bag (trimester 4)
  {
    id: 'bag_id',
    title: { he: 'תעודת זהות + כרטיס קופת חולים', en: 'ID + insurance card' },
    description: {
      he: 'ודאי שיש לך תעודת זהות וכרטיס קופת חולים בתיק',
      en: 'Make sure your ID and insurance card are in the bag',
    },
    category: 'preparation',
    weekDue: 36,
    isRequired: true,
    trimester: 4,
  },
  {
    id: 'bag_clothes',
    title: { he: '2-3 חליפות נוחות', en: '2-3 comfortable outfits' },
    description: {
      he: 'בגדים נוחים ורפויים לשהות בבית החולים',
      en: 'Loose comfortable clothing for hospital stay',
    },
    category: 'shopping',
    weekDue: 36,
    isRequired: true,
    trimester: 4,
  },
  {
    id: 'bag_nursing_bra',
    title: { he: 'חזיית הנקה', en: 'Nursing bra' },
    description: {
      he: 'חזיית הנקה נוחה לתמיכה',
      en: 'Comfortable nursing bra for support',
    },
    category: 'shopping',
    weekDue: 36,
    isRequired: false,
    trimester: 4,
  },
  {
    id: 'bag_toiletries',
    title: { he: 'מוצרי טיפוח', en: 'Toiletries' },
    description: {
      he: 'שמפו, סבון, מברשת שיניים, ומה שאת צריכה',
      en: 'Shampoo, soap, toothbrush, and personal care items',
    },
    category: 'shopping',
    weekDue: 36,
    isRequired: true,
    trimester: 4,
  },
  {
    id: 'bag_snacks',
    title: { he: 'חטיפים', en: 'Snacks' },
    description: {
      he: 'חטיפים בריאים לאנרגיה בזמן הלידה ואחריה',
      en: 'Healthy snacks for energy during and after labor',
    },
    category: 'shopping',
    weekDue: 36,
    isRequired: false,
    trimester: 4,
  },
  {
    id: 'bag_charger',
    title: { he: 'מטען + אוזניות', en: 'Charger + headphones' },
    description: {
      he: 'מטען לטלפון ואוזניות למוזיקה/פודקאסטים',
      en: 'Phone charger and headphones for music/podcasts',
    },
    category: 'shopping',
    weekDue: 36,
    isRequired: false,
    trimester: 4,
  },
  {
    id: 'bag_birth_plan',
    title: { he: 'הדפסת תכנית לידה', en: 'Birth plan printout' },
    description: {
      he: 'הדפיסי את תכנית הלידה שלך כדי לשתף עם הצוות הרפואי',
      en: 'Print your birth plan to share with the medical team',
    },
    category: 'preparation',
    weekDue: 36,
    isRequired: false,
    trimester: 4,
  },
  {
    id: 'bag_baby_onesies',
    title: { he: '2-3 רומפרים לתינוק (מידה 50-56)', en: '2-3 onesies for baby (size 50-56)' },
    description: {
      he: 'רומפרים נוחים לתינוק לשהות בבית החולים',
      en: 'Comfortable onesies for baby during hospital stay',
    },
    category: 'shopping',
    weekDue: 36,
    isRequired: true,
    trimester: 4,
  },
  {
    id: 'bag_swaddle',
    title: { he: 'שמיכת עטיפה', en: 'Swaddle blanket' },
    description: {
      he: 'שמיכה לעטיפת התינוק',
      en: 'Blanket for swaddling baby',
    },
    category: 'shopping',
    weekDue: 36,
    isRequired: true,
    trimester: 4,
  },
  {
    id: 'bag_car_seat_ready',
    title: { he: 'כיסא בטיחות מותקן (חובה!)', en: 'Car seat installed (must have!)' },
    description: {
      he: 'לא יאפשרו לך לצאת מבית החולים ללא כיסא בטיחות מותקן',
      en: 'You will not be allowed to leave the hospital without an installed car seat',
    },
    category: 'preparation',
    weekDue: 36,
    isRequired: true,
    trimester: 4,
  },
];
