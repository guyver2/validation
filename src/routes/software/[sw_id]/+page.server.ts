import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db/client'


export const load = (async ({params}) => {
    return {
    software: await db.software.findUnique({
      where : {
        id: params.sw_id
      },
      include :{
        releases: true,
        tests: true,
      }
    }),
    releases: await db.release.findMany({
                    orderBy: [
                      {
                        version : 'desc',
                      },
                      {
                        updatedAt: 'desc',
                      },
                    ],
                    where : {
                      softwareId: params.sw_id
                    },
                    include: {
                      builds: true,
                      protocols: true
                    }
                  }),
    tests: await db.test.findMany({
                    orderBy: [
                      {
                        status : 'asc',
                      },
                      {
                        updatedAt: 'desc',
                      }, 
                    ],
                    where : {
                      softwareId: params.sw_id
                    }
                  })
      };
}) satisfies PageServerLoad;