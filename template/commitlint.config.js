// commitlint.config.js
const { threadId } = require('worker_threads');

// Tạo custom rule cho ticket pattern
const ticketRule = {
  'ticket-pattern': (parsed, when = 'always', value = /^[A-Z]+-\d+/) => {
    const { ticket } = parsed;

    if (when === 'never') {
      return [true, 'Ticket pattern is not allowed'];
    }

    if (!ticket) {
      return [false, 'Commit message must have a ticket ID (e.g., SSV-123)'];
    }

    const matches = ticket.match(value);
    return [matches !== null, 'Ticket ID must match pattern (e.g., SSV-123)'];
  },
};

module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: /^(?:([A-Z]+-\d+)\s+)?(\w*)(?:\(([\w\$\.\-\* ]*)\))?\: (.*)$/,
      headerCorrespondence: ['ticket', 'type', 'scope', 'subject'],
    },
  },
  plugins: [
    {
      rules: ticketRule,
    },
  ],
  rules: {
    'header-max-length': [2, 'always', 200],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    // 'type-case': [2, 'always'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'], //not end with .
    'ticket-pattern': [2, 'always'], // 2 means error level
    'scope-case': [2, 'always', 'lower-case'], // scope phải viết thường
    'scope-empty': [0, 'never'], // 0 = disable - scope không bắt buộc
  },
};
