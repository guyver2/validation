import { db } from '$lib/server/db/client'


export const GET = async ({ url }) => {

  const softwareId = url.searchParams.get('softwareId') as string;
  const id = url.searchParams.get('id') ?? undefined;
  const name = url.searchParams.get('name') ?? undefined;
  const description = url.searchParams.get('description') ?? undefined;
  const status = url.searchParams.get('status') ?? undefined;
  const isLeaf = url.searchParams.get('isLeaf') ?? undefined;

  try {
    const data = await db.test.findMany({
                  where: {
                    software: {id: softwareId},
                    name: {
                      contains: name,
                      mode: 'insensitive',
                    },
                    description: {
                      contains: description,
                      mode: 'insensitive',
                    },
                    status: status,
                    id: id,
                    children: isLeaf ? { none: {} } : { some: {} }
                  },
                  orderBy: [
                    {
                      createdAt: 'desc',
                    },
                  ],
                });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({error: 'invalid request for release'}), { status: 400 });
  }
};


 
export async function POST({ request }) {
  let input = {};
  try {
    input = await request.json();
    const { softwareId, name, description, createdById, parentId } = input;
    const data = await db.test.create({
                  data: {
                    software :  { connect: {id: softwareId} },
                    name: name,
                    description: description,
                    createdBy :  { connect: { id: createdById } },
                    parent : parentId ? { connect: { id: parentId } } : undefined,
                  }
                });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({status: "invalid data for Test creation.", error: error, data: input}), { status: 400 });
  }
}