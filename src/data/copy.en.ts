import type { Copy } from './types';

/**
 * 英語版コピー。モックアップ（docs/mockup_en.pdf）の文言を基に、
 * 誤字修正と軽い言い回し調整を加えたもの。
 */
export const en: Copy = {
  meta: {
    title: 'Yusuke Katahara | bigdogdig.com',
    description:
      'A portfolio of Yusuke Katahara, a doctoral student in engineering. Dream big, be your dog, dig deeper.',
  },

  nav: [
    {
      id: 'about',
      label: 'ABOUT ME',
      target: 'who-i-am',
      subs: [
        { id: 'who-i-am', label: 'Who I am' },
        { id: 'how-i-work', label: 'How I work' },
        { id: 'what-i-do', label: 'What I do' },
      ],
    },
    { id: 'skills', label: 'SKILLS', target: 'skills' },
    {
      id: 'projects',
      label: 'PROJECTS',
      target: 'tavns',
      subs: [
        { id: 'tavns', label: 'taVNS' },
        { id: 'v-effect', label: 'V EFFECT' },
      ],
    },
    {
      id: 'moonshot',
      label: 'MOONSHOT',
      target: 'goals',
      subs: [
        { id: 'goals', label: 'GOALs' },
        { id: 'milestones', label: 'MILESTONES' },
      ],
    },
    { id: 'contact', label: 'CONTACT', target: 'contact' },
  ],

  hero: {
    lines: ['DREAM BIG', 'BE YOUR DOG', 'DIG DEEPER'],
    tagline: 'A portfolio of Yusuke Katahara, a doctoral student in engineering.',
    social: [
      { label: 'LinkedIn', key: 'linkedin' },
      { label: 'GitHub', key: 'github' },
      { label: 'researchmap', key: 'researchmap' },
    ],
  },

  who: {
    name: 'Yusuke Katahara',
    triad: [
      { verb: 'DIG', noun: 'Researcher' },
      { verb: 'BUILD', noun: 'Engineer' },
      { verb: 'TEST', noun: 'Analyst' },
    ],
    tabs: { career: 'Career', style: 'Style', hobbies: 'Hobbies' },
    career: [
      { year: '2002', label: 'Born in Niigata, Japan' },
      { year: '2021', label: 'Enrolled in Engineering, Niigata Univ.' },
      { year: '2024', label: 'Early graduation (in 3 years)' },
      { year: '2026.03', label: "Master's degree" },
      { year: '2026.04', label: 'Doctoral student' },
      { year: '2026.10', label: 'First-author paper published in Scientific Reports' },
    ],
    style: {
      lead: 'How I think, whatever the problem is.',
      points: [
        { title: 'First principles', body: 'Break the problem down to what is certainly true, then rebuild from there.' },
        { title: 'Abduction', body: 'Start from the surprising fact. Guess the most plausible explanation, then test it.' },
        { title: 'Inverse problems', body: 'Start from the outcome you want, and work backwards to the cause.' },
        { title: 'Feedback theory', body: 'Design the loop, not the single step. What is measured, and what corrects it?' },
        { title: 'TRIZ', body: 'Treat contradictions as the raw material of invention, not as a dead end.' },
        { title: 'Bisociation', body: 'Cross ideas from distant fields. Physiology meets software, research meets business.' },
        { title: 'Game theory', body: 'Read the incentives of everyone involved before deciding the move.' },
        { title: 'Shortest path', body: 'Find the critical path first. Everything else is optional.' },
      ],
    },
    hobbies: [
      { label: 'Games', note: 'Teamfight Tactics / Civilization VI / Minecraft / many FPS titles' },
      { label: 'Food' },
      { label: 'Fitness', note: 'Bodyweight training & gym' },
      { label: 'Music' },
    ],
  },

  how: {
    title: 'Your Dream is OUR Dream',
    lead: ['Have you shrunk your dream to fit "reality"?', 'You used to dream bigger, right?'],
    body: ["I treat today's tasks as steps toward your original dream.", "Not a contractor. Not a stand-in. I'm a buddy!"],
    close: [
      'As a buddy, I build something better by sharing the situation and talking it through with you.',
      "I don't simply build what I'm told,",
      'nor do I bend your idea into a product shaped by my own philosophy.',
      'I aim to DIG deep, reveal the essence of each idea,',
      'and challenge common assumptions.',
      'I create something unique to each project.',
    ],
  },

  what: {
    title: 'EMPOWER',
    lead: 'I create an environment where people succeed on their own.',
    tabs: { clients: 'For Clients', recruiters: 'For Recruiters' },
    clients: {
      headline: "You'll be able to build it yourself.",
      body: 'I work WITH YOU until you can go on your own, not just build the product you asked for.',
      giveLabel: 'I give you:',
      gives: [
        'A building environment',
        'Development skills',
        'How to release',
        'Security advice',
        'Ongoing support after launch, and more',
      ],
    },
    recruiters: {
      steps: [
        {
          title: '1. Find Clarity',
          body:
            'I define the goal, choose the right approach, identify bottlenecks and research the market. Then I build the first hypothesis, and generate original ideas.',
        },
        {
          title: '2. Design to Learn',
          body: 'In a VUCA world, LEARNING is the only part of the cycle that compounds over time.',
        },
        {
          title: '3. Enable',
          body:
            'I design projects that run on their own, freeing up time and resources. That lets me work across multiple projects, carrying the asset of "Learning" with me.',
        },
      ],
    },
    caseStudy: { prefix: 'Case study:', label: 'App development, V EFFECT', target: 'v-effect' },
  },

  skills: {
    knowledgeTitle: 'Knowledge',
    knowledge: ['Information Engineering', 'Data Analysis', 'Control Engineering', 'Biomedical Engineering', 'Physiology'],
    toolsTitle: 'Tools',
    tools: [
      { title: 'Build, Analyze', items: ['C (5 years)', 'MATLAB (3 years)', 'Python (3 years)', 'LabVIEW (Basic)'] },
      { title: 'AI-assisted development', items: ['AI agents, Markdown, Vibe coding'] },
      { title: 'Visualize', items: ['Adobe Illustrator', 'Blender'] },
    ],
  },

  projects: [
    {
      id: 'tavns',
      name: 'taVNS',
      tagline: 'the main theme I study in the lab',
      overview: [
        'Non-invasive neuromodulation is a technology that controls physiological functions by stimulating through the skin. Our team aims to improve quality of life (QOL) with this technology.',
      ],
      role: [
        'Measuring and analysing physiological internal states that cannot be seen directly, then interpreting them from an engineering perspective.',
      ],
      footnote:
        'Original paper: Katahara, Y., Iijima, A. & Tainaka, K. Acute transcutaneous auricular vagus nerve stimulation is associated with lower baroreflex sensitivity without detectable Mayer-wave coherence change: an exploratory study. {paper} 16, 30321 (2026). DOI: 10.1038/s41598-026-71625-9 — 13,000 accesses in its first two weeks.',
      links: [
        { key: 'paper', label: 'Scientific Reports', url: 'https://doi.org/10.1038/s41598-026-71625-9' },
      ],
      plates: [
        {
          visual: 'tavns-why',
          weight: 1.25,
          title: 'Why the ear',
          caption:
            'Implanted VNS reaches the vagus nerve through surgery in the neck. taVNS reaches the same nerve from the outside, with a clip on the ear.',
        },
        {
          visual: 'tavns-rig',
          weight: 1.8,
          title: 'The rig',
          caption:
            'A single session records eight channels at once: ECG, pulse wave, respiration, skin conductance, pupil diameter, continuous blood pressure, and wearable ECG and PPG.',
        },
        {
          visual: 'tavns-panel',
          title: 'The instrument',
          caption:
            'The recording software I built. Four live waveforms, the stimulation phase running pre to post, and one timer that keeps every channel on the same clock.',
        },
      ],
    },
    {
      id: 'v-effect',
      name: 'V EFFECT',
      tagline: 'an app development, a case of empowering a developer',
      overview: [
        'V EFFECT is a new kind of social app focused on habits. It uses the "Winner Effect", where a small win encourages the next win. It\'s available on the {appstore} and on the {web}.',
      ],
      role: [
        'I set up the initial development environment and supported a friend with no dev experience, introducing Git and AI tools and helping launch it. Now he leads development and operations, while I advise on security and tech issues, and do case research.',
      ],
      links: [
        { key: 'appstore', label: 'App Store', url: 'https://apps.apple.com/jp/app/v-effect/id6763709764' },
        { key: 'web', label: 'web', url: 'https://veffect.web.app/' },
      ],
      plates: [
        {
          visual: 'veffect-app',
          title: 'It shipped',
          caption:
            'Not a prototype. V EFFECT is on the App Store, released and run day to day by the developer I handed it to.',
        },
        {
          visual: 'veffect-growth',
          title: 'The winner effect',
          caption:
            'The mechanic underneath it. One small win raises the odds of the next, so effort compounds instead of resetting to zero.',
        },
      ],
    },
  ],

  goals: {
    kicker: 'MOONSHOT',
    headline: 'EVERYONE HAS A CHANCE.',
    pillars: [
      { label: 'CHOICE', visual: 'choice' },
      { label: 'ACTION', visual: 'action' },
      { label: 'CONTINUITY', visual: 'continuity' },
    ],
  },

  milestones: {
    goals: [
      {
        title: 'Earn a Ph.D.',
        milestones: [
          { label: 'be a doctoral student', done: true },
          { label: 'publish first paper', done: true },
          { label: 'publish more papers' },
          { label: 'earn a Ph.D.' },
        ],
      },
      {
        title: 'Manage 2 or more projects',
        milestones: [{ label: 'join any team', done: true }, { label: 'be a manager' }, { label: 'join another team' }],
      },
      {
        title: 'Found a company',
        milestones: [{ label: 'found a company' }, { label: 'keep it growing for one year' }],
      },
      {
        title: 'Sustain multiple projects based on the GOALs',
        milestones: [{ label: 'build other companies' }, { label: 'run them without my direct work' }],
      },
      {
        title: 'Launch a foundation',
        milestones: [
          { label: 'launch a foundation' },
          { label: 'support 20 or more people' },
          { label: 'half of the fellows make their dreams come true' },
        ],
      },
      {
        title: 'Remove structural barriers',
        milestones: [
          { label: 'economic barrier' },
          { label: 'technology barrier' },
          { label: 'education barrier' },
          { label: 'information barrier' },
        ],
      },
      {
        title: 'Make their background their strength',
        milestones: [{ label: 'everyone is proud of their background' }],
      },
    ],
  },

  contact: {
    title: "Let's DIG with me",
    tabs: { clients: 'For clients', recruiters: 'For recruiters' },
    form: {
      name: 'What can I call you?',
      contact: 'How can I connect with you?',
      contactHint: 'e-mail, LinkedIn, X, anything that reaches you',
      source: 'Where did you find me?',
      dream: 'What is your DREAM?',
      submit: 'Make Your Dreams Come True',
      sending: 'Sending…',
      done: "Sent. Thank you! I'll get back to you soon.",
      error: 'Failed to send. Please try again later, or reach me on LinkedIn.',
    },
    letter: {
      opening: ['Thank you for your interest in me.', "I'm currently looking for my first full-time position."],
      facts: [
        { label: 'Available from:', values: ['April 2029'] },
        { label: 'Employment:', values: ['Full-time'] },
        { label: 'Location:', values: ['Japan, nationwide', 'On-site / Hybrid / Remote'] },
        {
          label: 'International:',
          values: ['Open to international opportunities', 'English communication possible: text-based preferred.'],
        },
        {
          label: "I'm interested in:",
          values: [
            'Occupations: Research Engineer / Product Manager / Technical Project Manager / R&D',
            'Fields: Healthcare / Medical Technology / others',
          ],
        },
      ],
      closing: [
        'By working across multiple projects, I hope to draw on that interdisciplinary experience to create entirely new inventions that will bring happiness to humanity.',
        'I look forward to hearing from you.',
        'Best regards,',
      ],
      signature: 'Yusuke Katahara',
      emailLabel: 'e-mail:',
    },
  },

  footer: { copyright: '© 2026 Yusuke Katahara' },

  a11y: {
    skip: 'Skip to content',
    nav: 'Sections',
    menu: 'Menu',
    close: 'Close',
    done: 'done',
    todo: 'not yet',
  },
};
