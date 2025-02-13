import Cookies from 'js-cookie';

const COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
  sameSite: 'lax' as const, // Helps prevent CSRF attacks
  path: '/', // Cookie is available site-wide
  expires: 15 / 1440, // Set cookie expiry to 15 minutes (15 minutes/1440 minutes per day)
};

export const cookieUtils = {
  // Method to set tokens and roles in cookies
  setTokens: (tokens: { accessToken: string; roles: Role[] }) => {
    Cookies.set('accessToken', tokens.accessToken, COOKIE_OPTIONS);
    Cookies.set('roles', JSON.stringify(tokens.roles), COOKIE_OPTIONS);
  },

  setAccessToken: (token: { accessToken: string}) => {
    Cookies.set('accessToken', token.accessToken, COOKIE_OPTIONS);
  },

  // Method to clear tokens from cookies
  clearTokens: () => {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('roles', { path: '/' });
  },

  // Method to get the access token from cookies
  getAccessToken: () => {
    const token = Cookies.get('accessToken');
    return token || ""; // Return null if token is not found
  },

  // Method to get roles from cookies
  getRoles: () => {
    const roles = Cookies.get('roles');
    if (!roles) return null;

    try {
      return JSON.parse(roles) as Role[]; // Return parsed roles if exists
    } catch (error) {
      console.error('Error parsing roles:', error);
      return null;
    }
  },
};