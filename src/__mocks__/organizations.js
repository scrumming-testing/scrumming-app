import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    createdAt: 1555016400000,
    avatarUrl: '/static/images/organizations/intel.png',
    name: 'Intel',
    owner: 'Ekaterina Tankova'
  },
  {
    id: uuid(),
    createdAt: 1555016400000,
    avatarUrl: '/static/images/organizations/ibm.png',
    name: 'IBM',
    owner: 'Anje Keizera'
  },
  {
    id: uuid(),
    createdAt: 1555016400000,
    avatarUrl: '/static/images/organizations/facebook.png',
    name: 'Facebook',
    owner: 'Alexa Richardson'
  },
];
