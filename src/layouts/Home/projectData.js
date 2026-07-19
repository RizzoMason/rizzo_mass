export const projects = [
  {
    title: 'Futuro',
    tagline: 'Private Community',
    slug: 'futuro',
    description:
      'A private community platform built for members-only spaces, conversations, and belonging.',
    roles: ['Private Spaces', 'Member Conversations', 'Community Tools'],
    url: 'https://buildfast.us/',
    image: '/static/futuro.png',
  },
  {
    title: 'Wavelens',
    tagline: 'AR & Commercial',
    slug: 'wavelens',
    description:
      'AR experiences and commercial visuals that bridge digital product storytelling with the real world.',
    roles: ['Augmented Reality', 'Commercial Visuals', 'Product Storytelling'],
    url: 'https://buildfast.us/',
    image: '/static/wavelens.png',
  },
  {
    title: 'AutoCall',
    tagline: 'AI Automation',
    slug: 'autocall',
    description:
      'AI-powered calling and automation that helps teams handle outreach and support at scale.',
    roles: ['AI Calling', 'Outreach Automation', 'Support at Scale'],
    url: 'https://buildfast.us/',
    image: '/static/autocall.png',
  },
  {
    title: 'Swifty',
    tagline: 'AI Mobile App Builder',
    slug: 'swifty',
    description:
      'An AI mobile app builder that turns product ideas into shippable native experiences faster.',
    roles: ['AI App Builder', 'Native Experiences', 'Rapid Shipping'],
    url: 'https://buildfast.us/',
    image: '/static/swifty.png',
  },
  {
    title: 'Scaly',
    tagline: 'Funnel & Marketing Automation',
    slug: 'scaly',
    description:
      'Funnel and marketing automation built to convert attention into customers without the busywork.',
    roles: ['Funnels', 'Marketing Automation', 'Conversion'],
    url: 'https://buildfast.us/',
    image: '/static/scaly.png',
  },
  {
    title: 'Easy Notes',
    tagline: 'AI Study Notes',
    slug: 'easy-notes',
    description:
      'AI study notes that turn lectures, readings, and recordings into structured material you can revise.',
    roles: ['AI Notes', 'Study Tools', 'Structured Learning'],
    url: 'https://buildfast.us/',
    image: '/static/easynotes.png',
  },
  {
    title: 'Tourify',
    tagline: 'AI Trip Planner',
    slug: 'tourify',
    description:
      'An AI trip planner that helps travelers design itineraries, discover places, and move with confidence.',
    roles: ['AI Planning', 'Itineraries', 'Travel Discovery'],
    url: 'https://buildfast.us/',
    image: '/static/tourify.png',
  },
  {
    title: 'Amply',
    tagline: 'Music Management',
    slug: 'amply',
    description:
      'Music management tools for artists and teams who need releases, assets, and workflows in one place.',
    roles: ['Release Management', 'Asset Workflows', 'Artist Tools'],
    url: 'https://buildfast.us/',
    image: '/static/amply.png',
  },
  {
    title: 'Finnygook',
    tagline: 'Freelance Workspace',
    slug: 'finnygook',
    description:
      'A freelance workspace for proposals, clients, and project ops, built to keep independent work organized.',
    roles: ['Client Ops', 'Proposals', 'Project Workflow'],
    url: 'https://buildfast.us/',
    image: '/static/finnygook.png',
  },
  {
    title: 'Steady',
    tagline: 'Calm Habit Tracker',
    slug: 'steady',
    description:
      'A calm habit tracker focused on streaks, reflection, and consistency without the noise.',
    roles: ['Habit Tracking', 'Streaks', 'Calm UX'],
    url: 'https://buildfast.us/',
  },
  {
    title: 'Paperstack',
    tagline: 'SaaS Foundation',
    slug: 'paperstack',
    description:
      'A SaaS foundation with the auth, billing, and dashboard primitives every product needs to launch.',
    roles: ['Auth & Billing', 'Dashboard', 'SaaS Starter'],
    url: 'https://buildfast.us/',
  },
];

export function getProjectBySlug(slug) {
  return projects.find(project => project.slug === slug);
}
