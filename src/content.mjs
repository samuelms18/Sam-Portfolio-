// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file, then run
//  `node build.mjs` to regenerate the site in /docs.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Sam',
  fullName: '', // TODO(Sam): full name, shown on the Contact page only
  role: 'UI/UX Designer & UI/UX Developer',
  location: 'India',
  intro: 'I turn complex workflows into simple, purposeful digital experiences.',
  // The hero headline, one entry per line. *word* is set in italic serif.
  heroLines: ['I turn complex workflows', 'into *simple*, purposeful', 'digital experiences.'],
  // Shorter lines used when the hero shows your photo beside the headline.
  heroLinesPhoto: ['I turn complex', 'workflows into', '*simple*, purposeful', 'digital experiences.'],
  heroPhoto: true, // show the portrait in the hero (set false for the text-only hero)
  photo: 'assets/img/sam.jpg', // TODO(Sam): add your photo here — photo slots stay hidden until the file exists
  introAlt: 'I design thoughtful digital experiences that make complex products simple, intuitive, and human.',
  support:
    'Designing enterprise products, dashboards and digital experiences that turn complex workflows into simple experiences.',
  url: 'https://samuelms18.github.io/Sam-Portfolio-/', // used for social previews

  // Leave blank to hide. Nothing empty is ever rendered on the site.
  email: 'stuvat18@gmail.com',
  formEndpoint: '', // Optional: Formspree / Getform endpoint. Without it the form opens an email draft.
  resume: 'assets/Sam-Resume.pdf', // Drop the PDF into src/assets/ — the button is hidden until it exists.
  socials: {
    linkedin: '', // TODO(Sam): add when ready
    github: '',
    behance: 'https://www.behance.net/jerrysamuel2',
    dribbble: 'https://dribbble.com/samuel18',
  },
};

export const bio = [
  "I'm a UI/UX Designer and UI/UX Developer with around 3 years of experience designing digital products, enterprise applications, dashboards, and workflow-driven systems. I currently work at Caplin Point Laboratories, where I design products used across finance, manufacturing, operations, insurance, and B2B commerce.",
  'I enjoy working at the intersection of design, technology, and problem-solving — turning complicated business requirements into clear and usable experiences. I\'m particularly interested in AI-powered products, data visualization, design systems, and the future of product design.',
];

export const domains = ['Finance', 'Manufacturing', 'Operations', 'Insurance', 'B2B Commerce', 'Management Reporting', 'Pharmaceuticals'];

export const principles = [
  {
    title: 'Clarity over decoration',
    text: 'Enterprise users open the same screen hundreds of times. Every element has to earn its place by making the next decision easier.',
  },
  {
    title: 'Understand the workflow first',
    text: 'I start with the business process — who does what, in what order, with which data — before drawing a single screen.',
  },
  {
    title: 'Design with the build in mind',
    text: "Knowing HTML, CSS and how data is structured lets me design things that can actually ship, and prototype them when a static mockup isn't enough.",
  },
  {
    title: 'Use AI as a collaborator',
    text: 'I use Claude AI and vibe coding to explore ideas faster, pressure-test flows and turn designs into working prototypes — while keeping the judgement human.',
  },
];

export const process = [
  { step: 'Understand', text: 'Stakeholder conversations, requirement mapping and learning the domain vocabulary.' },
  { step: 'Structure', text: 'Information architecture, roles and permissions, user flows and edge cases.' },
  { step: 'Sketch', text: 'Low-fidelity wireframes to agree on layout and logic before visuals.' },
  { step: 'Design', text: 'High-fidelity UI, components and a consistent visual system in Figma.' },
  { step: 'Prototype & Build', text: 'Clickable prototypes and front-end builds with HTML, CSS, Tailwind and AI tooling.' },
];

export const skills = [
  {
    group: 'Design',
    items: ['UI/UX Design', 'Product Design', 'UX Research', 'Information Architecture', 'User Flows', 'Wireframing', 'Prototyping', 'Design Systems', 'Responsive Design', 'Mobile UX', 'Dashboard Design', 'Data Visualization', 'Enterprise UX'],
  },
  {
    group: 'Design Tools',
    items: ['Figma', 'Adobe Creative Cloud', 'Adobe Photoshop', 'Adobe Express'],
  },
  {
    group: 'Build & Modern Tools',
    items: ['HTML / CSS', 'Tailwind CSS', 'WordPress', 'Elementor', 'Claude AI', 'AI-assisted design', 'Vibe Coding', 'Framer', 'Webflow', 'ApexCharts'],
  },
];

