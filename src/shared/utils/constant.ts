// All constants are here

import {appImages} from '../assets';
import {HAJJ_GUIDE, PRE_UMRAH, SAFETY_GUIDE, UMRAH_CHECKLIST} from './enums';

export const UMRAH_DATA = [
  {
    id: '1',
    heading: 'Pre-Umrah Preparation',
    subheading: 'Pack, plan, and prepare for a smooth journey.',
    backgroundImage: appImages.umrahOne,
    apiKey: PRE_UMRAH,
  },
  {
    id: '2',
    heading: 'Step-by-Step Hajj Guide',
    subheading: 'Follow each step with confidence.',
    backgroundImage: appImages.umrahTwo,
    apiKey: HAJJ_GUIDE,
  },
  {
    id: '3',
    heading: 'Hajj & Umrah Checklist',
    subheading: 'Never forget an essential step or item.',
    backgroundImage: appImages.umrahThree,
    apiKey: UMRAH_CHECKLIST,
  },
  {
    id: '4',
    heading: 'Health & Safety Guide',
    subheading: 'Stay healthy throughout your journey.',
    backgroundImage: appImages.umrahFour,
    apiKey: SAFETY_GUIDE,
  },
];

export const DUA_DATA = [
  {
    id: 1,
    title: 'Dua for drinking Zamzam',
    arabic: 'اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً',
    transliteration:
      "Allahumma inni as'aluka ilman naafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbalan.",
    translation:
      '"O Allah, I ask You for beneficial knowledge, pure sustenance, and accepted deeds."',
    description: 'Seeking Purity and Blessings',
    additionalInfo:
      'Drinking Zamzam water with a sincere intention allows believers to seek spiritual elevation, knowledge, and physical well-being, as it is known for its healing properties.',
  },
  {
    id: 2,
    title: 'During tawaf',
    arabic: 'اللهم اجعل هذا البيت آمناً مطمئناً وسائر بلاد المسلمين',
    transliteration:
      "Allahumma aj'al hadha al-bayta aamanan mutma'innan wa saair bilaadil-muslimeen.",
    translation:
      '"O Allah, make this House a place of security and peace, and grant the same for all Muslim lands."',
    description: 'Prayer for Protection',
    additionalInfo:
      'This dua is often recited while performing Tawaf, asking Allah to maintain the sanctity and security of the Kaaba and grant peace to the entire Muslim Ummah.',
  },
  {
    id: 3,
    title: 'Dua for Repentance',
    arabic:
      'رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنتَ التَّوَّابُ الرَّحِيمُ',
    transliteration:
      'Rabbi ighfir li wa tub alayya innaka anta at-tawwab ar-raheem.',
    translation:
      '"My Lord, forgive me and accept my repentance. Indeed, You are the Accepting of Repentance, the Merciful."',
    description: 'Seeking Forgiveness',
    additionalInfo:
      'This powerful supplication allows one to repent sincerely and seek Allah’s mercy, as He is the Most Forgiving and Most Merciful.',
  },
  {
    id: 4,
    title: 'Dua for Anxiety & Stress',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ',
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan.",
    translation: '"O Allah, I seek refuge in You from anxiety and grief."',
    description: 'Relief from Worries',
    additionalInfo:
      'This dua is a powerful means of seeking relief from stress, anxiety, and sadness by placing trust in Allah’s wisdom and mercy.',
  },
  {
    id: 5,
    title: 'Dua Before Starting a Journey',
    arabic:
      'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ',
    transliteration:
      'Subhanalladhi sakhkhara lana hadha wama kunna lahu muqrineen.',
    translation:
      '"Glory be to the One who has placed this (transport) at our service, and we were not capable of doing so (ourselves)."',
    description: 'Travel Supplication',
    additionalInfo:
      'This supplication is recited before embarking on a journey to seek Allah’s protection and ease during travel.',
  },
  {
    id: 6,
    title: 'Duas for Ramadan & Laylatul Qadr',
    arabic: 'اللهم إنك عفو كريم تحب العفو فاعف عني',
    transliteration:
      'Allahumma innaka ‘afuwwun kareemun tuhibbul ‘afwa fa‘fu ‘anni.',
    translation:
      '"O Allah, You are Most Forgiving, Generous, and love to forgive, so forgive me."',
    description: 'Prayer for Forgiveness in Ramadan',
    additionalInfo:
      'This dua is highly recommended during the last ten nights of Ramadan, especially on Laylatul Qadr, as a means to seek Allah’s pardon and mercy.',
  },
  {
    id: 7,
    title: 'Duas for Stoning (Ramy al-Jamarat)',
    arabic: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar, Allahu Akbar, Allahu Akbar.',
    translation:
      '"Allah is the Greatest, Allah is the Greatest, Allah is the Greatest."',
    description: 'Supplication during Stoning',
    additionalInfo:
      'This is recited while performing Ramy al-Jamarat during Hajj, symbolizing rejection of evil and submission to Allah.',
  },
  {
    id: 8,
    title: 'Seeking Forgiveness (Istighfar)',
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullaha wa atubu ilayh.',
    translation:
      '"I seek forgiveness from Allah and turn to Him in repentance."',
    description: 'Continuous Repentance',
    additionalInfo:
      'This simple but powerful dua should be recited frequently, as seeking forgiveness brings peace and closeness to Allah.',
  },
  {
    id: 9,
    title: "Dua for Allah's Mercy & Guidance",
    arabic: 'رَبِّ إِنِّي لِمَا أَنْزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',
    transliteration: 'Rabbi inni lima anzalta ilayya min khayrin faqir.',
    translation:
      '"My Lord, indeed I am in need of whatever good You bestow upon me."',
    description: 'Seeking Allah’s Mercy',
    additionalInfo:
      'This dua was recited by Prophet Musa (AS) when he was in need, teaching us to turn to Allah in moments of distress.',
  },
  {
    id: 10,
    title: 'Dua for Safety While Traveling',
    arabic:
      'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى',
    transliteration:
      "Allahumma inna nas'aluka fi safarina hadha al-birra wat-taqwa.",
    translation:
      '"O Allah, we ask You for righteousness and piety in this journey."',
    description: 'Travel Protection Prayer',
    additionalInfo:
      'This dua is recited before travel, asking for safety, protection, and a blessed journey.',
  },
  {
    id: 11,
    title: 'Dua for Halal Provision & Wealth',
    arabic: 'اللهم ارزقني رزقاً حلالاً طيباً',
    transliteration: 'Allahumma urzuqni rizqan halalan tayyiban.',
    translation: '"O Allah, grant me lawful and pure sustenance."',
    description: 'Supplication for Sustenance',
    additionalInfo:
      'Reciting this dua consistently can bring blessings and increase in halal provisions by the will of Allah.',
  },
];

