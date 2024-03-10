// ----------------------------------------------------------------------

const name = localStorage.getItem('name');

export const account = {
  displayName: name || 'Anonymous',
  email: `${name}@minimals.cc`,
  photoURL: '/assets/images/avatars/avatar_25.jpg',
};
