const groups = [
  {
    name: 'The Lanisters',
    description: 'We always pay or debts...',
    admins: ['tywin@lanister.com'],
    type: 'birthday',
    users: [
      'joffrey@lanister.com',
      'jaime@lanister.com',
      'cersei@lanister.com',
      'tyrion@lanister.com'
    ]
  },
  {
    name: 'The North',
    description: 'King in the North!',
    admins: ['ned@winterfell.com'],
    type: 'birthday',
    users: [
      'catelyn@winterfell.com',
      'jon@bastards.com',
      'sansa@winterfell.com',
      'arya@winterfell.com',
      'robb@winterfell.com',
      'theon@reek.com',
    ]
  },
  {
    name: 'Sneeky guys',
    description: 'We only want to help',
    admins: ['varys@spiders.com', 'petyr@notsolittle.com'],
    type: 'birthday',
    users: [],
  },

];

module.exports = groups;