export const COUNTRY_LANGUAGES = [
  {id: '1', name: 'English', code: 'en', selected: false, isRTL: false},
  {id: '2', name: 'عربي', code: 'ar', selected: false, isRTL: true},
  {id: '3', name: 'Español', code: 'es', selected: false, isRTL: false},
  {id: '4', name: 'اردو', code: 'ur', selected: false, isRTL: true},
  {id: '5', name: 'Français', code: 'fr', selected: false, isRTL: false},
  {id: '6', name: '中文', code: 'zh', selected: false, isRTL: false},
  {id: '7', name: 'हिन्दी', code: 'hi', selected: false, isRTL: false},
  {id: '8', name: 'Português', code: 'pt', selected: false, isRTL: false},
  {id: '9', name: 'Русский', code: 'ru', selected: false, isRTL: false},
  {id: '10', name: 'বাংলা', code: 'bn', selected: false, isRTL: false},
  {id: '11', name: '日本語', code: 'ja', selected: false, isRTL: false},
  {id: '12', name: 'Deutsch', code: 'de', selected: false, isRTL: false},
  {id: '13', name: '한국어', code: 'ko', selected: false, isRTL: false},
  {id: '14', name: 'Italiano', code: 'it', selected: false, isRTL: false},
  {id: '15', name: 'Türkçe', code: 'tr', selected: false, isRTL: false},
  {id: '16', name: 'فارسی', code: 'fa', selected: false, isRTL: true},
  {id: '17', name: 'Polski', code: 'pl', selected: false, isRTL: false},
  {id: '18', name: 'Українська', code: 'uk', selected: false, isRTL: false},
  {id: '19', name: 'Nederlands', code: 'nl', selected: false, isRTL: false},
  {id: '20', name: 'Ελληνικά', code: 'el', selected: false, isRTL: false},
  {id: '21', name: 'עברית', code: 'he', selected: false, isRTL: true},
  {id: '22', name: 'Thai', code: 'th', selected: false, isRTL: false},
  {id: '23', name: 'Gujarati', code: 'gu', selected: false, isRTL: false},
  {id: '24', name: 'Marathi', code: 'mr', selected: false, isRTL: false},
  {id: '25', name: 'Tamil', code: 'ta', selected: false, isRTL: false},
  {id: '26', name: 'Telugu', code: 'te', selected: false, isRTL: false},
  {id: '27', name: 'Malay', code: 'ms', selected: false, isRTL: false},
  {id: '28', name: 'Swedish', code: 'sv', selected: false, isRTL: false},
  {id: '29', name: 'Czech', code: 'cs', selected: false, isRTL: false},
  {id: '30', name: 'Romanian', code: 'ro', selected: false, isRTL: false},
  {id: '31', name: 'Hungarian', code: 'hu', selected: false, isRTL: false},
  {id: '32', name: 'Filipino', code: 'fil', selected: false, isRTL: false},
  {id: '33', name: 'Finnish', code: 'fi', selected: false, isRTL: false},
  {id: '34', name: 'Danish', code: 'da', selected: false, isRTL: false},
  {id: '35', name: 'Norwegian', code: 'no', selected: false, isRTL: false},
  {id: '36', name: 'Slovak', code: 'sk', selected: false, isRTL: false},
  {id: '37', name: 'Bulgarian', code: 'bg', selected: false, isRTL: false},
  {id: '38', name: 'Serbian', code: 'sr', selected: false, isRTL: false},
  {id: '39', name: 'Croatian', code: 'hr', selected: false, isRTL: false},
  {id: '40', name: 'Lithuanian', code: 'lt', selected: false, isRTL: false},
  {id: '41', name: 'Slovenian', code: 'sl', selected: false, isRTL: false},
  {id: '42', name: 'Estonian', code: 'et', selected: false, isRTL: false},
  {id: '43', name: 'Latvian', code: 'lv', selected: false, isRTL: false},
  {id: '44', name: 'Swahili', code: 'sw', selected: false, isRTL: false},
  {id: '45', name: 'Afrikaans', code: 'af', selected: false, isRTL: false},
  {id: '46', name: 'Sinhala', code: 'si', selected: false, isRTL: false},
  {id: '47', name: 'Burmese', code: 'my', selected: false, isRTL: false},
  {id: '48', name: 'Lao', code: 'lo', selected: false, isRTL: false},
  {id: '49', name: 'Mongolian', code: 'mn', selected: false, isRTL: false},
  {id: '50', name: 'Armenian', code: 'hy', selected: false, isRTL: false},
  {id: '51', name: 'Georgian', code: 'ka', selected: false, isRTL: false},
  {id: '52', name: 'Khmer', code: 'km', selected: false, isRTL: false},
  {id: '53', name: 'Haitian Creole', code: 'ht', selected: false, isRTL: false},
  {id: '54', name: 'Tatar', code: 'tt', selected: false, isRTL: false},
  {id: '55', name: 'Macedonian', code: 'mk', selected: false, isRTL: false},
  {id: '56', name: 'Basque', code: 'eu', selected: false, isRTL: false},
  {id: '57', name: 'Welsh', code: 'cy', selected: false, isRTL: false},
  {id: '58', name: 'Icelandic', code: 'is', selected: false, isRTL: false},
  {id: '59', name: 'Irish', code: 'ga', selected: false, isRTL: false},
];

