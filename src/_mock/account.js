// ----------------------------------------------------------------------

const name = localStorage.getItem('name');

export const account = {
  displayName: name || 'Anonymous',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_25.jpg',
};
