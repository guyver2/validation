import { db } from '$lib/server/db/client'
import { hashPassword } from '$lib/server/db/password';


export const GET = async ({ url }) => {

  const name = url.searchParams.get('name');
  const email = url.searchParams.get('email');
  const id = url.searchParams.get('id');
  
  const data = await db.User.findMany({
                where: {
                  name: {
                    contains: name == null ? undefined : name,
                    mode: 'insensitive',
                  },
                  email: {
                    contains: email == null?undefined : email,
                    mode: 'insensitive',
                  },
                  id: id == null ? undefined : id
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
    const data = await db.User.create({
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