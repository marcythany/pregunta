export const POST = async () => {
  const headers = new Headers();
  headers.append('Set-Cookie', 'refreshToken=; HttpOnly; Path=/; Max-Age=0');

  return new Response(null, {
    status: 200,
    headers
  });
};
