import { db } from '$lib/server/db/client'


export const GET = async ({ url }) => {

  const name = url.searchParams.get('name');
  const id = url.searchParams.get('id');
  const status = url.searchParams.get('status');

  const data = await db.Software.findMany({
                where: {
                  name: {
                    contains: name == null ? undefined : name,
                    mode: 'insensitive',
                  },
                  status: status == null ? undefined : status,
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
    const { name, description, ownerId } = input;
    const data = await db.Software.create({
                  data: {
                    name: name,
                    description: description,
                    owner :  { connect: { id: ownerId } }
                  }
                });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
      return new Response(JSON.stringify({error: "invalid data for Software creation", data: input}), { status: 400 });
  }
}