export const exploring = ['React', 'AI / ML', 'Three.js', 'Flutter', 'Android Studio', 'Xcode'];

export const experience = [
  {
    company: 'Caplin Point Laboratories Ltd.',
    role: 'UI/UX Developer',
    period: '2025 — Present',
    text: 'Designing enterprise digital products across pharmaceutical manufacturing, finance, operations, insurance, B2B commerce, and management reporting.',
    highlights: ['Corporate MIS Dashboard', 'SAP Dashboard', 'MANTRA Production Planner', 'Insurance Tracker', 'CSU Online Ordering Portal', 'Investment Portfolio', 'CaplinSync'],
  },
  {
    company: 'Techhyve',
    role: 'UI/UX / WordPress',
    period: '1 year',
    text: 'Website design, WordPress development, Elementor and custom web experiences.',
  },
  {
    company: 'We Define Net',
    role: 'UI/UX / Web Design Intern',
    period: '8 months',
    text: 'Worked on web design and WordPress-based projects.',
  },
  {
    company: 'Skylark HR Solution',
    role: 'UI/UX / Web Design Intern',
    period: '4 months',
    text: 'Worked on web interfaces and WordPress projects.',
  },
];
export const education = [
  { title: 'MCA — Master of Computer Applications', place: 'SRM University', year: '2022 — 2024', grade: 'CGPA 8.50' },
  { title: 'BCA — Bachelor of Computer Applications', place: 'SRM University', year: '2019 — 2022', grade: 'CGPA 8.01' },
];

