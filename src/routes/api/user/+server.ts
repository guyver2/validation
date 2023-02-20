import { db } from '$lib/server/db/client'
import { hashPassword } from '$lib/server/db/password';


export const GET = async ({ url }) => {

  const name = url.searchParams.get('name') ?? undefined;
  const email = url.searchParams.get('email') ?? undefined;
  const id = url.searchParams.get('id') ?? undefined;
  
  const data = await db.user.findMany({
                where: {
                  name: {
                    contains: name,
                    mode: 'insensitive',
                  },
                  email: {
                    contains: email,
                    mode: 'insensitive',
                  },
                  id: id,
                },
                orderBy: [
                  {
                    updatedAt: 'desc',
                  },
                ],
              });

  return new Response(JSON.stringify(data), { status: 200 });
};


 
export async function POST({ request }) {
  let input = {};
  try {
    input = await request.json();
    const { name, email, password } = input;
    const data = await db.user.create({
                  data: {
                    name: name,
                    email: email,
                    password: await hashPassword(password)
                  }
                });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
      return new Response(JSON.stringify({error: "invalid data for User creation", data: input}), { status: 400 });
  }
}