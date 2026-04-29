export type Language = 'EN' | 'HI';

export interface TranslationContent {
  nav: {
    home: string;
    about: string;
    facilities: string;
    plans: string;
    exams: string;
    courses: string;
    gallery: string;
    youtube: string;
    reviews: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    badge: string;
    ctaBook: string;
    ctaCall: string;
    ctaWhatsapp: string;
    rating: string;
    reviews: string;
    open: string;
    students: string;
  };
  popup: {
    title: string;
    subtitle: string;
    name: string;
    mobile: string;
    course: string;
    submit: string;
    success: string;
  };
  facilities: {
    title: string;
    ac: string;
    wifi: string;
    cctv: string;
    ro: string;
    silent: string;
    chairs: string;
    washroom: string;
    restroom: string;
    canteen: string;
  };
  exams: {
    title: string;
  };
  about: {
    title: string;
    content: string;
  };
  youtube: {
    title: string;
    subtitle: string;
    visit: string;
  };
  contact: {
    title: string;
    name: string;
    mobile: string;
    course: string;
    message: string;
    send: string;
    success: string;
  };
  footer: {
    address: string;
    phone: string;
    email: string;
    rights: string;
  };
}

export const translations: Record<Language, TranslationContent> = {
  EN: {
    nav: {
      home: 'Home',
      about: 'About',
      facilities: 'Facilities',
      plans: 'Seat Plans',
      exams: 'Exams',
      courses: 'Courses',
      gallery: 'Gallery',
      youtube: 'YouTube',
      reviews: 'Reviews',
      contact: 'Contact',
    },
    hero: {
      title: 'BINA CENTRAL LIBRARY',
      subtitle: "Bettiah's Most Trusted 24x7 Self Study Library",
      badge: '24x7 OPEN • 4.9⭐ RATING',
      ctaBook: 'Book Seat',
      ctaCall: 'Call Now',
      ctaWhatsapp: 'WhatsApp',
      rating: '4.9 Rating',
      reviews: '668+ Reviews',
      open: '24/7 Hours',
      students: '1000+ Students',
    },
    popup: {
      title: 'Admission Open Now',
      subtitle: 'Join Today & Get 20% OFF',
      name: 'Full Name',
      mobile: 'Mobile Number',
      course: 'Select Course',
      submit: 'Apply Now',
      success: 'Thanks! We will contact you soon',
    },
    facilities: {
      title: 'World-Class Facilities',
      ac: 'Fully AC Environment',
      wifi: 'High-Speed WiFi',
      cctv: '24/7 CCTV Security',
      ro: 'Pure RO Water',
      silent: 'Pin-Drop Silence',
      chairs: 'Ergonomic Chairs',
      washroom: 'Clean Washrooms',
      restroom: 'Rest Room',
      canteen: 'In-house Canteen',
    },
    exams: {
      title: 'Supporting All Major Exams',
    },
    about: {
      title: 'Why Choose BINA CENTRAL LIBRARY?',
      content: 'We provide the perfect ecosystem for serious aspirants. With a combination of peaceful environment, high-end infrastructure, and 24/7 accessibility, we empower students to achieve their dreams.',
    },
    youtube: {
      title: 'BINA ACADEMY OFFICIAL',
      subtitle: 'Learn from the best on our official YouTube channel.',
      visit: 'Visit Channel',
    },
    contact: {
      title: 'Connect With Us',
      name: 'Your Name',
      mobile: 'Mobile number',
      course: 'Target Course',
      message: 'Your Message',
      send: 'Send Message',
      success: 'Message sent successfully!',
    },
    footer: {
      address: 'Kamalnath Nagar, Bettiah, Bihar 845438',
      phone: '087575 12020',
      email: 'binacentrallibrary@gmail.com',
      rights: '© 2024 BINA CENTRAL LIBRARY. All Rights Reserved.',
    },
  },
  HI: {
    nav: {
      home: 'होम',
      about: 'हमारे बारे में',
      facilities: 'सुविधाएं',
      plans: 'सीट प्लान',
      exams: 'परीक्षाएं',
      courses: 'कोर्स',
      gallery: 'गैलरी',
      youtube: 'यूट्यूब',
      reviews: 'रिव्यु',
      contact: 'संपर्क',
    },
    hero: {
      title: 'बिना सेंट्रल लाइब्रेरी',
      subtitle: 'बेतिया की सबसे भरोसेमंद 24x7 लाइब्रेरी',
      badge: '24x7 खुला • 4.9⭐ रेटिंग',
      ctaBook: 'सीट बुक करें',
      ctaCall: 'अभी कॉल करें',
      ctaWhatsapp: 'व्हाट्सएप',
      rating: '4.9 रेटिंग',
      reviews: '668+ रिव्यु',
      open: '24/7 घंटे खुला',
      students: '1000+ छात्र',
    },
    popup: {
      title: 'नामांकन शुरू है',
      subtitle: 'आज ही जुड़ें और 20% की छूट पाएं',
      name: 'पूरा नाम',
      mobile: 'मोबाइल नंबर',
      course: 'कोर्स चुनें',
      submit: 'अभी आवेदन करें',
      success: 'धन्यवाद! हम आपसे जल्द ही संपर्क करेंगे',
    },
    facilities: {
      title: 'विश्व स्तरीय सुविधाएं',
      ac: 'पूर्णतः वातानुकूलित (AC)',
      wifi: 'हाई-स्पीड वाई-फाई',
      cctv: '24/7 सीसीटीवी सुरक्षा',
      ro: 'शुद्ध RO पानी',
      silent: 'शांत वातावरण',
      chairs: 'आरामदायक कुर्सियां',
      washroom: 'स्वच्छ शौचालय',
      restroom: 'विश्राम कक्ष',
      canteen: 'कैंटीन सुविधा',
    },
    exams: {
      title: 'सभी प्रमुख परीक्षाओं के लिए सहायक',
    },
    about: {
      title: 'बिना सेंट्रल लाइब्रेरी क्यों चुनें?',
      content: 'हम गंभीर उम्मीदवारों के लिए बेहतरीन माहौल प्रदान करते हैं। शांत वातावरण, आधुनिक बुनियादी ढांचे और 24/7 पहुंच के समन्वय के साथ, हम छात्रों को उनके सपनों को प्राप्त करने के लिए सशक्त बनाते हैं।',
    },
    youtube: {
      title: 'बिना एकेडमी ऑफिशियल',
      subtitle: 'हमारे आधिकारिक यूट्यूब चैनल पर सर्वश्रेष्ठ शिक्षकों से सीखें।',
      visit: 'चैनल देखें',
    },
    contact: {
      title: 'हमसे जुड़ें',
      name: 'आपका नाम',
      mobile: 'मोबाइल नंबर',
      course: 'लक्ष्य कोर्स',
      message: 'आपका संदेश',
      send: 'संदेश भेजें',
      success: 'संदेश सफलतापूर्वक भेजा गया!',
    },
    footer: {
      address: 'कमलनाथ नगर, बेतिया, बिहार 845438',
      phone: '087575 12020',
      email: 'binacentrallibrary@gmail.com',
      rights: '© 2024 बिना सेंट्रल लाइब्रेरी। सर्वाधिकार सुरक्षित।',
    },
  },
};
