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
      'tyrion@lanister.com',
    ]
  },
  {
    name: 'Stark Family',
    avatar: 'starks.jpg',
    description: 'King in the North!',
    admins: ['ned@winterfell.com'],
    type: 'birthday',
    users: [
      'catelyn@winterfell.com',
      'jon@bastards.com',
      'sansa@winterfell.com',
      'arya@winterfell.com',
      'robb@winterfell.com',
    ]
  },
  {
    name: 'Little trip to the Wall',
    avatar: 'the_wall.jpg',
    description: 'Wouldn\'t it be nice to visit the wall?',
    admins: ['ned@winterfell.com'],
    type: 'trip',
    users: [
      'samwell@nightwatch.com',
      'jon@bastards.com',
    ]
  },
  {
    name: 'Lanisters vs Starks',
    avatar: 'kings_landing.jpg',
    description: 'what about a football game?',
    admins: ['ned@winterfell.com'],
    type: 'game',
    users: [
      'joffrey@lanister.com',
      'jaime@lanister.com',
      'cersei@lanister.com',
      'tyrion@lanister.com',
      'catelyn@winterfell.com',
      'jon@bastards.com',
      'sansa@winterfell.com',
      'arya@winterfell.com',
      'robb@winterfell.com',
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
