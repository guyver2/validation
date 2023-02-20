import { db } from '$lib/server/db/client'


export const GET = async ({ url }) => {

  const softwareId = url.searchParams.get('softwareId') as string;
  const id = url.searchParams.get('id') ?? undefined;
  const version = url.searchParams.get('version') ?? undefined;
  const status = url.searchParams.get('status') ?? undefined;
  try {
    const data = await db.release.findMany({
                  where: {
                    software: {id: softwareId},
                    version: {
                      contains: version,
                      mode: 'insensitive',
                    },
                    status: status,
                    id: id,
                  },
                  orderBy: [
                    {
                      version: 'desc',
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
    const { softwareId, version, releaseDate, createdById } = input;
    const data = await db.release.create({
                  data: {
                    software :  {connect: {id: softwareId}},
                    version: version,
                    releaseDate: releaseDate ? new Date(releaseDate) : undefined,
                    createdBy :  { connect: { id: createdById } }
                  }
                });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({status: "invalid data for Release creation.", error: error, data: input}), { status: 400 });
  }
}