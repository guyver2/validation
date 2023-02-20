import { db } from '$lib/server/db/client'


export const GET = async ({ url }) => {

  const name = url.searchParams.get('name') ?? undefined;
  const id = url.searchParams.get('id') ?? undefined;
  const status = url.searchParams.get('status') ?? undefined;

  const data = await db.software.findMany({
                where: {
                  name: {
                    contains: name,
                    mode: 'insensitive',
                  },
                  status: status,
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
    const { name, description, ownerId } = input;
    const data = await db.software.create({
                  data: {
                    name: name,
                    description: description ?? undefined,
                    owner :  { connect: { id: ownerId } }
                  }
                });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
      return new Response(JSON.stringify({error: "invalid data for Software creation", data: input}), { status: 400 });
  }
}