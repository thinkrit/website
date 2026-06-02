export const locales = ['en', 'el'] as const

export type Locale = (typeof locales)[number]

export type ServiceCard = {
  title: string
  description: string
  tone: 'red' | 'dark' | 'gray'
}

export type Feature = {
  title: string
  description: string
  icon?: string
}

export type Step = {
  title: string
  description: string
}

export type CaseStudy = {
  title: string
  description: string
}

export type Person = {
  name: string
  role: string
  department?: string
}

export type LinkItem = {
  label: string
  url: string
  absolute?: boolean
}

export type LinkGroup = {
  label: string
  links: LinkItem[]
}

const en = {
  shared: {
    siteTitle: 'ThinkRIT',
    nav: {
      services: 'Services',
      products: 'Products',
      company: 'Company',
      contact: 'Contact',
      serviceLinks: [
        { label: 'Development', url: '/services/development' },
        { label: 'Cloud', url: '/services/cloud' },
        { label: 'Consulting', url: '/services/consulting' },
      ],
      productLinks: [
        { label: 'Neuro', url: '/products/neuro' },
        { label: 'Automotive BI', url: '/products/automotive-bi' },
        { label: 'ContactNow', url: '/products/contactnow' },
      ],
    },
    footer: {
      label: 'Contact us',
      tagline: "Reach out and let's explore what's possible together.",
      cta: { label: 'Contact', url: '/contact' },
      groups: [
        {
          label: 'Services',
          links: [
            { label: 'Development', url: '/services/development' },
            { label: 'Cloud', url: '/services/cloud' },
            { label: 'Consulting', url: '/services/consulting' },
          ],
        },
        {
          label: 'Products',
          links: [
            { label: 'Neuro', url: '/products/neuro' },
            { label: 'Automotive BI', url: '/products/automotive-bi' },
            { label: 'ContactNow', url: '/products/contactnow' },
          ],
        },
        {
          label: 'About',
          links: [{ label: 'Company', url: '/company' }],
        },
        {
          label: 'Social',
          links: [{ label: 'LinkedIn', url: 'https://www.linkedin.com', absolute: true }],
        },
      ],
      copyright: '©2026 ThinkRIT. ALL RIGHTS RESERVED.',
      bottomLinks: [
        { label: 'Privacy', url: '/privacy' },
        { label: 'Terms of use', url: '/terms' },
      ],
    },
  },
  home: {
    hero: {
      title: 'Driving the future, today',
      cta: 'Discover More',
      description:
        'Our ultimate objective is to offer the best structure of the future, today - through cutting-edge technological solutions and state-of-the-art intelligence.',
    },
    about: {
      label: 'About us',
      title: 'We strive to create a new competitive advantage for the future of the market',
      description:
        'An approach to competition grounded in long-term thinking and sustainable value creation. By reimagining how businesses are structured and how value is delivered, it enables lasting prosperity for organizations and society alike.',
      cta: 'More about us',
    },
    services: {
      label: 'Our services',
      title: 'Turning Strategy, Technology, and Intelligence into Enduring Institutional Impact',
      cards: [
        {
          title: 'Development',
          description: 'Scalable, custom software for modern business needs.',
          tone: 'red' as const,
        },
        {
          title: 'Cloud',
          description: 'Secure cloud access to business applications and data, anytime.',
          tone: 'dark' as const,
        },
        {
          title: 'Consulting',
          description: 'Strategic consulting for confident, future-ready decisions.',
          tone: 'gray' as const,
        },
      ],
    },
    products: {
      label: 'Our products',
      title: 'Driving progress through applied scientific exploration',
      items: [
        { title: 'Neuro', description: 'Development focuses on adaptability and maintainability.' },
        { title: 'Neuro.BI', description: 'Development focuses on adaptability and maintainability.' },
        { title: 'ContactNow', description: 'Development focuses on adaptability and maintainability.' },
      ],
    },
    partners: {
      label: 'Partners',
      title: 'Trusted by Industry Leaders',
      description:
        "We collaborate with the world's most innovative companies to deliver high-performance solutions across various sectors.",
      logos: [
        { alt: 'proLogistik Group', src: '/partners/prologistik.svg' },
        { alt: 'incadea', src: '/partners/incadea.svg' },
        { alt: 'OneDealer', src: '/partners/onedealer.svg' },
        { alt: 'Rapid', src: '/partners/rapid.svg' },
      ],
    },
    customers: {
      label: 'Customers',
      title: 'Trusted by Industry Leaders',
      description:
        "We collaborate with the world's most innovative companies to deliver high-performance solutions across various sectors.",
      logos: [
        { alt: 'proLogistik Group', src: '/partners/prologistik.svg' },
        { alt: 'incadea', src: '/partners/incadea.svg' },
        { alt: 'OneDealer', src: '/partners/onedealer.svg' },
        { alt: 'Rapid', src: '/partners/rapid.svg' },
      ],
    },
  },
  company: {
    hero: {
      title: 'ThinkRIT at a glance',
      description:
        'ThinkRIT delivers smart IT and cloud solutions that help businesses innovate, operate efficiently, and grow with confidence.',
    },
    about: {
      label: 'About us',
      title:
        'A company devoted to strategic planning and development of integrated IT and operational organisation solutions.',
      description:
        "ThinkRIT's researchers drive global innovation by making the most out of the cutting-edge features of cloud technology. Offering reliable multi-level consultancy and training services in the field of operational intelligence, we offer a competitive advantage to modern businesses.",
    },
    founders: {
      label: 'Founders',
      intro:
        'Founded by experienced professionals, ThinkRIT was built with a clear focus on strategy, innovation, and delivering practical solutions that create long-term value for clients.',
      people: [
        { name: 'Name Surname', role: 'Chief Executive Officer' },
        { name: 'Name Surname', role: 'Chief Executive Officer' },
      ],
    },
    team: {
      label: 'The team',
      title:
        "ThinkRIT's team brings together skilled professionals with diverse expertise, working collaboratively to deliver reliable solutions, innovative thinking, and consistent value for every client.",
      members: Array.from({ length: 12 }, () => ({
        name: 'Name Surname',
        role: 'Department',
        department: 'Department',
      })),
    },
    manifesto: {
      label: 'Our manifesto',
      title:
        'We strive to create a new competitive advantage, which will emerge in the market as a radically new model of sustainable prosperity for all.',
    },
  },
  contact: {
    hero: {
      title: 'Get in touch',
      description:
        'Get in touch with us to discuss your needs, ask questions, or explore how we can support your business with tailored solutions and expert guidance.',
    },
    info: {
      label: 'Contact info',
      company: 'ThinkRIT',
      address: 'Eleftheriou Venizelou 1\nMetamorfosi 144 52, Attica Greece',
      phoneLabel: 'Phone',
      phone: '+30 210 6096760',
      emailLabel: 'Email',
      email: 'info@thinkrit.gr',
      socialLabel: 'Social',
      social: 'LinkedIn',
    },
    form: {
      label: 'Send a message',
      title: "Contact us for any questions or inquiries, we're here to help.",
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      submit: 'Send message',
    },
  },
  service: {
    hero: {
      label: 'Overview',
      title: 'Development Services',
      description:
        'Development services focused on designing and building scalable digital solutions for modern business needs. From custom software to integrated, cloud-native applications, each solution is developed with performance, security, and long-term adaptability in mind.',
    },
    features: {
      label: 'Features',
      items: [
        { title: 'Scalable by Design', description: 'Architected to grow with changing business requirements.' },
        { title: 'Secure and Reliable', description: 'Built with strong security and dependable operation in mind.' },
        { title: 'Built for Long-Term Growth', description: 'Designed to evolve as needs and technologies change.' },
      ],
    },
    approach: {
      label: 'Our approach',
      title:
        'A development approach designed to turn complex requirements into resilient, future-ready digital solutions.',
      steps: [
        {
          title: 'Designed Around Real Business Needs',
          description:
            'Every solution begins with a deep understanding of operational goals, user requirements, and long-term objectives.',
        },
        {
          title: 'Engineered for Scalability and Security',
          description:
            'Systems are built using modern architectures and best practices, allowing solutions to scale reliably.',
        },
        {
          title: 'Built to Evolve Over Time',
          description:
            'Development focuses on adaptability and maintainability, enabling platforms to grow and improve.',
        },
      ],
    },
    focus: {
      label: 'Our focus',
      title: 'Focusing efforts on building resilient and adaptable business solutions',
    },
    implementations: {
      label: 'Implementation',
      title: 'Delivering end-to-end implementation with focus on reliability, performance, and scale',
      caseStudies: [
        { title: 'Case Study Title', description: 'This is the description for the case study' },
        { title: 'Case Study Title', description: 'This is the description for the case study' },
        { title: 'Case Study Title', description: 'This is the description for the case study' },
      ],
    },
  },
  product: {
    hero: {
      label: 'Development',
      overviewLabel: 'Overview',
      title: 'ContactNow',
      description:
        'ContactNow helps businesses capture and respond to customer inquiries instantly through a streamlined contact experience.',
    },
    features: [
      {
        title: 'Centralized Communication',
        description: 'Manage all logistics calls and customer interactions in one platform.',
        icon: 'check',
      },
      {
        title: 'Real-Time Operations',
        description: 'Track calls, agents, and shipment activity as it happens.',
        icon: 'clock',
      },
      {
        title: 'Multi-Country Ready',
        description: 'Built to support logistics teams operating across regions and languages.',
        icon: 'globe',
      },
    ],
    how: {
      label: 'How it works',
      title:
        'A development approach designed to turn complex requirements into resilient, future-ready digital solutions.',
      steps: [
        {
          title: 'Designed Around Real Business Needs',
          description:
            'Every solution begins with a deep understanding of operational goals, user requirements, and long-term objectives.',
        },
        {
          title: 'Designed Around Real Business Needs',
          description:
            'Every solution begins with a deep understanding of operational goals, user requirements, and long-term objectives.',
        },
        {
          title: 'Designed Around Real Business Needs',
          description:
            'Every solution begins with a deep understanding of operational goals, user requirements, and long-term objectives.',
        },
      ],
    },
    technologies: {
      label: 'Technologies',
      title: 'Built on a modern, scalable technology stack',
      description:
        'ContactNow is built using a modern, carefully selected technology stack designed specifically to support its functionality, performance requirements, and future scalability.',
      items: [
        { title: 'Technology', description: 'This is the text about the technology used' },
        { title: 'Technology', description: 'This is the text about the technology used' },
        { title: 'Technology', description: 'This is the text about the technology used' },
        { title: 'Technology', description: 'This is the text about the technology used' },
      ],
    },
    focus: {
      label: 'Our focus',
      title: 'Focusing efforts on building resilient and adaptable business solutions',
    },
    implementations: {
      label: 'Implementation',
      title: 'Delivering end-to-end implementation with focus on reliability, performance, and scale',
      caseStudies: [
        { title: 'Case Study Title', description: 'This is the description for the case study' },
        { title: 'Case Study Title', description: 'This is the description for the case study' },
        { title: 'Case Study Title', description: 'This is the description for the case study' },
      ],
    },
  },
}

