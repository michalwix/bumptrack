export interface MedicalTest {
  name: { he: string; en: string };
  isRequired: boolean;
  description: { he: string; en: string };
}

export interface WeekData {
  week: number;
  trimester: 1 | 2 | 3;
  development: { he: string; en: string };
  motherChanges: { he: string; en: string };
  medicalTests: MedicalTest[];
  tips: { he: string; en: string }[];
}

export const weeklyData: WeekData[] = [
  {
    week: 1,
    trimester: 1,
    development: {
      he: 'בשבוע הראשון אין עדיין עובר. זהו בעצם מחזור הווסת שלך. הגוף מתכונן לביוץ ולהשתלה אפשרית. הרחם משיל את רירית הרחם הישנה ומתחיל לבנות רירית חדשה לקראת השתלת ביצית מופרית.',
      en: 'In week 1, there is no embryo yet. This is actually your menstrual period. Your body is preparing for ovulation and possible implantation. The uterus sheds its old lining and begins building a new one in preparation for a fertilized egg.',
    },
    motherChanges: {
      he: 'אתה חווה את תסמיני הווסת הרגילים: כאבי בטן תחתונה, דימום, עייפות. זהו הזמן הטוב לעשות בדיקות דם בסיסיות ולוודא שרמות הברזל, ויטמין D וחומצה פולית תקינות.',
      en: 'You experience normal menstrual symptoms: lower abdominal pain, bleeding, fatigue. This is a good time to get baseline blood tests and ensure iron, Vitamin D, and folic acid levels are normal.',
    },
    medicalTests: [
      {
        name: { he: 'בדיקות דם לפני הריון', en: 'Pre-pregnancy blood tests' },
        isRequired: false,
        description: {
          he: 'ספירת דם, ברזל, ויטמין D, חומצה פולית, TSH',
          en: 'CBC, iron, Vitamin D, folic acid, TSH',
        },
      },
    ],
    tips: [
      {
        he: 'התחילי לקחת חומצה פולית 400-800 מקג ביום לפחות חודש לפני ההיריון',
        en: 'Start taking folic acid 400-800 mcg daily at least one month before conception',
      },
      {
        he: 'הפסיקי לעשן ולשתות אלכוהול',
        en: 'Stop smoking and drinking alcohol',
      },
    ],
  },
  {
    week: 2,
    trimester: 1,
    development: {
      he: 'בשבוע השני מתרחש הביוץ. הגוף משחרר ביצית בשלה מהשחלה. הביצית נודדת דרך חצוצרה לכיוון הרחם. אם מתרחשת הפריה, הביצית המופרית מתחילה להתחלק ולהיות בלסטוציסטה.',
      en: 'In week 2, ovulation occurs. Your body releases a mature egg from the ovary. The egg travels through the fallopian tube toward the uterus. If fertilization occurs, the fertilized egg begins dividing to become a blastocyst.',
    },
    motherChanges: {
      he: 'ייתכן שתרגישי כאב קל בצד אחד של הבטן בזמן הביוץ (מיטלשמרץ). הרחם מכין את הרירית לקראת השתלה. ייתכן שתרגישי עלייה ברצון המיני.',
      en: 'You may feel mild one-sided pelvic pain during ovulation (Mittelschmerz). The uterus prepares its lining for implantation. You may experience increased libido.',
    },
    medicalTests: [],
    tips: [
      {
        he: 'זהו זמן הביוץ — הזמן הפורה ביותר להיריון',
        en: 'This is ovulation time — the most fertile period for conception',
      },
      {
        he: 'נהלי יחסי מין ביום הביוץ ויום לפניו ואחריו להגדלת הסיכויים',
        en: 'Have intercourse on the day of ovulation and the day before and after to increase chances',
      },
    ],
  },
  {
    week: 3,
    trimester: 1,
    development: {
      he: 'בשבוע השלישי מתרחשת ההפריה והשתלה. הזרע מפרה את הביצית ליצירת זיגוטה. הזיגוטה מתחלקת שוב ושוב תוך כדי נסיעתה לרחם. בסוף השבוע, הבלסטוציסטה נשתלת ברירית הרחם.',
      en: 'In week 3, fertilization and implantation occur. Sperm fertilizes the egg to create a zygote. The zygote divides repeatedly while traveling to the uterus. By the end of the week, the blastocyst implants in the uterine lining.',
    },
    motherChanges: {
      he: 'ייתכן שתחוישי "דימום השתלה" קל — כתמים ורודים או חומים. הגוף מתחיל לייצר hCG (הורמון ההיריון). ייתכן שתרגישי עייפות קלה.',
      en: 'You may experience light "implantation bleeding" — pinkish or brownish spotting. Your body begins producing hCG (pregnancy hormone). You may feel mild fatigue.',
    },
    medicalTests: [],
    tips: [
      {
        he: 'אם חשת כאב חד בצד אחד של הבטן — פני לרופאה לשלילת היריון חוץ-רחמי',
        en: 'If you feel sharp pain on one side of the abdomen — see a doctor to rule out ectopic pregnancy',
      },
    ],
  },
  {
    week: 4,
    trimester: 1,
    development: {
      he: 'העובר בגודל גרגיר פרג — כ-0.1 ס"מ. הבלסטוציסטה הפכה לעמבריו קטן. שלוש שכבות תאים בסיסיות (אקטודרם, מזודרם, אנדודרם) מתחילות להתפתח. כל האיברים יגדלו מהשכבות הללו. רמות ה-hCG עולות בקצב מהיר — מספיק לאיתור בבדיקת היריון.',
      en: 'The embryo is the size of a poppy seed — about 0.1 cm. The blastocyst has become a tiny embryo. Three basic cell layers (ectoderm, mesoderm, endoderm) begin developing. All organs will grow from these layers. hCG levels rise rapidly — enough to detect in a pregnancy test.',
    },
    motherChanges: {
      he: 'הווסת מאוחרת — הסימן הראשון לעתים. ייתכן שתרגישי עייפות, רגישות בשדיים, בחילות קלות. רמות הפרוגסטרון עולות ומרגיעות את שרירי הרחם.',
      en: 'Missed period — often the first sign. You may feel fatigue, breast tenderness, and mild nausea. Progesterone levels rise and relax uterine muscles.',
    },
    medicalTests: [
      {
        name: { he: 'בדיקת היריון ביתית', en: 'Home pregnancy test' },
        isRequired: true,
        description: {
          he: 'בדיקת שתן לאיתור hCG — ניתן לבצע מהיום הראשון לאיחור הווסת',
          en: 'Urine test for hCG detection — can be done from the first day of missed period',
        },
      },
    ],
    tips: [
      {
        he: 'אם הבדיקה חיובית — קבעי תור לגינקולוג/ית בהקדם',
        en: 'If the test is positive — schedule an appointment with your OB/GYN promptly',
      },
      {
        he: 'הפסיקי כל תרופות שאינן מאושרות להריון — התייעצי עם רופאה',
        en: 'Stop all medications not approved for pregnancy — consult your doctor',
      },
    ],
  },
  {
    week: 5,
    trimester: 1,
    development: {
      he: 'העובר בגודל זרע שומשום — כ-0.2 ס"מ. הלב הפרימיטיבי מתחיל לפעום. צינור העצבים שיהפוך למוח ועמוד השדרה מתחיל להיסגר. בשלב זה ניתן לראות שק הגסטציה באולטרסאונד.',
      en: 'The embryo is the size of a sesame seed — about 0.2 cm. The primitive heart begins to beat. The neural tube that will become the brain and spinal cord begins to close. At this stage, the gestational sac can be seen on ultrasound.',
    },
    motherChanges: {
      he: 'בחילות בוקר (ועלולות להיות בכל שעה) עשויות להתחיל. עייפות קשה. רגישות מוגברת לריחות. שדיים כואבים ורגישים. ייתכן שתרגישי עצבנות ותנודות מצב רוח.',
      en: 'Morning sickness (which can occur at any hour) may begin. Severe fatigue. Heightened sensitivity to smells. Sore, tender breasts. You may feel irritable and experience mood swings.',
    },
    medicalTests: [
      {
        name: { he: 'בדיקת דם hCG וסטרוגן', en: 'Blood hCG and progesterone test' },
        isRequired: true,
        description: {
          he: 'בדיקת דם לאישור ההיריון ומדידת רמות hCG ופרוגסטרון',
          en: 'Blood test to confirm pregnancy and measure hCG and progesterone levels',
        },
      },
    ],
    tips: [
      {
        he: 'אכלי ארוחות קטנות ותכופות להפחתת בחילות',
        en: 'Eat small, frequent meals to reduce nausea',
      },
      {
        he: 'ביסקוויטים יבשים לפני קימה מהמיטה עוזרים לבחילות בוקר',
        en: 'Dry crackers before getting out of bed help with morning sickness',
      },
    ],
  },
  {
    week: 6,
    trimester: 1,
    development: {
      he: 'העובר בגודל אפונה — כ-0.6 ס"מ. הלב פועם כ-100-160 פעימות בדקה — ניתן לשמוע/לראות באולטרסאונד וגינלי. ניצני הגפיים (ידיים ורגליים) מתחילים להופיע. מוח, עיניים, אוזניים, ואף מתפתחים.',
      en: 'The embryo is the size of a pea — about 0.6 cm. The heart beats at about 100-160 beats per minute — can be seen/heard on vaginal ultrasound. Limb buds (arms and legs) begin to appear. Brain, eyes, ears, and nose are developing.',
    },
    motherChanges: {
      he: 'בחילות עלולות להשתפר או להחמיר. הרחם גדל ועלול לגרום לתכיפות במתן שתן. עייפות קשה ממשיכה. ייתכן שתרגישי כבדות בבטן התחתונה.',
      en: 'Nausea may improve or worsen. The uterus grows and may cause frequent urination. Severe fatigue continues. You may feel heaviness in the lower abdomen.',
    },
    medicalTests: [
      {
        name: { he: 'אולטרסאונד וגינלי ראשון', en: 'First vaginal ultrasound' },
        isRequired: true,
        description: {
          he: 'אישור היריון תוך-רחמי, שמיעת/ראיית דופק העובר, וידוא מספר העוברים',
          en: 'Confirmation of intrauterine pregnancy, seeing/hearing fetal heartbeat, confirming number of embryos',
        },
      },
    ],
    tips: [
      {
        he: 'שיחתי עם הרופאה על בחילות קשות — יש טיפול יעיל',
        en: 'Talk to your doctor about severe nausea — there are effective treatments',
      },
      {
        he: 'הימנעי מריחות חזקים שמחמירים את הבחילות',
        en: 'Avoid strong smells that worsen nausea',
      },
    ],
  },
  {
    week: 7,
    trimester: 1,
    development: {
      he: 'העובר בגודל אוכמנית — כ-1.0 ס"מ. המוח מתפתח במהירות. הפה, הלשון, והחיך מתחילים להתהוות. הידיים מתחילות לקבל צורה עם אצבעות. הכבד מתחיל לייצר תאי דם אדומים.',
      en: 'The embryo is the size of a blueberry — about 1.0 cm. The brain is developing rapidly. The mouth, tongue, and palate begin forming. Hands start taking shape with fingers. The liver begins producing red blood cells.',
    },
    motherChanges: {
      he: 'הבחילות לרוב בשיאן בשבוע זה. הגוף מייצר יותר דם לצורכי העובר. ייתכן שתשימי לב להתרחבות קלה של הבטן. ייתכנו כאבי ראש עקב שינויים הורמונליים.',
      en: 'Nausea is often at its peak this week. Your body is producing more blood for the embryo\'s needs. You may notice slight abdominal expansion. Headaches may occur due to hormonal changes.',
    },
    medicalTests: [],
    tips: [
      {
        he: 'שתי הרבה נוזלים — חשוב במיוחד אם את מקיאה',
        en: 'Drink plenty of fluids — especially important if you are vomiting',
      },
      {
        he: 'אם הבחילות מונעות ממך לאכול ולשתות — זה hyperemesis gravidarum ודורש טיפול',
        en: 'If nausea prevents eating and drinking — this is hyperemesis gravidarum and requires treatment',
      },
    ],
  },
  {
    week: 8,
    trimester: 1,
    development: {
      he: 'העובר בגודל פטל — כ-1.6 ס"מ. כל האיברים הגדולים קיימים בצורה בסיסית. האף, השפתיים, וקמטי העפעפיים מופיעים. האצבעות נפרדות. הזנב העוברי נעלם. העובר מתחיל לנוע, אם כי לא תרגישי זאת עדיין.',
      en: 'The embryo is the size of a raspberry — about 1.6 cm. All major organs exist in basic form. Nose, lips, and eyelid folds appear. Fingers separate. The embryonic tail disappears. The embryo starts moving, though you won\'t feel it yet.',
    },
    motherChanges: {
      he: 'ייתכן שבחילות מתחילות לשכך קצת. הרחם גדל לגודל תפוז. שדיים גדלים והאיאולות מכהות. ייתכנו עצירות ועוויתות עקב הפרוגסטרון.',
      en: 'Nausea may start subsiding slightly. The uterus has grown to the size of an orange. Breasts enlarge and areolas darken. Constipation and cramping may occur due to progesterone.',
    },
    medicalTests: [
      {
        name: { he: 'בדיקות דם שגרתיות', en: 'Routine blood tests' },
        isRequired: true,
        description: {
          he: 'ספירת דם מלאה, סוג דם ו-Rh, אדמת, CMV, טוקסופלסמה, הפטיטיס B ו-C, HIV, TSH, ברזל',
          en: 'Complete blood count, blood type and Rh, rubella, CMV, toxoplasmosis, Hepatitis B & C, HIV, TSH, iron',
        },
      },
      {
        name: { he: 'בדיקת שתן', en: 'Urinalysis' },
        isRequired: true,
        description: {
          he: 'בדיקת שתן לאיתור זיהומים, סוכר וחלבון',
          en: 'Urine test to detect infections, sugar and protein',
        },
      },
    ],
    tips: [
      {
        he: 'בחרי גינקולוג/ית או מיילדת שתרגישי בנוח איתה לאורך כל ההיריון',
        en: 'Choose an OB/GYN or midwife you feel comfortable with throughout the pregnancy',
      },
      {
        he: 'הירשמי לתכנית הריון בקופת החולים שלך — כוללת הטבות ומעקב',
        en: 'Register for the pregnancy package at your HMO — includes benefits and monitoring',
      },
    ],
  },
  {
    week: 9,
    trimester: 1,
    development: {
      he: 'העובר בגודל דובדבן — כ-2.3 ס"מ. מהשבוע הזה נקרא "עובר" ולא "עמבריו". כל האיברים נמצאים במקומם. שריר הלב מתחלק לארבעה תאים. שיניי חלב מתחילות להיווצר. ניתן לראות תנועות עדינות באולטרסאונד.',
      en: 'The embryo is the size of a cherry — about 2.3 cm. From this week it is called a "fetus" rather than an "embryo." All organs are in place. The heart muscle divides into four chambers. Baby teeth begin forming. Gentle movements can be seen on ultrasound.',
    },
    motherChanges: {
      he: 'ייתכן שתשימי לב לעלייה קלה במשקל. הרחם מתחיל לצאת מאגן. כאבי גב תחתון עלולים להתחיל. מצב הרוח יכול להיות משתנה.',
      en: 'You may notice a small weight gain. The uterus begins to rise above the pelvis. Lower back pain may start. Mood can be variable.',
    },
    medicalTests: [],
    tips: [
      {
        he: 'ביצועי פעילות גופנית קלה כמו הליכה או שחייה — מקלות על אי-נוחות',
        en: 'Light exercise like walking or swimming helps ease discomfort',
      },
      {
        he: 'דאגי לשינה מספקת — הגוף עובד קשה',
        en: 'Make sure to get enough sleep — your body is working hard',
      },
    ],
  },
  {
    week: 10,
    trimester: 1,
    development: {
      he: 'העובר בגודל תות — כ-3.1 ס"מ. השלד הסחוסי מתחיל להתקשות לעצם. הציפורניים מתחילות לצמוח. הגוף מתחיל לייצר שתן. השליה מפותחת ומספקת חמצן ומזון לעובר. מין העובר קיים אך עדיין לא ניתן לזיהוי.',
      en: 'The fetus is the size of a strawberry — about 3.1 cm. The cartilage skeleton begins hardening to bone. Fingernails start growing. The body begins producing urine. The placenta is developed and supplying oxygen and nutrients. The sex exists but is not yet identifiable.',
    },
    motherChanges: {
      he: 'גוף הרחם ממשיך לגדול. ייתכנו עוויתות ברצועות הרחם עם הגדילה. הבחילות עשויות להתחיל לשכך. כוח התיאבון עשוי לחזור בהדרגה.',
      en: 'The uterus continues to grow. Uterine ligament cramps may occur with growth. Nausea may begin to subside. Appetite may gradually return.',
    },
    medicalTests: [],
    tips: [
      {
        he: 'שוחח עם הרופאה על בדיקת NIPT (DNA חופשי) — מבצעים בשבועות 10-13',
        en: 'Talk to your doctor about NIPT (cell-free DNA test) — performed in weeks 10-13',
      },
    ],
  },
  {
    week: 11,
    trimester: 1,
    development: {
      he: 'העובר בגודל תאנה — כ-4.1 ס"מ. הראש עדיין גדול יחסית לגוף. אצבעות הידיים והרגליים נפרדות לחלוטין. האיברים הגניטלים מתפתחים. הכליות מתפקדות ומייצרות שתן שמופרש לנוזל האמניוטי.',
      en: 'The fetus is the size of a fig — about 4.1 cm. The head is still large relative to the body. Fingers and toes are fully separated. Genitals are developing. Kidneys are functioning and producing urine that is released into amniotic fluid.',
    },
    motherChanges: {
      he: 'הבחילות אמורות להתחיל להיעלם בשבועות הקרובים. ייתכן שתרגישי קצת יותר אנרגיה. הבטן מתחילה להיות גלויה לאט לאט. ייתכן שתשימי לב לשיפור בעור.',
      en: 'Nausea should start to disappear in coming weeks. You may feel a bit more energy. The belly is slowly becoming visible. You may notice skin improvement.',
    },
    medicalTests: [
      {
        name: { he: 'בדיקת שקיפות עורפית (NT)', en: 'Nuchal translucency (NT) scan' },
        isRequired: true,
        description: {
          he: 'אולטרסאונד למדידת שקיפות העורף — איתור סיכון לתסמונת דאון ומומים נוספים',
          en: 'Ultrasound to measure nuchal translucency — screening for Down syndrome and other conditions',
        },
      },
      {
        name: { he: 'סקר ראשון משולב', en: 'First trimester combined screening' },
        isRequired: true,
        description: {
          he: 'שילוב של NT + בדיקות דם (PAPP-A ו-free beta-hCG) לחישוב סיכון',
          en: 'Combination of NT + blood tests (PAPP-A and free beta-hCG) to calculate risk',
        },
      },
    ],
    tips: [
      {
        he: 'הסקר הראשון מבוצע בשבועות 11-13+6 — אל תאחרי',
        en: 'First trimester screening is done at weeks 11-13+6 — don\'t miss the window',
      },
    ],
  },
  {
    week: 12,
    trimester: 1,
    development: {
      he: 'העובר בגודל ליים — כ-5.4 ס"מ. סוף השליש הראשון מתקרב! הסיכון להפלה יורד משמעותית. כל האיברים הגדולים מפותחים. המעיים, שהיו בחבל הטבור, חוזרים לבטן. העובר יכול לבלוע ולמצוץ.',
      en: 'The fetus is the size of a lime — about 5.4 cm. The end of the first trimester is approaching! The risk of miscarriage drops significantly. All major organs are developed. The intestines, which were in the umbilical cord, return to the abdomen. The fetus can swallow and suck.',
    },
    motherChanges: {
      he: 'הבטן עשויה להיות גלויה אצל חלק מהנשים. הבחילות מתפוגגות אצל רוב הנשים. עלייה בחשק המיני אצל חלק. האנרגיה חוזרת. ייתכן שתשימי לב לשינויי עור (כתמי היריון/כמה אישה).',
      en: 'The belly may be visible in some women. Nausea subsides for most women. Increased libido in some. Energy returns. You may notice skin changes (pregnancy mask/chloasma).',
    },
    medicalTests: [
      {
        name: { he: 'בדיקת NIPT (DNA חופשי)', en: 'NIPT (cell-free DNA test)' },
        isRequired: false,
        description: {
          he: 'בדיקת דם מתקדמת לגילוי חריגות כרומוזומליות בדיוק גבוה — אופציונלי',
          en: 'Advanced blood test for high-accuracy chromosomal abnormality detection — optional',
        },
      },
    ],
    tips: [
      {
        he: 'שיחתי עם הרופאה על תוצאות הסקר הראשון',
        en: 'Discuss first trimester screening results with your doctor',
      },
      {
        he: 'זה זמן טוב לבשר להוריים ולמשפחה הקרובה',
        en: 'This is a good time to announce to parents and close family',
      },
    ],
  },
  {
    week: 13,
    trimester: 1,
    development: {
      he: 'העובר בגודל אפונת סוכר — כ-7.4 ס"מ. סוף השליש הראשון! הכבד, הכליות והטחול מתפקדים. טביעות אצבע נוצרות. השליה מתפקדת במלואה ומחליפה את הגופיף הצהוב. הסיכון להפלה ירד מאוד.',
      en: 'The fetus is the size of a snap pea — about 7.4 cm. End of the first trimester! Liver, kidneys, and spleen are functioning. Fingerprints are forming. The placenta is fully functional and replaces the corpus luteum. Miscarriage risk has greatly decreased.',
    },
    motherChanges: {
      he: 'ברוכה הבאה לשליש השני! אנרגיה חוזרת לרוב הנשים. הבטן מתחילה להיראות. ייתכנו דלקות חניכיים עקב שינויים הורמונליים — חשוב לגבור לרופא שיניים. ייתכנו נחירות.',
      en: 'Welcome to the second trimester! Energy returns for most women. The belly begins to show. Gum inflammation may occur due to hormonal changes — important to see a dentist. Snoring may begin.',
    },
    medicalTests: [],
    tips: [
      {
        he: 'עכשיו זמן טוב להודיע לכולם על ההיריון',
        en: 'Now is a good time to announce the pregnancy to everyone',
      },
      {
        he: 'הירשמי לקורס לידה מוקדם — קורסים פופולריים מתמלאים מהר',
        en: 'Register for a birth preparation course early — popular courses fill up fast',
      },
    ],
  },
  {
    week: 14,
    trimester: 2,
    development: {
      he: 'העובר בגודל לימון — כ-8.7 ס"מ, משקל ~43 גרם. העובר יכול לעקם את צוואר הרחם, להפנות את ראשו ולפהק. המעיים נעים לצמיתות לבטן. הפנים מקבלות מראה אנושי יותר. ניתן להבחין בין זכר לנקבה.',
      en: 'The fetus is the size of a lemon — about 8.7 cm, weight ~43 grams. The fetus can bend its neck, turn its head and yawn. Intestines permanently move into the abdomen. The face takes on a more human appearance. Sex differentiation is possible.',
    },
    motherChanges: {
      he: 'ברוכה הבאה לשליש השני — ה"ירח הדבש" של ההיריון! הבחילות ירדו, האנרגיה חזרה, ובטן יפה מתחילה להיראות. ייתכן שתרגישי מלאות בגוף. עלייה ברצון המיני שכיחה בשליש זה.',
      en: 'Welcome to the second trimester — the "honeymoon" of pregnancy! Nausea has subsided, energy has returned, and a beautiful belly begins to show. You may feel more bodily fullness. Increased libido is common in this trimester.',
    },
    medicalTests: [],
    tips: [
      {
        he: 'זה הזמן לתחיל לחפש בית חולים — בקרי בחדרי לידה שונים',
        en: 'This is the time to start researching hospitals — visit different delivery wards',
      },
      {
        he: 'התחילי לחשוב על שמות לתינוק!',
        en: 'Start thinking about baby names!',
      },
    ],
  },
  {
    week: 15,
    trimester: 2,
    development: {
      he: 'העובר בגודל תפוח — כ-10.1 ס"מ, משקל ~70 גרם. שיער דק (לנוגו) מכסה את הגוף. העובר שומע קולות ראשונים מבחוץ. גורמי קרישת הדם מתפתחים בכבד. הלב שואב כ-100 ליטר דם ביום.',
      en: 'The fetus is the size of an apple — about 10.1 cm, weight ~70 grams. Fine hair (lanugo) covers the body. The fetus begins hearing first sounds from outside. Blood clotting factors develop in the liver. The heart pumps about 100 liters of blood per day.',
    },
    motherChanges: {
      he: 'ייתכן שתרגישי את התנועות הראשונות של העובר (כמו פרפרים בבטן) — במיוחד אם זה לא ההיריון הראשון שלך. הבטן גדלה בבירור. ייתכנו כאבי גב עקב הגדלת הרחם.',
      en: 'You may feel the first fetal movements (like butterflies in the belly) — especially if this is not your first pregnancy. The belly is clearly growing. Back pain may occur due to uterine enlargement.',
    },
    medicalTests: [
      {
        name: { he: 'בדיקת AFP / סקר שני', en: 'AFP / Quad screen' },
        isRequired: false,
        description: {
          he: 'בדיקת דם לאיתור מומי עצב וספינה ביפידה וחריגות כרומוזומליות',
          en: 'Blood test to detect neural tube defects, spina bifida and chromosomal abnormalities',
        },
      },
    ],
    tips: [
      {
        he: 'שכבי על הצד השמאלי — משפר את זרימת הדם לשליה',
        en: 'Sleep on your left side — improves blood flow to the placenta',
      },
    ],
  },
  {
    week: 16,
    trimester: 2,
    development: {
      he: 'העובר בגודל אבוקדו — כ-11.6 ס"מ, משקל ~100 גרם. העיניים זזות מהצדדים לקדמת הפנים. האוזניים בעמדתן הסופית. מערכת העצבים מתחילה לשלוט בשרירים. העובר יכול לנוע ביותר תיאום.',
      en: 'The fetus is the size of an avocado — about 11.6 cm, weight ~100 grams. Eyes move from the sides to the front of the face. Ears are in their final position. The nervous system begins controlling muscles. The fetus can move with more coordination.',
    },
    motherChanges: {
      he: 'הבטן מוכרת ורואים בבירור שאת בהיריון. ייתכנו כאבי גב ומפשעה עם גדילת הרחם. הדם מגיע ל-125% מנפחו הרגיל. ייתכנו שמיעת דפיקות לב חזקות יותר.',
      en: 'The belly is recognizable and it\'s clearly visible you\'re pregnant. Back and groin pain may occur as the uterus grows. Blood volume reaches 125% of normal. You may notice stronger heartbeats.',
    },
    medicalTests: [
      {
        name: { he: 'בדיקת שתן לתרבית (URINE CULTURE)', en: 'Urine culture' },
        isRequired: true,
        description: {
          he: 'בדיקת שתן לאיתור חיידקים — זיהום שתן ללא תסמינים שכיח בהיריון',
          en: 'Urine culture to detect bacteria — asymptomatic UTI is common in pregnancy',
        },
      },
    ],
    tips: [
      {
        he: 'קני חזייה גדולה יותר — השדיים ממשיכים לגדול',
        en: 'Buy a larger bra — breasts continue to grow',
      },
      {
        he: 'התחילי לחפש עגלה וכיסא בטיחות — יש המתנה ארוכה על מוצרים פופולריים',
        en: 'Start looking for a stroller and car seat — popular products have long wait times',
      },
    ],
  },
  {
    week: 17,
    trimester: 2,
    development: {
      he: 'העובר בגודל צנון — כ-13 ס"מ, משקל ~140 גרם. שומן (ורניקס קאזיוזה) מתחיל להצטבר על עור העובר להגנה. מיאלין מתחיל להיווצר סביב עצבי המוח. העובר יכול להפנות ראשו לכיוון קולות.',
      en: 'The fetus is the size of a turnip — about 13 cm, weight ~140 grams. Fat (vernix caseosa) begins accumulating on the fetal skin for protection. Myelin begins forming around brain nerves. The fetus can turn its head toward sounds.',
    },
    motherChanges: {
      he: 'ייתכן שתרגישי לראשונה בעיטות ותנועות עובר. ייתכנו כאבי עצב הסיאטי עם גדילת הרחם. ייתכן שיש כבדות ברגליים ונפיחות.',
      en: 'You may feel kicks and fetal movements for the first time. Sciatic nerve pain may occur as the uterus grows. There may be heaviness in the legs and swelling.',
    },
    medicalTests: [],
    tips: [
      {
        he: 'אם מרגישה תנועות — שמרי מנטאלית מה השעה. תתחילי לשים לב לדפוס התנועות',
        en: 'If you feel movements — note the time mentally. Start paying attention to movement patterns',
      },
    ],
  },
  {
    week: 18,
    trimester: 2,
    development: {
      he: 'העובר בגודל פלפל — כ-14.2 ס"מ, משקל ~190 גרם. הגניטלים מפותחים דיו כדי לזהות מין בבירור באולטרסאונד. גרסה ראשונית של עצמות השמיעה מופיעה באוזן. הריאות מייצרות surfactant להכנה לנשימה.',
      en: 'The fetus is the size of a bell pepper — about 14.2 cm, weight ~190 grams. Genitals are developed enough to clearly identify sex on ultrasound. A primitive version of hearing bones appears in the ear. The lungs produce surfactant in preparation for breathing.',
    },
    motherChanges: {
      he: 'הגב יכול להתחיל לכאוב יותר. ייתכנו עוויתות ברגליים בלילה. ייתכן שתשימי לב לנזלת (rhinitis) של היריון עקב ריבוי דם.',
      en: 'The back may begin to hurt more. Leg cramps at night may occur. You may notice pregnancy rhinitis (stuffy nose) due to increased blood flow.',
    },
    medicalTests: [
      {
        name: { he: 'אולטרסאונד מורפולוגי (Level 2)', en: 'Morphology ultrasound (Level 2)' },
        isRequired: true,
        description: {
          he: 'הבדיקה החשובה ביותר! בדיקת כל האיברים: לב, מוח, עמוד שדרה, פנים, גפיים, שליה, כמות נוזל אמניוטי',
          en: 'The most important scan! Checking all organs: heart, brain, spine, face, limbs, placenta, amniotic fluid volume',
        },
      },
    ],
    tips: [
      {
        he: 'האולטרסאונד המורפולוגי הוא הבדיקה החשובה ביותר — אל תדחי אותה',
        en: 'The morphology ultrasound is the most important test — don\'t postpone it',
      },
      {
        he: 'ייתכן שתוכלי לדעת את מין התינוק בבדיקה זו אם תרצי',
        en: 'You may be able to find out the baby\'s sex during this scan if you wish',
      },
    ],
  },
  {
    week: 19,
    trimester: 2,
    development: {
      he: 'העובר בגודל עגבנייה — כ-15.3 ס"מ, משקל ~240 גרם. קליפת המוח מתפתחת עם קפלים ועמקים. חוש הטעם מתחיל להתפתח. הריסים מופיעים. שכבת הורניקס קאזיוזה מכסה את העור.',
      en: 'The fetus is the size of a tomato — about 15.3 cm, weight ~240 grams. The cerebral cortex develops with folds and furrows. The sense of taste begins developing. Eyelashes appear. The vernix caseosa layer covers the skin.',
    },
    motherChanges: {
      he: 'כל בוקר ובוקר יש לך בטן יפה יותר. כאבי ברצועות הרחם עם התרחבות שכיחים. ייתכן שתרגישי תנועות ברורות יותר.',
      en: 'Every morning your belly is more beautiful. Uterine ligament pain with expansion is common. You may feel clearer movements.',
    },
    medicalTests: [],
    tips: [
      {
        he: 'שימי לב לתנועות העובר — אמורות להיות ברורות יותר עם כל שבוע',
        en: 'Pay attention to fetal movements — should become clearer with each week',
      },
    ],
  },
  {
    week: 20,
    trimester: 2,
    development: {
      he: 'העובר בגודל בננה — כ-25.6 ס"מ, משקל ~300 גרם. אמצע ההיריון! העובר בולע נוזל אמניוטי ומייצר שתן. הריאות מתפתחות אך עדיין לא בשלות. הכסות הפנים מכוסה בשיער. המעיים מתחילים לצבור מקוניום (צואה ראשונה).',
      en: 'The fetus is the size of a banana — about 25.6 cm, weight ~300 grams. Halfway through pregnancy! The fetus swallows amniotic fluid and produces urine. The lungs are developing but not yet mature. The face is covered in hair. The intestines begin accumulating meconium (first stool).',
    },
    motherChanges: {
      he: 'חצי דרך! הרחם עכשיו בגובה הטבור. תנועות העובר ברורות ושכיחות. ייתכנו כאבי גב עקב שינוי מרכז הכובד. ייתכנו צרבות שכיחות.',
      en: 'Halfway there! The uterus is now at the level of the navel. Fetal movements are clear and frequent. Back pain may occur due to shifted center of gravity. Heartburn may be frequent.',
    },
    medicalTests: [
      {
        name: { he: 'אולטרסאונד מורפולוגי מלא (שבוע 18-22)', en: 'Full morphology ultrasound (weeks 18-22)' },
        isRequired: true,
        description: {
          he: 'בדיקה מקיפה של כל אברי העובר, מיקום השליה, כמות הנוזל האמניוטי',
          en: 'Comprehensive examination of all fetal organs, placenta location, amniotic fluid volume',
        },
      },
    ],
    tips: [
      {
        he: 'כבר חצי דרך! חגגי את הציון דרך הזה',
        en: 'Already halfway there! Celebrate this milestone',
      },
      {
        he: 'הירשמי לקורס לידה עכשיו אם עוד לא עשית',
        en: 'Register for a birth preparation course now if you haven\'t yet',
      },
    ],
  },
  {
    week: 21,
    trimester: 2,
    development: {
      he: 'העובר בגודל גזר — כ-26.7 ס"מ, משקל ~360 גרם. הטחול מגיע למלוא תפקודו. השרירים חזקים יותר. העובר מסוגל לשמוע את קולך בבירור. תנועות הידיים כוללות הגדלת חזיון ומגע בפנים.',
      en: 'The fetus is the size of a carrot — about 26.7 cm, weight ~360 grams. The spleen reaches full function. Muscles are stronger. The fetus can hear your voice clearly. Hand movements include increased grasping and touching the face.',
    },
    motherChanges: {
      he: 'הבטן ממשיכה לגדול. ייתכנו גרד על הבטן עם מתיחת העור. ייתכנו כאבי מפשעה (כאבי SPD) עם רגיעת המפרקים.',
      en: 'The belly continues to grow. Itching on the belly with skin stretching may occur. Groin pain (SPD pain) may occur as joints relax.',
    },
    medicalTests: [],
    tips: [
      {
        he: 'שימי שמן קוקוס או קרם למניעת פסי מתיחה על הבטן',
        en: 'Apply coconut oil or stretch mark cream on your belly',
      },
    ],
  },
  {
    week: 22,
    trimester: 2,
    development: {
      he: 'העובר בגודל פפאיה — כ-27.8 ס"מ, משקל ~430 גרם. קו ישרדות — מהשבוע 22 יש סיכוי הישרדות מחוץ לרחם. חישה של גסות בעור. הלב ניתן לשמיעה בסטטוסקופ רגיל. המוח מתפתח בקצב מהיר.',
      en: 'The fetus is the size of a papaya — about 27.8 cm, weight ~430 grams. Viability threshold — from week 22 there is a survival chance outside the womb. Touch sensation on skin develops. The heart can be heard with a regular stethoscope. The brain develops rapidly.',
    },
    motherChanges: {
      he: 'ייתכן שמפגשי עם כאבי גב כרוניים יותר. ייתכנו נפיחות ברגליים. שינוי פיגמנטציה ב"קו אלבה" שמופיע בבטן.',
      en: 'You may encounter more chronic back pain. Leg swelling may occur. Pigmentation change in the "linea alba" that appears on the belly.',
    },
    medicalTests: [],
    tips: [
      {
        he: 'שקלי שימוש בחגורת תמיכה לבטן — עוזרת לכאבי גב',
        en: 'Consider using a belly support belt — helps with back pain',
      },
    ],
  },
  {
    week: 23,
    trimester: 2,
    development: {
      he: 'העובר בגודל מנגו — כ-28.9 ס"מ, משקל ~501 גרם. ריאות מפתחות כלי דם. עור העובר עדיין שקוף ואדמדם. שינה ויקיצה מחזוריים מופיעים. אצבעות הרגליים מקבלות ציפורניים.',
      en: 'The fetus is the size of a mango — about 28.9 cm, weight ~501 grams. Lungs develop blood vessels. Fetal skin is still transparent and reddish. Sleep-wake cycles appear. Toenails develop.',
    },
    motherChanges: {
      he: 'ייתכן שמסיבות הורמונליות יש לך יותר שיער על הראש (פחות נשירה) אבל גם במקומות אחרים. ייתכנו חניכיים רגישות ודמומות.',
      en: 'Due to hormonal reasons, you may have more hair on your head (less loss) but also in other places. Sensitive and bleeding gums may occur.',
    },
    medicalTests: [],
    tips: [
      {
        he: 'בקרי אצל רופא שיניים — בדיקת שיניים מכוסה בביטוח בריאות בהיריון',
        en: 'Visit a dentist — dental checkup is covered by health insurance during pregnancy',
      },
    ],
  },
  {
    week: 24,
    trimester: 2,
    development: {
      he: 'העובר בגודל תירס — כ-30 ס"מ, משקל ~600 גרם. הריאות מתחילות לייצר surfactant — הכרחי לנשימה לאחר הלידה. קול בחלל הרחם נשמע בבירור. תגובת פחד ובהלה (Moro reflex) מתפתחת. העיניים נפתחות.',
      en: 'The fetus is the size of corn — about 30 cm, weight ~600 grams. Lungs begin producing surfactant — essential for breathing after birth. Sound in the uterine cavity is heard clearly. Startle (Moro) reflex develops. Eyes open.',
    },
    motherChanges: {
      he: 'ייתכנו צירי ברקסטון-היקס (צירים לא אמיתיים) — תחושת הדוקות בבטן שאינה כואבת. ייתכנו צרבות חזקות. ייתכנו קשיי שינה.',
      en: 'Braxton Hicks contractions (false labor) may occur — a tightening sensation in the belly that is not painful. Strong heartburn may occur. Sleep difficulties may arise.',
    },
    medicalTests: [
      {
        name: { he: 'בדיקת סוכרת הריון (GCT)', en: 'Gestational diabetes screening (GCT)' },
        isRequired: true,
        description: {
          he: 'שתיית ממס גלוקוז ובדיקת דם שעה לאחר מכן לאיתור סוכרת הריון',
          en: 'Drinking a glucose solution and blood test one hour later to screen for gestational diabetes',
        },
      },
      {
        name: { he: 'ספירת דם ורמת ברזל', en: 'CBC and iron levels' },
        isRequired: true,
        description: {
          he: 'בדיקת המוגלובין וסוגי דם לאיתור אנמיה של ההיריון',
          en: 'Hemoglobin and blood count to detect pregnancy anemia',
        },
      },
    ],
    tips: [
      {
        he: 'צירי ברקסטון-היקס הם נורמליים — אבל אם כואבים, דוויים, קצביים — פני לרופאה',
        en: 'Braxton Hicks contractions are normal — but if painful, regular or rhythmic — contact your doctor',
      },
    ],
  },
  {
    week: 25,
    trimester: 2,
    development: {
      he: 'העובר בגודל צנון לבן — כ-34.6 ס"מ, משקל ~660 גרם. השיער על הראש מאפיין יותר. כפות הידיים יכולות לאחוז. העובר מגיב לאור חזק שמכוון לבטן. דפוסי שינה/ערות יציבים יותר.',
      en: 'The fetus is the size of a rutabaga — about 34.6 cm, weight ~660 grams. Head hair becomes more characteristic. Palms can grasp. The fetus responds to bright light directed at the belly. Sleep/wake patterns are more stable.',
    },
    motherChanges: {
      he: 'קצב הלב שלך עלה מעט לשאת יותר דם. ייתכנו כאבים בצלעות עם גדילת הרחם. ייתכנו תחושות חוסר נשימה.',
      en: 'Your heart rate has increased slightly to carry more blood. Rib pain may occur as the uterus grows. Shortness of breath sensations may occur.',
    },
    medicalTests: [
      {
        name: { he: 'OGTT — בדיקת העמסת סוכר (אם GCT לא תקין)', en: 'OGTT — oral glucose tolerance test (if GCT abnormal)' },
        isRequired: false,
        description: {
          he: 'בדיקה מורחבת לאבחון סוכרת הריון — 3 שעות, שלוש בדיקות דם',
          en: 'Extended test to diagnose gestational diabetes — 3 hours, three blood draws',
        },
      },
    ],
    tips: [
      {
        he: 'הכיני תכנית לידה — כתבי את העדפותייך לגבי ניהול הלידה',
        en: 'Prepare a birth plan — write your preferences for labor management',
      },
    ],
  },
  {
    week: 26,
    trimester: 2,
    development: {
      he: 'העובר בגודל חסה — כ-35.6 ס"מ, משקל ~760 גרם. העיניים פתוחות לגמרי ומגיבות לאור. הריאות ממשיכות להתפתח. המוח מווסת טמפרטורת גוף. מערכת החיסון מבשילה.',
      en: 'The fetus is the size of a head of lettuce — about 35.6 cm, weight ~760 grams. Eyes are fully open and respond to light. Lungs continue developing. The brain regulates body temperature. The immune system matures.',
    },
    motherChanges: {
      he: 'ייתכנו נפיחות ברגליים בסוף היום — הרמת רגליים מקלה. ייתכנו קשיי שינה עם הבטן הגדלה.',
      en: 'Leg swelling at end of day may occur — elevating legs helps. Sleep difficulties with the growing belly may arise.',
    },
    medicalTests: [
      {
        name: { he: 'Anti-D (אם Rh שלילי)', en: 'Anti-D injection (if Rh negative)' },
        isRequired: false,
        description: {
          he: 'אם Rh שלילי — נדרשת זריקת אנטי-D בשבועות 28-29 להגנה',
          en: 'If Rh negative — Anti-D injection required at weeks 28-29 for protection',
        },
      },
    ],
    tips: [
      {
        he: 'הגישי טפסי ביטוח לאומי לחופשת לידה — לא יאוחר משבוע 26',
        en: 'Submit National Insurance maternity leave forms — no later than week 26',
      },
    ],
  },
  {
    week: 27,
    trimester: 2,
    development: {
      he: 'העובר בגודל כרובית — כ-36.6 ס"מ, משקל ~875 גרם. סוף השליש השני! הריאות מפותחות לרמה שבה יש סיכוי הישרדות גבוה מחוץ לרחם עם טיפול נמרץ. תגובת עיניים לאור חזקה. הופעת שיני חלב כמעט מוכנה.',
      en: 'The fetus is the size of a cauliflower — about 36.6 cm, weight ~875 grams. End of the second trimester! Lungs are developed to a level with high survival chance outside the womb with intensive care. Strong eye response to light. Baby teeth almost ready.',
    },
    motherChanges: {
      he: 'ייתכן שהתנועות חזקות יותר ויכולות לגרום אי-נוחות. ייתכנו כאבי צלעות עם גדילת הרחם.',
      en: 'Movements may be stronger and can cause discomfort. Rib pain may occur with uterine growth.',
    },
    medicalTests: [],
    tips: [
      {
        he: 'מזל טוב — מתחיל השליש השלישי! שלושת החודשים האחרונים',
        en: 'Congratulations — the third trimester is beginning! The final three months',
      },
    ],
  },
  {
    week: 28,
    trimester: 3,
    development: {
      he: 'העובר בגודל חציל — כ-37.6 ס"מ, משקל ~1005 גרם. ברוך הבא לשליש השלישי! שכבת שומן מתפתחת תחת העור לשמירת חום. הריאות יכולות לנשום אויר עם תמיכה. המוח מפתח קפלים ועמקים חדשים. העובר יכול לחלום.',
      en: 'The fetus is the size of an eggplant — about 37.6 cm, weight ~1005 grams. Welcome to the third trimester! A fat layer develops under the skin for warmth. The lungs can breathe air with support. The brain develops new folds and grooves. The fetus can dream.',
    },
    motherChanges: {
      he: 'ברוכה הבאה לשליש השלישי! ייתכן שתרגישי עייפות גדולה שוב. קשיי שינה נפוצים. ייתכן שהנשימה מתקצרת. הרחם גדל גבוה יותר.',
      en: 'Welcome to the third trimester! You may feel great fatigue again. Sleep difficulties are common. Breathing may shorten. The uterus grows higher.',
    },
    medicalTests: [
      {
        name: { he: 'ספירת בעיטות יומית', en: 'Daily kick counting' },
        isRequired: true,
        description: {
          he: 'מהשבוע 28 יש לספור תנועות עובר יומית — לפחות 10 תנועות תוך שעתיים',
          en: 'From week 28, count fetal movements daily — at least 10 movements in 2 hours',
        },
      },
      {
        name: { he: 'אולטרסאונד גדילה (שבוע 28-32)', en: 'Growth scan (weeks 28-32)' },
        isRequired: true,
        description: {
          he: 'בדיקת גדילת העובר, כמות נוזל אמניוטי ותפקוד השליה',
          en: 'Check fetal growth, amniotic fluid volume and placental function',
        },
      },
      {
        name: { he: 'Anti-D (אם Rh שלילי)', en: 'Anti-D injection (if Rh negative)' },
        isRequired: false,
        description: {
          he: 'זריקת אנטי-D לנשים עם Rh שלילי',
          en: 'Anti-D injection for Rh-negative women',
        },
      },
    ],
    tips: [
      {
        he: 'התחילי לספור בעיטות יומית מהשבוע הזה — הכי טוב בשעות קבועות',
        en: 'Start counting kicks daily from this week — best at consistent hours',
      },
      {
        he: 'אם פחות מ-10 תנועות ב-2 שעות — פני מיד לרופאה',
        en: 'If fewer than 10 movements in 2 hours — contact your doctor immediately',
      },
    ],
  },
  {
    week: 29,
    trimester: 3,
    development: {
      he: 'העובר בגודל דלעת — כ-38.6 ס"מ, משקל ~1153 גרם. תאי שריר ועצם ממשיכים לצמוח. הראש מתגלגל כלפי מטה בהדרגה. ריאות מאוחרות. שכבת שומן גדלה. עור הופך פחות שקוף.',
      en: 'The fetus is the size of a butternut squash — about 38.6 cm, weight ~1153 grams. Muscle and bone cells continue growing. The head gradually turns downward. Lungs mature. Fat layer grows. Skin becomes less transparent.',
    },
    motherChanges: {
      he: 'הרחם גדל עד גובה 7.5 ס"מ מעל הטבור. ייתכנו כאבי גב שמקרינים לרגל (סיאטיקה). ייתכן שתזיעי יותר. ייתכנו בצקות בידיים ורגליים.',
      en: 'The uterus grows to 7.5 cm above the navel. Back pain radiating to the leg (sciatica) may occur. You may sweat more. Swelling in hands and feet may occur.',
    },
    medicalTests: [],
    tips: [
      {
        he: 'הכיני תיק בית חולים — אפשר להתחיל לארוז',
        en: 'Start preparing the hospital bag — you can begin packing',
      },
    ],
  },
  {
    week: 30,
    trimester: 3,
    development: {
      he: 'העובר בגודל כרוב — כ-39.9 ס"מ, משקל ~1319 גרם. המוח מתפתח בקצב אדיר. נוזל אמניוטי מגיע לנפח מקסימלי. שרירי הנשימה מתאמנים. העובר מוציא ו"שואב" נוזל אמניוטי. האצבעות מגרדות כמו ציפורניים.',
      en: 'The fetus is the size of a cabbage — about 39.9 cm, weight ~1319 grams. The brain develops at an amazing rate. Amniotic fluid reaches maximum volume. Breathing muscles practice. The fetus exhales and "inhales" amniotic fluid. Fingers scratch with developing nails.',
    },
    motherChanges: {
      he: 'ייתכנו קשיי נשימה עם לחץ הרחם על הסרעפת. נשימה עמוקה עוזרת. ייתכן שתשתיני בכל שמיעת קול, צחוק או כיסה (שקבת שתן — נורמלי).',
      en: 'Breathing difficulties may occur with uterine pressure on the diaphragm. Deep breathing helps. You may urinate with laughter, coughing or sneezing (stress incontinence — normal).',
    },
    medicalTests: [
      {
        name: { he: 'אולטרסאונד גדילה', en: 'Growth scan' },
        isRequired: true,
        description: {
          he: 'מעקב אחר גדילת העובר ותפקוד השליה בשליש השלישי',
          en: 'Monitoring fetal growth and placental function in the third trimester',
        },
      },
    ],
    tips: [
      {
        he: 'שוחח עם הרופאה על מיקום העובר — האם הוא/היא כבר בתצוגת ראש',
        en: 'Talk to your doctor about fetal position — is the baby already head-down',
      },
    ],
  },
  {
    week: 31,
    trimester: 3,
    development: {
      he: 'העובר בגודל קוקוס — כ-41.1 ס"מ, משקל ~1502 גרם. הריאות כמעט בשלות. תאי עצב מתחברים ליצירת קשרים מורכבים. שמיעה מפותחת לגמרי. העובר מזהה קולות ומגיב בתנועה. חינוך בזמן ההיריון — מוזיקה ושירה מגיעות לעובר.',
      en: 'The fetus is the size of a coconut — about 41.1 cm, weight ~1502 grams. Lungs are nearly mature. Nerve cells connect to form complex networks. Hearing is fully developed. The fetus recognizes voices and responds with movement. Prenatal education — music and singing reach the fetus.',
    },
    motherChanges: {
      he: 'ייתכנו בצקות בגפיים. ייתכנו כאבי קרפל (תסמונת הכף יד). ייתכנו שרירי עגולים בשני צדי הבטן.',
      en: 'Swelling in limbs may occur. Carpal tunnel syndrome may occur. Round ligament pain may occur on both sides of the belly.',
    },
    medicalTests: [],
    tips: [
      {
        he: 'שירי ודברי לתינוק — הוא/היא שומע/ת אותך',
        en: 'Sing and talk to the baby — they can hear you',
      },
      {
        he: 'הרכיבי כיסא בטיחות ובדקי שהוא מותקן נכון',
        en: 'Install the car seat and make sure it is properly installed',
      },
    ],
  },
  {
    week: 32,
    trimester: 3,
    development: {
      he: 'העובר בגודל ג׳יקמה — כ-42.4 ס"מ, משקל ~1702 גרם. העובר מתאמן לנשימה עצמאית. האיברים הפנימיים בשלים כמעט לחלוטין. שכבות שומן נוספות. גדילה מהירה. ייתכן שהעובר מאוד פעיל.',
      en: 'The fetus is the size of a jicama — about 42.4 cm, weight ~1702 grams. The fetus practices independent breathing. Internal organs are almost fully mature. Additional fat layers. Rapid growth. The fetus may be very active.',
    },
    motherChanges: {
      he: 'ייתכן שתרגישי כאב בחלק העליון של הבטן. נפיחות ברגליים בסוף יום. אם הנפיחות מלווה בכאב ראש חזק ובעיות ראייה — פני מיד לרופאה (עלולה להיות פרה-אקלמפסיה).',
      en: 'You may feel pain in the upper abdomen. Leg swelling at end of day. If swelling is accompanied by severe headache and vision problems — contact your doctor immediately (may be pre-eclampsia).',
    },
    medicalTests: [
      {
        name: { he: 'אולטרסאונד גדילה (שבוע 30-32)', en: 'Growth scan (weeks 30-32)' },
        isRequired: true,
        description: {
          he: 'בדיקת גדילת העובר, מיקום ותפקוד שליה, כמות נוזל אמניוטי',
          en: 'Check fetal growth, placental position and function, amniotic fluid volume',
        },
      },
    ],
    tips: [
      {
        he: 'חשוב לדעת סימנים מדאיגים שדורשים פנייה לרופאה: דימום, נוזל, כאבים קשים, ירידה בתנועות',
        en: 'Important to know warning signs requiring doctor contact: bleeding, fluid, severe pain, decreased movements',
      },
    ],
  },
  {
    week: 33,
    trimester: 3,
    development: {
      he: 'העובר בגודל אננס — כ-43.7 ס"מ, משקל ~1918 גרם. הגולגולת עדיין רכה וגמישה — תאפשר מעבר דרך תעלת הלידה. ריאות כמעט בשלות לגמרי. שכבת שומן נוספת שמעגלת את המראה.',
      en: 'The fetus is the size of a pineapple — about 43.7 cm, weight ~1918 grams. The skull is still soft and flexible — will allow passage through the birth canal. Lungs nearly fully mature. Additional fat layer rounds out the appearance.',
    },
    motherChanges: {
      he: 'ייתכנו קשיי שינה עם הבטן הגדולה. כריות מיוחדות להיריון עוזרות. ייתכנו עוויתות ברגליים בלילה — מגנזיום ומתיחות עוזרות.',
      en: 'Sleep difficulties with the large belly may occur. Special pregnancy pillows help. Leg cramps at night may occur — magnesium and stretching help.',
    },
    medicalTests: [],
    tips: [
      {
        he: 'קני כרית היריון בצורת U — משפרת שינה משמעותית',
        en: 'Buy a U-shaped pregnancy pillow — significantly improves sleep',
      },
    ],
  },
  {
    week: 34,
    trimester: 3,
    development: {
      he: 'העובר בגודל מלון קנטלופ — כ-45 ס"מ, משקל ~2146 גרם. מרבית התינוקות שנולדים בשבוע זה שורדים ללא בעיות גדולות. החישה בעור עדינה ומפותחת. העינוניים של הלחי מלאים. ציפורניים מגיעות לקצות האצבעות.',
      en: 'The fetus is the size of a cantaloupe — about 45 cm, weight ~2146 grams. Most babies born in this week survive without major issues. Touch sensation in skin is fine and developed. Cheek dimples are full. Fingernails reach fingertips.',
    },
    motherChanges: {
      he: 'ייתכן שתשימי לב שהבטן ירדה קצת (אם זהו הריון ראשון). ייתכנו תנועות חזקות מאוד מהעובר — לפעמים מכאיבות.',
      en: 'You may notice the belly has dropped a little (if this is your first pregnancy). Very strong movements from the fetus may occur — sometimes painful.',
    },
    medicalTests: [],
    tips: [
      {
        he: 'התחילי עיסוי פרינאום — עיסוי יומי של 5 דקות מהשבוע 34 מפחית קרעים בלידה',
        en: 'Start perineal massage — daily 5-minute massage from week 34 reduces tearing in birth',
      },
    ],
  },
  {
    week: 35,
    trimester: 3,
    development: {
      he: 'העובר בגודל מלון ירוק — כ-46.2 ס"מ, משקל ~2383 גרם. הכליות בשלות. כבד בשל. ציפורניים ארוכות. מבנה הגוף הוא שהולך ומתעגל. לנוגו (שיער גוף) מתחיל לנשור. מיקום ראש למטה צפוי.',
      en: 'The fetus is the size of a honeydew melon — about 46.2 cm, weight ~2383 grams. Kidneys are mature. Liver is mature. Long fingernails. Body structure increasingly rounded. Lanugo (body hair) begins shedding. Head-down position expected.',
    },
    motherChanges: {
      he: 'ייתכן שתרגישי יותר "צורך" ולחץ על האגן עם ירידת הראש. ייתכן שתשתיני בכל עיטוש.',
      en: 'You may feel more "urge" and pressure on the pelvis as the head drops. You may urinate with every sneeze.',
    },
    medicalTests: [
      {
        name: { he: 'בדיקת GBS (סטרפטוקוק קבוצה B)', en: 'GBS (Group B Strep) test' },
        isRequired: true,
        description: {
          he: 'תרבית נרתיק/פי הטבעת לאיתור GBS — קיום חיידק זה דורש אנטיביוטיקה בלידה',
          en: 'Vaginal/rectal swab for GBS — presence of this bacteria requires antibiotics during labor',
        },
      },
      {
        name: { he: 'NST — מוניטור לא לחצי', en: 'NST — non-stress test' },
        isRequired: true,
        description: {
          he: 'מוניטור מעקב דופק עובר לוידוא רווחת העובר',
          en: 'Fetal heart rate monitoring to verify fetal wellbeing',
        },
      },
    ],
    tips: [
      {
        he: 'ודאי שתיק בית החולים מוכן — לידה יכולה להתחיל בכל רגע מהשבוע 37',
        en: 'Make sure the hospital bag is ready — labor can start any time from week 37',
      },
    ],
  },
  {
    week: 36,
    trimester: 3,
    development: {
      he: 'העובר בגודל ראש חסה רומאי — כ-47.4 ס"מ, משקל ~2622 גרם. שבוע 36 נחשב "כמעט מלא". הריאות מוכנות לנשימה. מוח ועצבים מפותחים מאוד. שכבת השומן מלאה. כמות הנוזל האמניוטי מתחילה לרדת.',
      en: 'The fetus is the size of a head of romaine lettuce — about 47.4 cm, weight ~2622 grams. Week 36 is considered "nearly term". Lungs are ready for breathing. Brain and nerves are highly developed. Fat layer is full. Amniotic fluid volume begins to decrease.',
    },
    motherChanges: {
      he: 'ייתכן שתרגישי "ירידה" ברחמן — הבטן ירדה קצת ויותר קל לנשום. ייתכן שתלכי לשירותים לעתים קרובות יותר. ייתכן שתרגישי לחץ על האגן.',
      en: 'You may feel a "drop" — the belly has dropped a bit and breathing is easier. You may go to the bathroom more often. You may feel pelvic pressure.',
    },
    medicalTests: [
      {
        name: { he: 'NST שבועי', en: 'Weekly NST' },
        isRequired: true,
        description: {
          he: 'מוניטור שבועי לוידוא רווחת העובר עד הלידה',
          en: 'Weekly monitoring to verify fetal wellbeing until birth',
        },
      },
      {
        name: { he: 'בדיקה גינקולוגית', en: 'Gynecological examination' },
        isRequired: true,
        description: {
          he: 'בדיקת צוואר הרחם — האם פתוח ורך, מיקום העובר',
          en: 'Cervical examination — whether open and soft, fetal position',
        },
      },
    ],
    tips: [
      {
        he: 'ארגני עזרה לאחר הלידה — משפחה, דולה, אחות לילה',
        en: 'Organize post-birth help — family, doula, night nurse',
      },
      {
        he: 'ודאי שכיסא בטיחות מותקן נכון ברכב',
        en: 'Make sure the car seat is properly installed in the car',
      },
    ],
  },
  {
    week: 37,
    trimester: 3,
    development: {
      he: 'העובר בגודל מנגולד — כ-48.6 ס"מ, משקל ~2859 גרם. מלא-לידה! מהשבוע הזה הלידה נחשבת "בזמן". הריאות בשלות לגמרי. מוח מוכן לחיים מחוץ לרחם. ציפורניים ארוכות. שיער על הראש ייתכן שיהיה בשפע.',
      en: 'The fetus is the size of a Swiss chard bunch — about 48.6 cm, weight ~2859 grams. Full term! From this week birth is considered "on time." Lungs fully mature. Brain ready for life outside the womb. Long fingernails. Head hair may be abundant.',
    },
    motherChanges: {
      he: 'ברוכה הבאה לשבוע 37 — הריון מלא! ייתכן שתרגישי "דחיפה" ורצון לסדר את הבית (instinct קינון). ייתכנו שינויים בצוואר הרחם. אם הקרום נפסק — פני מיד לבית החולים.',
      en: 'Welcome to week 37 — full term! You may feel an urge to nest and organize the house. Cervical changes may occur. If membranes rupture — go to the hospital immediately.',
    },
    medicalTests: [
      {
        name: { he: 'NST שבועי + בדיקה גינקולוגית', en: 'Weekly NST + gynecological exam' },
        isRequired: true,
        description: {
          he: 'מוניטור שבועי ובדיקת מיקום ותנוחת עובר, בדיקת צוואר',
          en: 'Weekly monitoring and checking fetal position and presentation, cervical exam',
        },
      },
    ],
    tips: [
      {
        he: 'סימנים לאשפוז מיידי: צירים קצביים כל 5 דקות, קרום שנפסק, ירידה בתנועות, דימום',
        en: 'Signs for immediate hospitalization: rhythmic contractions every 5 minutes, ruptured membranes, decreased movements, bleeding',
      },
    ],
  },
  {
    week: 38,
    trimester: 3,
    development: {
      he: 'העובר בגודל כרישה — כ-49.8 ס"מ, משקל ~3083 גרם. העובר מוכן לחלוטין לחיים מחוץ לרחם. ורניקס קאזיוזה (שכבת גבינה לבנה) עשויה לכסות את גוף התינוק. אחיזת היד חזקה. חוש הריח מפותח.',
      en: 'The fetus is the size of a leek — about 49.8 cm, weight ~3083 grams. The fetus is completely ready for life outside the womb. Vernix caseosa (white cheese-like layer) may cover the baby\'s body. Hand grip is strong. Sense of smell is developed.',
    },
    motherChanges: {
      he: 'הגוף מתכונן ללידה — צוואר הרחם מתרכך ומתקצר. ייתכנו הפרשות מוגברות. ייתכנו "plugs" ריריים (אין לדאוג). ייתכנו כאבי גב חזקים יותר.',
      en: 'The body prepares for labor — the cervix softens and shortens. Increased discharge may occur. Mucous plugs may be seen (nothing to worry about). Stronger back pain may occur.',
    },
    medicalTests: [
      {
        name: { he: 'NST שבועי', en: 'Weekly NST' },
        isRequired: true,
        description: {
          he: 'מוניטור שבועי לוידוא רווחת העובר',
          en: 'Weekly monitoring to verify fetal wellbeing',
        },
      },
    ],
    tips: [
      {
        he: 'בצעי פעילות גופנית קלה ושחייה — עוזרת לירידת הראש ולפתיחת האגן',
        en: 'Do light exercise and swimming — helps the head drop and pelvis open',
      },
    ],
  },
  {
    week: 39,
    trimester: 3,
    development: {
      he: 'העובר בגודל אבטיח קטן — כ-50.7 ס"מ, משקל ~3288 גרם. הריאות ממשיכות לבשול עד הרגע האחרון. מוח ומערכת העצבים בשלים. הגוף מייצר ורניקס ושיער לנוגו שיסייעו בלידה. כמות הנוזל האמניוטי ממשיכה לרדת.',
      en: 'The fetus is the size of a small watermelon — about 50.7 cm, weight ~3288 grams. Lungs continue maturing until the last moment. Brain and nervous system mature. The body produces vernix and lanugo that will help during birth. Amniotic fluid volume continues to decrease.',
    },
    motherChanges: {
      he: 'הגוף מוכן מאוד ללידה. ייתכן שתרגישי ל"זה". סמין שמאפשרים לאמא לדעת שהלידה קרובה: "הופטחות" פלאג ריר, צירים קצביים, ירידת מים.',
      en: 'The body is very ready for labor. You may feel like "it\'s time." Signs that allow mom to know birth is near: mucous plug loss, rhythmic contractions, water breaking.',
    },
    medicalTests: [
      {
        name: { he: 'NST שבועי + אולטרסאונד', en: 'Weekly NST + ultrasound' },
        isRequired: true,
        description: {
          he: 'מוניטור שבועי ובדיקת כמות הנוזל האמניוטי',
          en: 'Weekly monitoring and checking amniotic fluid volume',
        },
      },
    ],
    tips: [
      {
        he: 'שימי לב לסימני לידה: צירים קצביים, קרום שנפסד, ירידה בתנועות, דימום',
        en: 'Watch for signs of labor: rhythmic contractions, ruptured membranes, decreased movements, bleeding',
      },
      {
        he: 'הכיני את כל הניירת הנדרשת לבית חולים',
        en: 'Prepare all paperwork needed for the hospital',
      },
    ],
  },
  {
    week: 40,
    trimester: 3,
    development: {
      he: 'העובר בגודל אבטיח — כ-51.2 ס"מ, משקל ~3462 גרם. תאריך הלידה המחושב! רוב התינוקות נולדים בין שבוע 38-42. התינוק מוכן לחלוטין. עור ורוד ומלא. ציפורניים ארוכות. עיניים פקוחות. הגוף מוכן לנשום, לינוק ולהסתגל לחיים מחוץ לרחם.',
      en: 'The fetus is the size of a watermelon — about 51.2 cm, weight ~3462 grams. The calculated due date! Most babies are born between weeks 38-42. The baby is completely ready. Pink and full skin. Long fingernails. Open eyes. The body is ready to breathe, nurse and adapt to life outside the womb.',
    },
    motherChanges: {
      he: 'תאריך הלידה המחושב! אם עדיין לא ילדת — זה בסדר גמור. רק 5% מהתינוקות נולדים ביום המדויק. הגוף שלך ותינוקך ידעו מתי הזמן הנכון.',
      en: 'The calculated due date! If you haven\'t given birth yet — that\'s completely okay. Only 5% of babies are born on the exact day. Your body and baby will know when the time is right.',
    },
    medicalTests: [
      {
        name: { he: 'NST שבועי ומוניטור רצוף אם לא ילדת', en: 'Weekly NST and continuous monitoring if not yet delivered' },
        isRequired: true,
        description: {
          he: 'מעקב הדוק יותר לאחר תאריך הלידה המחושב',
          en: 'Closer monitoring after the calculated due date',
        },
      },
    ],
    tips: [
      {
        he: 'אם עברת שבוע 41 ללא לידה, הרופאה תדון איתך על אפשרויות כולל השראת לידה',
        en: 'If you pass week 41 without giving birth, the doctor will discuss options including labor induction',
      },
      {
        he: 'כל לידה היא ייחודית — בטחי בגופך ובצוות הרפואי שלך',
        en: 'Every birth is unique — trust your body and medical team',
      },
    ],
  },
];

export function getWeekData(week: number): WeekData | undefined {
  return weeklyData.find((w) => w.week === week);
}

export function getWeeksForTrimester(trimester: 1 | 2 | 3): WeekData[] {
  return weeklyData.filter((w) => w.trimester === trimester);
}
