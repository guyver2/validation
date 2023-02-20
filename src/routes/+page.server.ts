import { db } from '$lib/server/db/client'


/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    software: await db.software.findMany({
                    orderBy: [
                      {
                        status : 'asc',
                      },
                      {
                        updatedAt: 'desc',
                      },
                    ],
                    include: {
                      releases: true
                    }
                  })
  };
}