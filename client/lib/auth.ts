export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isAuth') === 'true';
}

export function login() {
  localStorage.setItem('isAuth', 'true');
}

export function logout() {
  localStorage.removeItem('isAuth');
}