export const UMRAH_CHECKLIST_DATA = [
  {
    id: 1,
    label: 'Travel & Packing Essentials',
    showValue: false,
    items: [
      {
        id: 'pack-1',
        text: 'Valid Passport and Visa',
        description: 'Ensure all travel documents are in order',
        selected: false,
      },
      {
        id: 'pack-2',
        text: 'Flight Tickets & Accommodation',
        description: 'Confirm all bookings for Makkah and Madinah',
        selected: false,
      },
      {
        id: 'pack-3',
        text: 'Ihram Clothing',
        description: 'Two white sheets for men, modest attire for women',
        selected: false,
      },
      {
        id: 'pack-4',
        text: 'Comfortable Footwear',
        description: 'Slip-on sandals for easy walking & wudu',
        selected: false,
      },
      {
        id: 'pack-5',
        text: 'Personal Identification',
        description: 'ID card, emergency contacts, & travel insurance',
        selected: false,
      },
      {
        id: 'pack-6',
        text: 'Essential Medications',
        description: 'First aid, pain relievers, and any prescribed meds',
        selected: false,
      },
      {
        id: 'pack-7',
        text: 'Portable Prayer Mat & Pocket Quran',
        description: 'For ease of worship and spiritual focus',
        selected: false,
      },
      {
        id: 'pack-8',
        text: 'Power Bank & Travel Adapter',
        description: 'Keep devices charged',
        selected: false,
      },
    ],
  },
  {
    id: 2,
    label: 'Spiritual Preparation',
    showValue: false,
    items: [
      {
        id: 'spirit-1',
        text: 'Sincere Intention (Niyyah)',
        description: 'Purify your intention for Umrah',
        selected: false,
      },
      {
        id: 'spirit-2',
        text: 'Learn Umrah Rituals',
        description: 'Study the steps of Umrah and their significance',
        selected: false,
      },
      {
        id: 'spirit-3',
        text: 'Repent & Seek Forgiveness',
        description: 'Mend relationships and seek Allah’s mercy',
        selected: false,
      },
      {
        id: 'spirit-4',
        text: 'Increase Worship & Duas',
        description: 'Prepare a list of supplications for Tawaf and Sa’i',
        selected: false,
      },
    ],
  },
  {
    id: 3,
    label: 'Financial Preparations',
    showValue: false,
    items: [
      {
        id: 'finance-1',
        text: 'Sufficient Funds',
        description: 'Carry enough cash or a travel card',
        selected: false,
      },
      {
        id: 'finance-2',
        text: 'Currency Exchange',
        description: 'Convert money to Saudi Riyals (SAR)',
        selected: false,
      },
      {
        id: 'finance-3',
        text: 'Charity & Zakat',
        description: 'Fulfill your obligatory and voluntary charity',
        selected: false,
      },
    ],
  },
  {
    id: 4,
    label: 'Mental & Emotional Readiness',
    showValue: false,
    items: [
      {
        id: 'mental-1',
        text: 'Practice Patience',
        description: 'Expect long walks, heat, and crowds',
        selected: false,
      },
      {
        id: 'mental-2',
        text: 'Develop a Positive Mindset',
        description: 'Focus on the spiritual rewards of Umrah',
        selected: false,
      },
      {
        id: 'mental-3',
        text: 'Prepare for Physical Endurance',
        description: 'Exercise regularly to build stamina for rituals',
        selected: false,
      },
    ],
  },
];

