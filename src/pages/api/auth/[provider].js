import DbService from '@/lib/db/dbService';
import { AuthService } from '@/lib/auth/authService';
import { createUserProfile } from '@/models/user';

const providers = {
  google: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    clientId: import.meta.env.GOOGLE_CLIENT_ID,
    clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
  },
  github: {
    authUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    clientId: import.meta.env.GITHUB_CLIENT_ID,
    clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    scope: 'read:user user:email',
  }
};

export const GET = async ({ params, url, redirect }) => {
  const { provider } = params;
  const config = providers[provider];

  if (!config) {
    return new Response(
      JSON.stringify({ message: 'Provedor não suportado' }),
      { 
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  // Construir URL de autorização
  const authUrl = new URL(config.authUrl);
  authUrl.searchParams.append('client_id', config.clientId);
  authUrl.searchParams.append('redirect_uri', `${import.meta.env.PUBLIC_API_URL}/api/auth/${provider}/callback`);
  authUrl.searchParams.append('scope', config.scope);
  authUrl.searchParams.append('response_type', 'code');

  // Redirecionar para página de autorização
  return redirect(authUrl.toString());
};
