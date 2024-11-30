import DbService from '@/lib/db/dbService';
import { AuthService } from '@/lib/auth/authService';

const providers = {
  github: {
    tokenUrl: 'https://github.com/login/oauth/access_token',
    clientId: import.meta.env.GITHUB_CLIENT_ID,
    clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
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

  try {
    const code = url.searchParams.get('code');
    if (!code) {
      throw new Error('Código de autorização não fornecido');
    }

    // Trocar o código por um token de acesso
    const tokenResponse = await fetch(config.tokenUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code: code,
        redirect_uri: `${import.meta.env.PUBLIC_API_URL}/api/auth/${provider}/callback`
      })
    });

    console.log('Resposta do token:', tokenResponse.status);
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error('Token de acesso não recebido');
    }

    // Obter informações do usuário do GitHub
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
      }
    });

    const userInfo = await userResponse.json();

    // Obter email do usuário
    const emailsResponse = await fetch('https://api.github.com/user/emails', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
      }
    });

    const emails = await emailsResponse.json();
    const primaryEmail = emails.find(email => email.primary)?.email;

    if (!primaryEmail) {
      throw new Error('Email primário não encontrado');
    }

    // Conectar ao banco de dados
    const db = await DbService.connectToDb();
    const usersCollection = db.collection('users');

    // Procurar usuário existente
    let user = await usersCollection.findOne({
      $or: [
        { email: primaryEmail },
        { oauthId: userInfo.id.toString(), oauthProvider: 'github' }
      ]
    });

    if (!user) {
      // Criar novo usuário
      user = {
        username: userInfo.login,
        email: primaryEmail,
        points: 0,
        permissions: ['user'], // Default permissions
        oauthProvider: 'github',
        oauthId: userInfo.id.toString(),
        createdAt: new Date(),
        avatarUrl: userInfo.avatar_url
      };

      const result = await usersCollection.insertOne(user);
      user._id = result.insertedId;
    } else {
      // Atualizar informações do usuário existente
      await usersCollection.updateOne(
        { _id: user._id },
        {
          $set: {
            username: userInfo.login,
            avatarUrl: userInfo.avatar_url,
            lastLogin: new Date()
          }
        }
      );
    }

    // Gerar tokens JWT
    const { accessToken: jwt, refreshToken } = AuthService.generateTokens(user);
    console.log('Tokens gerados:', { jwt: 'presente', refreshToken: 'presente' });

    // Configurar cookies
    const cookieOptions = 'HttpOnly; Path=/; SameSite=Lax; Secure';
    const headers = new Headers();
    headers.append('Set-Cookie', `refreshToken=${refreshToken}; ${cookieOptions}`);
    headers.append('Location', '/');

    console.log('Redirecionando com cookie configurado');

    return new Response(null, {
      status: 302,
      headers
    });

  } catch (error) {
    console.error('Erro no callback github:', error);
    return new Response(
      JSON.stringify({ message: 'Erro na autenticação: ' + error.message }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