const el: typeof en = {
  shared: {
    ...en.shared,
    nav: {
      services: 'Υπηρεσίες',
      products: 'Προϊόντα',
      company: 'Εταιρεία',
      contact: 'Επικοινωνία',
      serviceLinks: [
        { label: 'Ανάπτυξη', url: '/services/development' },
        { label: 'Cloud', url: '/services/cloud' },
        { label: 'Συμβουλευτική', url: '/services/consulting' },
      ],
      productLinks: [
        { label: 'Neuro', url: '/products/neuro' },
        { label: 'Automotive BI', url: '/products/automotive-bi' },
        { label: 'ContactNow', url: '/products/contactnow' },
      ],
    },
    footer: {
      ...en.shared.footer,
      label: 'Επικοινωνία',
      tagline: 'Επικοινωνήστε μαζί μας για να εξερευνήσουμε τι είναι εφικτό.',
      cta: { label: 'Επικοινωνία', url: '/contact' },
      groups: [
        { label: 'Υπηρεσίες', links: elSafeLinks(en.shared.footer.groups[0].links) },
        { label: 'Προϊόντα', links: elSafeLinks(en.shared.footer.groups[1].links) },
        { label: 'Σχετικά', links: [{ label: 'Εταιρεία', url: '/company' }] },
        { label: 'Social', links: [{ label: 'LinkedIn', url: 'https://www.linkedin.com', absolute: true }] },
      ],
      copyright: '©2026 ThinkRIT. ΜΕ ΕΠΙΦΥΛΑΞΗ ΚΑΘΕ ΔΙΚΑΙΩΜΑΤΟΣ.',
      bottomLinks: [
        { label: 'Privacy', url: '/privacy' },
        { label: 'Terms of use', url: '/terms' },
      ],
    },
  },
  home: {
    ...en.home,
    hero: {
      title: 'Οδηγώντας το μέλλον, σήμερα',
      cta: 'Ανακάλυψη',
      description:
        'Στόχος μας είναι να προσφέρουμε τη δομή του μέλλοντος, σήμερα, μέσα από προηγμένες τεχνολογικές λύσεις και σύγχρονη επιχειρησιακή νοημοσύνη.',
    },
    about: {
      label: 'Σχετικά με εμάς',
      title: 'Δημιουργούμε ένα νέο ανταγωνιστικό πλεονέκτημα για το μέλλον της αγοράς',
      description:
        'Μια προσέγγιση στον ανταγωνισμό που βασίζεται στη μακροπρόθεσμη σκέψη, τη βιώσιμη αξία και την πρακτική καινοτομία.',
      cta: 'Περισσότερα',
    },
    services: {
      ...en.home.services,
      label: 'Οι υπηρεσίες μας',
      title: 'Μετατρέπουμε στρατηγική, τεχνολογία και νοημοσύνη σε διαρκή επιχειρησιακή αξία',
    },
    products: {
      ...en.home.products,
      label: 'Τα προϊόντα μας',
      title: 'Πρόοδος μέσα από εφαρμοσμένη τεχνολογική εξερεύνηση',
    },
    partners: { ...en.home.partners, label: 'Συνεργάτες' },
    customers: { ...en.home.customers, label: 'Πελάτες' },
  },
  company: {
    ...en.company,
    hero: {
      title: 'Η ThinkRIT με μια ματιά',
      description:
        'Η ThinkRIT παρέχει έξυπνες λύσεις IT και cloud που βοηθούν τις επιχειρήσεις να καινοτομούν, να λειτουργούν αποδοτικά και να αναπτύσσονται με αυτοπεποίθηση.',
    },
    about: {
      label: 'Σχετικά με εμάς',
      title:
        'Μια εταιρεία αφιερωμένη στον στρατηγικό σχεδιασμό και την ανάπτυξη ολοκληρωμένων λύσεων IT και λειτουργικής οργάνωσης.',
      description:
        'Η ομάδα της ThinkRIT αξιοποιεί σύγχρονες τεχνολογίες cloud, επιχειρησιακή νοημοσύνη και πολυεπίπεδη συμβουλευτική για να δημιουργεί αξία για τις επιχειρήσεις.',
    },
    founders: {
      ...en.company.founders,
      label: 'Ιδρυτές',
      intro:
        'Η ThinkRIT δημιουργήθηκε από έμπειρους επαγγελματίες με έμφαση στη στρατηγική, την καινοτομία και τις πρακτικές λύσεις.',
    },
    team: {
      ...en.company.team,
      label: 'Η ομάδα',
      title:
        'Η ομάδα της ThinkRIT συνδυάζει εξειδικευμένους επαγγελματίες που συνεργάζονται για αξιόπιστες λύσεις και σταθερή αξία.',
    },
    manifesto: {
      label: 'Το μανιφέστο μας',
      title:
        'Δημιουργούμε ένα νέο ανταγωνιστικό πλεονέκτημα που αναδεικνύει ένα βιώσιμο μοντέλο ευημερίας για όλους.',
    },
  },
  contact: {
    ...en.contact,
    hero: {
      title: 'Επικοινωνήστε μαζί μας',
      description:
        'Επικοινωνήστε μαζί μας για να συζητήσουμε τις ανάγκες σας και να εξερευνήσουμε πώς μπορούμε να υποστηρίξουμε την επιχείρησή σας.',
    },
    info: {
      ...en.contact.info,
      label: 'Στοιχεία επικοινωνίας',
      phoneLabel: 'Τηλέφωνο',
      emailLabel: 'Email',
      socialLabel: 'Social',
    },
    form: {
      label: 'Στείλτε μήνυμα',
      title: 'Επικοινωνήστε μαζί μας για κάθε ερώτηση ή αίτημα.',
      firstName: 'Όνομα',
      lastName: 'Επώνυμο',
      email: 'Email',
      phone: 'Τηλέφωνο',
      message: 'Μήνυμα',
      submit: 'Αποστολή',
    },
  },
  service: {
    ...en.service,
    hero: {
      label: 'Επισκόπηση',
      title: 'Υπηρεσίες Ανάπτυξης',
      description:
        'Υπηρεσίες ανάπτυξης για τον σχεδιασμό και την υλοποίηση κλιμακούμενων ψηφιακών λύσεων για σύγχρονες επιχειρησιακές ανάγκες.',
    },
    features: { ...en.service.features, label: 'Χαρακτηριστικά' },
    approach: {
      ...en.service.approach,
      label: 'Η προσέγγισή μας',
      title:
        'Μια προσέγγιση ανάπτυξης που μετατρέπει σύνθετες απαιτήσεις σε ανθεκτικές, έτοιμες για το μέλλον ψηφιακές λύσεις.',
    },
    focus: {
      label: 'Η εστίασή μας',
      title: 'Εστιάζουμε στη δημιουργία ανθεκτικών και προσαρμόσιμων επιχειρησιακών λύσεων',
    },
    implementations: {
      ...en.service.implementations,
      label: 'Υλοποίηση',
      title: 'Πλήρης υλοποίηση με έμφαση στην αξιοπιστία, την απόδοση και την κλίμακα',
    },
  },
  product: {
    ...en.product,
    hero: {
      label: 'Ανάπτυξη',
      overviewLabel: 'Επισκόπηση',
      title: 'ContactNow',
      description:
        'Το ContactNow βοηθά τις επιχειρήσεις να συλλέγουν και να απαντούν άμεσα σε αιτήματα πελατών μέσα από μια απλή και αποδοτική εμπειρία επικοινωνίας.',
    },
    how: {
      ...en.product.how,
      label: 'Πώς λειτουργεί',
      title:
        'Μια προσέγγιση ανάπτυξης που μετατρέπει σύνθετες απαιτήσεις σε ανθεκτικές, έτοιμες για το μέλλον ψηφιακές λύσεις.',
    },
    technologies: {
      ...en.product.technologies,
      label: 'Τεχνολογίες',
      title: 'Βασισμένο σε σύγχρονη και κλιμακούμενη τεχνολογική υποδομή',
    },
    focus: {
      label: 'Η εστίασή μας',
      title: 'Εστιάζουμε στη δημιουργία ανθεκτικών και προσαρμόσιμων επιχειρησιακών λύσεων',
    },
    implementations: {
      ...en.product.implementations,
      label: 'Υλοποίηση',
      title: 'Πλήρης υλοποίηση με έμφαση στην αξιοπιστία, την απόδοση και την κλίμακα',
    },
  },
}

function elSafeLinks(links: LinkItem[]): LinkItem[] {
  return links.map((link) => ({ ...link }))
}

export const siteCopy = { en, el }

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale)
}

export function getCopy(locale: Locale) {
  return siteCopy[locale]
}

export function localizedPath(locale: Locale, path: string): string {
  if (path.startsWith('http')) return path
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  if (locale === 'en') return cleanPath
  return cleanPath === '/' ? `/${locale}` : `/${locale}${cleanPath}`
}

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
}
