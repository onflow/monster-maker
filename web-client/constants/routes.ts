const API_ROOT =
  process.env.NEXT_PUBLIC_API_ROOT || 'https://monster-maker-wine.vercel.app';
// https://monster-maker.vercel.app

const ROUTES = {
  // Frontend routes
  HOME: '/',
  INITIALIZE: '/initialize',
  CREATE: '/create',
  VIEW: '/view',

  // API routes
  API_SIGN_AS_MINTER: `${API_ROOT}/api/signAsMinter`,
  API_SIGN_AS_MINTER_INFO: `${API_ROOT}/api/signAsMinter/info`,
};

export default ROUTES;
