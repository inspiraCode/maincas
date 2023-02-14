// pages/api/auth/[...auth0].js
import { handleAuth, handleLogin, GetAccessToken } from '@auth0/nextjs-auth0';

export default handleAuth();

// export default handleAuth({
//   login: handleLogin({
//     authorizationParams: {
//       audience: 'https://api.example.com/products', // or AUTH0_AUDIENCE
//       // Add the `offline_access` scope to also get a Refresh Token
//       scope: 'openid profile email read:products' // or AUTH0_SCOPE
//     }
//   })
// });