// ─────────────────────────────────────────────────────────────
//  Projects / case studies
//  `mock` picks the schematic illustration used for that visual.
//  Swap a figure for a real screenshot by giving it `image: 'assets/work/xyz.png'`.
//  Copy below is drafted from Sam's brief — review & replace anything
//  that doesn't match what actually happened. No metrics are invented.
// ─────────────────────────────────────────────────────────────
export const projects = [
  {
    slug: 'mantra-production-planner',
    // TODO(Sam): placeholder stock photo — replace with a real context or project photo
    photo: 'https://picsum.photos/seed/pharma-factory/1600/900',
    photoAlt: '',
    title: 'MANTRA',
    subtitle: 'Production Planner',
    summary: 'A manufacturing planning and batch execution platform designed to simplify complex production workflows.',
    category: ['Enterprise Workflows', 'Dashboards & Data'],
    role: 'UI/UX Designer + Business Analysis',
    tools: ['Figma', 'Claude AI', 'HTML/CSS', 'Tailwind CSS', 'Vibe Coding'],
    domain: 'Pharmaceutical manufacturing',
    platform: 'Web · Tablet · Mobile',
    focus: ['Manufacturing workflows', 'Batch planning', 'Production execution', 'Operations', 'Management dashboards', 'Workflow design', 'Mobile/tablet experience'],
    mock: 'planner',
    hue: 32,
    context:
      'Pharmaceutical production runs on batches — each one tied to products, equipment, materials, schedules and approvals. Planners, floor teams and management all need a view of the same work, but each needs to see it differently.',
    problem:
      'Planning and execution information is dense and highly interdependent. The challenge was to make batch planning, day-to-day execution and management oversight feel like one coherent system — without hiding the detail that operations teams depend on.',
    myRole:
      'I worked as both UI/UX Designer and Business Analyst: translating production requirements into flows and screens, then carrying the designs into front-end prototypes with HTML, Tailwind CSS and AI-assisted coding.',
    understanding: [
      'Mapped the production lifecycle from plan to batch to execution to review.',
      'Identified the distinct roles involved and what each needs to see and do.',
      'Separated planning-time decisions from shop-floor actions that happen on tablets and phones.',
    ],
    process: [
      'Defined the core objects (plan, batch, stage, status) and how they relate.',
      'Designed user flows for creating plans, scheduling batches and updating execution status.',
      'Structured a management dashboard that rolls batch-level detail up into an operational overview.',
      'Adapted key execution screens for tablet and mobile use on the floor.',
    ],
    wireframes: 'Low-fidelity layouts for the planning board, batch detail and execution views, used to agree on structure and status logic before visual design.',
    visual: 'A calm, information-dense interface: clear status colour coding, a strong typographic hierarchy for batch IDs and stages, and consistent components across web, tablet and mobile.',
    prototype: 'Interactive flows to walk stakeholders through planning a batch and following it through execution.',
    development: 'Built front-end screens with HTML, CSS and Tailwind, using Claude AI and vibe coding to move quickly from Figma to working UI.',
    outcome: [
      'A single, structured flow from production plan to batch execution.',
      'Role-appropriate views for planners, floor teams and management.',
      'A responsive experience that works on the devices used in production areas.',
    ],
    learnings: 'Doing the business analysis myself meant the design decisions were grounded in how production actually works. The biggest gains came from modelling the workflow correctly — the UI became much simpler once the objects and states were clear.',
  },
  {
    slug: 'corporate-mis-dashboard',
    // TODO(Sam): placeholder stock photo — replace with a real context or project photo
    photo: 'https://picsum.photos/seed/finance-office/1600/900',
    photoAlt: '',
    title: 'Corporate MIS',
    subtitle: 'Management Dashboard',
    summary: 'A management intelligence platform that transforms SAP and business data into actionable financial and operational insights.',
    category: ['Dashboards & Data'],
    role: 'UI/UX Designer',
    tools: ['Figma', 'Claude AI', 'ApexCharts'],
    domain: 'Finance & management reporting',
    platform: 'Web',
    focus: ['CFO / management dashboards', 'KPI visualization', 'Revenue · EBITDA · Gross Margin', 'MTD / QTD / YTD', 'MoM / QoQ / YoY', 'SAP data visualization', 'Enterprise data architecture'],
    mock: 'dashboard',
    hue: 200,
    context:
      'Leadership needs a fast, trustworthy read on financial and operational performance. The underlying data lives in SAP and other business systems — rich, but not shaped for decision-making.',
    problem:
      'How do you take large volumes of SAP data and present revenue, EBITDA and margin across multiple periods and comparisons — MTD, QTD, YTD, MoM, QoQ, YoY — without overwhelming a CFO who has minutes, not hours?',
    myRole:
      'UI/UX Designer — responsible for the information architecture of the dashboard, KPI hierarchy, chart selection and the visual design, specified for implementation with ApexCharts.',
    understanding: [
      'Listed the decisions management makes and the KPIs behind each one.',
      'Mapped which SAP data feeds which metric, and at what granularity.',
      'Defined period and comparison logic so every number reads the same way across the product.',
    ],
    process: [
      'Established a KPI hierarchy: headline numbers first, trend second, breakdown on demand.',
      'Designed a consistent period switcher (MTD / QTD / YTD) and comparison model (MoM / QoQ / YoY).',
      'Matched each question to the right chart type and specified them for ApexCharts.',
      'Structured drill-downs so detail is reachable without cluttering the overview.',
    ],
    wireframes: 'Layout studies for the KPI strip, trend charts and drill-down tables — testing what management should see in the first five seconds.',
    visual: 'A restrained palette where colour carries meaning (growth, decline, target), clear number formatting and a type scale tuned for large figures.',
    prototype: 'A clickable prototype covering period switching, comparisons and drill-downs, used to review the experience with stakeholders before build.',
    development: 'Chart specifications and component behaviour documented for implementation with ApexCharts.',
    outcome: [
      'A clear KPI hierarchy for financial and operational performance.',
      'Consistent period and comparison logic across every view.',
      'A dashboard structure that can scale as more SAP data sources are added.',
    ],
    learnings: 'Data visualisation is mostly information architecture. Agreeing on definitions and comparison logic early mattered more than any individual chart.',
  },
  {
    slug: 'insurance-tracker',
    // TODO(Sam): placeholder stock photo — replace with a real context or project photo
    photo: 'https://picsum.photos/seed/policy-docs/1600/900',
    photoAlt: '',
    title: 'Insurance Tracker',
    subtitle: 'Policy & Renewal Management',
    summary: 'An enterprise insurance management platform for tracking policies, renewals, approvals, and compliance.',
    category: ['Enterprise Workflows'],
    role: 'UI/UX Designer',
    tools: ['Figma', 'Claude AI'],
    domain: 'Corporate insurance',
    platform: 'Mobile-first · Web',
    focus: ['Mobile-first enterprise UX', 'Policy registration', 'Renewal workflows', 'Approval workflows', 'Role-based access', 'Dashboard design', 'Information architecture', 'Complex forms'],
    mock: 'mobile',
    hue: 160,
    context:
      'An organisation holds many insurance policies across assets, people and operations. Each has renewal dates, approvals and compliance requirements that different people are responsible for.',
    problem:
      'Missing a renewal is costly, and registering a policy involves long, detailed forms. The product needed to make registration manageable, renewals visible and approvals accountable — on mobile as well as desktop.',
    myRole:
      'UI/UX Designer — owning the information architecture, role-based flows, form design and dashboard, designed mobile-first.',
    understanding: [
      'Identified the roles involved and what each is allowed to see and approve.',
      'Mapped the policy lifecycle: registration, active, due for renewal, renewed or lapsed.',
      'Broke down the policy form into logical groups to understand what is truly required up front.',
    ],
    process: [
      'Designed the information architecture around policies, renewals and approvals.',
      'Split long registration forms into clear, progressive steps.',
      'Designed approval workflows with explicit states and ownership.',
      'Built a dashboard that surfaces upcoming renewals and pending approvals first.',
    ],
    wireframes: 'Mobile-first wireframes for registration steps, renewal lists and approval screens, then scaled up to desktop.',
    visual: 'Status-driven UI with clear urgency cues for renewals, generous touch targets and form patterns that stay readable on small screens.',
    prototype: 'Prototyped the registration and approval flows end-to-end to review with stakeholders.',
    outcome: [
      'A structured, step-by-step policy registration experience.',
      'Renewals and approvals surfaced proactively instead of being searched for.',
      'Role-based access built into the flows from the start.',
    ],
    learnings: 'Designing mobile-first for an enterprise tool forced hard prioritisation — and those decisions made the desktop version cleaner too.',
  },
  {
    slug: 'csu-online-ordering-portal',
    // TODO(Sam): placeholder stock photo — replace with a real context or project photo
    photo: 'https://picsum.photos/seed/pharmacy/1600/900',
    photoAlt: '',
    title: 'CSU Online Ordering',
    subtitle: 'B2B Pharmaceutical Portal',
    summary: 'A B2B pharmaceutical ordering experience connecting pharmacies, hospitals, and distributors with a streamlined digital ordering workflow.',
    category: ['Commerce'],
    role: 'UI/UX Designer',
    tools: ['Figma', 'WordPress / Web', 'Claude AI'],
    domain: 'B2B pharmaceutical commerce',
    platform: 'Web · Responsive',
    focus: ['B2B e-commerce', 'Product discovery', 'Ordering workflow', 'Role-based experiences', 'Enterprise UX', 'Pharmaceutical domain'],
    mock: 'commerce',
    hue: 280,
    context:
      'Pharmacies, hospitals and distributors order pharmaceutical products in volume. B2B buyers behave very differently from retail shoppers: they know what they want, reorder often and need accuracy above all.',
    problem:
      'Design an ordering experience that makes finding the right product fast, supports different buyer types, and keeps the ordering workflow streamlined and error-resistant.',
    myRole: 'UI/UX Designer — product discovery, ordering flow, role-based experiences and the visual design for a web build.',
    understanding: [
      'Defined the buyer types (pharmacy, hospital, distributor) and how their needs differ.',
      'Mapped the ordering journey from discovery to cart to order confirmation.',
      'Studied how pharmaceutical products are identified and searched for.',
    ],
    process: [
      'Designed product discovery around search and structured filters.',
      'Streamlined the ordering workflow for quick, repeatable B2B orders.',
      'Designed role-based variations of the experience.',
      'Created a responsive layout for desktop and mobile ordering.',
    ],
    wireframes: 'Wireframes for catalogue, product detail, cart and checkout — focused on speed and clarity over merchandising.',
    visual: 'A professional, trustworthy visual language suited to a pharmaceutical brand, with clear product information and quantities.',
    prototype: 'A clickable ordering flow used to validate the journey before implementation.',
    development: 'Designs prepared for implementation with WordPress and web technologies.',
    outcome: [
      'A focused B2B ordering journey from discovery to checkout.',
      'Experiences tailored to different buyer roles.',
      'A responsive portal ready for web implementation.',
    ],
    learnings: 'B2B commerce rewards efficiency over persuasion. Removing steps mattered more than adding features.',
  },
  {
    slug: 'caplin-connect',
    // TODO(Sam): placeholder stock photo — replace with a real context or project photo
    photo: 'https://picsum.photos/seed/workplace/1600/900',
    photoAlt: '',
    title: 'Caplin Connect',
    subtitle: 'Unified Enterprise Portal',
    summary: 'A unified enterprise platform designed to connect employees with internal digital applications and services.',
    category: ['Enterprise Workflows', 'Development'],
    role: 'UI/UX Designer',
    tools: ['Figma', 'Claude AI', 'HTML/CSS'],
    domain: 'Internal tools & employee experience',
    platform: 'Web · Responsive',
    focus: ['Enterprise portal experience', 'Application discovery', 'Branding', 'Visual design', 'Responsive experience', 'Modern authentication experience'],
    mock: 'portal',
    hue: 220,
    context:
      'As an organisation adds internal applications, employees end up juggling many links, logins and entry points.',
    problem:
      'Create one welcoming front door that helps employees discover and open the internal apps they need — with a modern sign-in experience and a brand that feels like the company.',
    myRole: 'UI/UX Designer — portal experience, application discovery, branding and visual design, built out with HTML/CSS.',
    understanding: [
      'Inventoried the internal applications and grouped them in a way employees would recognise.',
      'Considered first-time versus everyday use of the portal.',
      'Defined the sign-in experience as the first impression of the platform.',
    ],
    process: [
      'Designed an application directory with clear grouping and search.',
      'Designed a modern authentication experience.',
      'Developed the portal brand and visual identity.',
      'Built responsive layouts for desktop and mobile.',
    ],
    wireframes: 'Wireframes for sign-in, home and the application directory.',
    visual: 'A modern, branded interface that makes the portal feel like a product rather than a list of links.',
    prototype: 'Prototyped sign-in through to launching an application.',
    development: 'Built front-end pages in HTML and CSS with AI-assisted development.',
    outcome: [
      'One entry point for internal applications.',
      'Easier discovery of available tools.',
      'A consistent, branded first impression for employees.',
    ],
    learnings: 'Internal tools deserve the same care as customer-facing products — the portal sets the tone for every app behind it.',
  },
  {
    slug: 'matrimonial-wordpress-plugin',
    // TODO(Sam): placeholder stock photo — replace with a real context or project photo
    photo: 'https://picsum.photos/seed/celebration/1600/900',
    photoAlt: '',
    title: 'Matrimonial Plugin',
    subtitle: 'Custom WordPress Platform',
    summary: 'A custom WordPress matrimonial platform with dynamic profiles, dependent forms, and AJAX-powered interactions.',
    category: ['Development'],
    role: 'UI/UX Designer + Developer',
    tools: ['WordPress', 'Elementor', 'PHP', 'MySQL / $wpdb', 'AJAX'],
    domain: 'Matrimonial services',
    platform: 'WordPress',
    focus: ['Product design', 'Custom WordPress development', 'Dynamic forms', 'Dependent dropdowns', 'Shortcodes', 'Plugin architecture', 'Frontend UX'],
    mock: 'form',
    hue: 340,
    context:
      'A matrimonial platform depends on detailed profiles and a smooth way to create and browse them — inside WordPress, where the client manages the site.',
    problem:
      'Profile creation involves many interdependent fields. Off-the-shelf form tools could not handle the dependent logic and data structure cleanly, so the platform needed a custom plugin.',
    myRole: 'Designer and developer — I designed the experience and built the plugin end to end.',
    understanding: [
      'Mapped the profile data model and the dependencies between fields.',
      'Identified where users would struggle with long forms.',
      'Planned how the plugin would integrate with WordPress and Elementor pages.',
    ],
    process: [
      'Designed profile creation and browsing flows.',
      'Designed dependent dropdowns so later options adapt to earlier answers.',
      'Planned a plugin architecture with shortcodes for flexible placement.',
    ],
    wireframes: 'Wireframes for profile forms and profile views.',
    visual: 'A friendly, approachable interface consistent with the site\'s Elementor design.',
    development: 'Built a custom plugin in PHP with MySQL via $wpdb, AJAX-powered dependent fields and shortcodes for embedding features in Elementor pages.',
    outcome: [
      'Dynamic profiles backed by a custom data structure.',
      'Dependent forms that update instantly without page reloads.',
      'Reusable shortcodes the client can place anywhere on the site.',
    ],
    learnings: 'Building what I designed showed me exactly where design decisions create technical complexity — a perspective I still use when designing for developers.',
  },
];
