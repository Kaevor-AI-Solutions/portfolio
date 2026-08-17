export type Project = {
  no: string;
  slug: string;
  title: string;
  /** Shorter title used in the 393px stacked layout. */
  mobileTitle?: string;
  tags: string[];
  description: string;
  mobileDescription: string;
  outcome: string;
  mobileOutcome: string;
  image: string;
  alt: string;
  /** Editorial-asymmetry track geometry — card width and vertical offset at 1280px+. */
  width: number;
  marginTop: number;
};

/**
 * Vertical rhythm of the pinned track: odd cards ride the top of the pane, even cards
 * drop by one step, so scrolling the track reads as up · down · up · down. Width stays
 * varied (560 / 720 / 500 / 640) — that carries the editorial asymmetry, so the vertical
 * axis is free to be regular. `applyLayout` scales this with the cards and flattens it
 * entirely on short viewports.
 */
const DROP = 150;

export const PROJECTS: Project[] = [
  {
    no: '01',
    slug: 'election-calculator',
    title: 'Election Calculator',
    tags: ['Founder work', 'Civic tech', 'Data visualisation'],
    description:
      'A district-by-district simulator for exploring potential seat distribution in Sri Lanka’s 2024 parliamentary election.',
    mobileDescription: 'District-level election scenarios made explorable.',
    outcome: 'Concept to public launch in 48 hours',
    mobileOutcome: 'Public launch in 48 hours',
    image: '/assets/selected-work/election-calculator.png',
    alt: 'Election Calculator — district scenario dashboard',
    width: 560,
    marginTop: 0, // up
  },
  {
    no: '02',
    slug: 'applied-ai-systems',
    title: 'Applied AI Systems',
    tags: ['Kaevor practice', 'Agentic AI', 'RAG · Automation'],
    description:
      'Agentic workflows, retrieval systems and decision-support tools designed around real operational constraints.',
    mobileDescription: 'Observable, source-grounded AI workflows.',
    outcome: 'Production-oriented AI, not isolated demos',
    mobileOutcome: 'Production-oriented AI',
    image: '/assets/selected-work/applied-ai-systems.png',
    alt: 'Applied AI Systems — observable workflow',
    width: 720,
    marginTop: DROP, // down
  },
  {
    no: '03',
    slug: 'product-platform-engineering',
    title: 'Product Platform Engineering',
    mobileTitle: 'Product Platforms',
    tags: ['Kaevor practice', 'SaaS · Mobile · Cloud'],
    description:
      'Reliable SaaS and cross-platform products shaped from architecture through release and iteration.',
    mobileDescription: 'One system across web, mobile and cloud.',
    outcome: 'One product system across web, mobile and cloud',
    mobileOutcome: 'Built for continuous delivery',
    image: '/assets/selected-work/product-platform-engineering.png',
    alt: 'Product Platform Engineering — connected product ecosystem',
    width: 500,
    marginTop: 0, // up
  },
  {
    no: '04',
    slug: 'quality-engineering',
    title: 'Quality Engineering',
    tags: ['Kaevor practice', 'QA · Reliability'],
    description:
      'Test strategy, release checks and observability built into delivery from the first slice.',
    mobileDescription: 'Test strategy and observability from the first slice.',
    outcome: 'Confidence at every release',
    mobileOutcome: 'Confidence at every release',
    image: '/assets/selected-work/quality-engineering.png',
    alt: 'Quality Engineering — release confidence surface',
    width: 640,
    marginTop: DROP, // down
  },
];

export const PROCESS = [
  {
    no: '01',
    title: 'Systems audit',
    body: 'We map the real workflow, data boundaries and failure modes before deciding where AI belongs.',
    outputs: [
      'Workflow and data map',
      'Risk and constraint inventory',
      'Measurable outcome definition',
    ],
  },
  {
    no: '02',
    title: 'Architecture & spike',
    body: 'The riskiest assumption is built first and tested with representative data, users and traffic.',
    outputs: [
      'Architecture decision records',
      'Evaluation-ready vertical spike',
      'Security and cost envelope',
    ],
  },
  {
    no: '03',
    title: 'Build in slices',
    body: 'Short vertical releases keep product, model and platform decisions connected to working software.',
    outputs: [
      'Shippable product increments',
      'Human review where it matters',
      'Weekly evidence, not status theatre',
    ],
  },
  {
    no: '04',
    title: 'Handover & run',
    body: 'Observability, evaluation and operating knowledge ship with the product—not after it.',
    outputs: [
      'Runbooks and ownership map',
      'Model and system observability',
      'A platform your team can own',
    ],
  },
];

export type Founder = {
  name: string;
  role: string;
  /** Replace with the real profile URL — placeholder until supplied. */
  linkedin: string;
};

export const FOUNDERS: Founder[] = [
  { name: 'Abishan Jerad', role: 'CEO', linkedin: '#' },
  { name: 'Pavithiran Sivaganesh', role: 'CTO', linkedin: '#' },
  { name: 'Mathusigan Senthan', role: 'CTO', linkedin: '#' },
];

export const SERVICES = [
  {
    title: 'Applied AI engineering',
    body: 'Agentic workflows, retrieval and decision-support systems grounded in the way a team already works.',
    meta: 'Evaluation before automation',
  },
  {
    title: 'Data & model systems',
    body: 'Pipelines, context layers and model interfaces designed for traceability and change.',
    meta: 'Source-grounded by default',
  },
  {
    title: 'Product platforms',
    body: 'Typed full-stack systems that connect product experience, domain logic and cloud operations.',
    meta: 'Web, mobile and cloud',
  },
  {
    title: 'Experience engineering',
    body: 'Interfaces for complex workflows where clarity matters more than decorative novelty.',
    meta: 'Designed for the real task',
  },
  {
    title: 'Quality engineering',
    body: 'Test strategy, release checks and observability built into delivery from the first slice.',
    meta: 'Confidence at every release',
  },
  {
    title: 'Architecture & reliability',
    body: 'Boundaries, failure modes and operating playbooks that keep products maintainable after launch.',
    meta: 'Systems your team can own',
  },
];