export const SAFETY_GUIDE_DATA = [
  {
    id: 1,
    label: 'Personal Safety',
    showValue: false,
    items: [
      {
        id: 'safety-1',
        text: 'Keep Your Documents Safe',
        description: 'Store passport, ID, and travel documents securely',
        selected: false,
      },
      {
        id: 'safety-2',
        text: 'Stay Aware of Surroundings',
        description: 'Be mindful of crowds and avoid unsafe areas',
        selected: false,
      },
      {
        id: 'safety-3',
        text: 'Avoid Carrying Large Sums of Cash',
        description: 'Use a money belt or secure wallet',
        selected: false,
      },
      {
        id: 'safety-4',
        text: 'Keep Emergency Contacts Handy',
        description: 'Have numbers for local authorities and your embassy',
        selected: false,
      },
    ],
  },
  {
    id: 2,
    label: 'Health & Hygiene',
    showValue: false,
    items: [
      {
        id: 'health-1',
        text: 'Stay Hydrated',
        description: 'Drink plenty of water, especially in hot weather',
        selected: false,
      },
      {
        id: 'health-2',
        text: 'Wear a Face Mask in Crowds',
        description: 'Reduce the risk of infections',
        selected: false,
      },
      {
        id: 'health-3',
        text: 'Carry Basic Medications',
        description: 'Pain relievers, antiseptics, and personal prescriptions',
        selected: false,
      },
      {
        id: 'health-4',
        text: 'Maintain Cleanliness',
        description: 'Wash hands regularly and carry sanitizers',
        selected: false,
      },
    ],
  },
  {
    id: 3,
    label: 'Emergency Preparedness',
    showValue: false,
    items: [
      {
        id: 'emergency-1',
        text: 'Know the Nearest Medical Facilities',
        description: 'Locate hospitals and clinics near your stay',
        selected: false,
      },
      {
        id: 'emergency-2',
        text: 'Have a Plan for Lost Items',
        description: 'Report lost passports or belongings immediately',
        selected: false,
      },
      {
        id: 'emergency-3',
        text: 'Follow Local Safety Instructions',
        description: 'Adhere to security guidelines and evacuation plans',
        selected: false,
      },
    ],
  },
  {
    id: 4,
    label: 'Crowd Management',
    showValue: false,
    items: [
      {
        id: 'crowd-1',
        text: 'Avoid Peak Hours',
        description: 'Plan visits to avoid extreme congestion',
        selected: false,
      },
      {
        id: 'crowd-2',
        text: 'Stay with Your Group',
        description: 'Ensure you have a meeting point in case of separation',
        selected: false,
      },
      {
        id: 'crowd-3',
        text: 'Follow Crowd Control Measures',
        description: 'Listen to security personnel and follow instructions',
        selected: false,
      },
    ],
  },
];
