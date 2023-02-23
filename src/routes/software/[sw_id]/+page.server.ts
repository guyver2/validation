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




/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    console.log("form data: ", data);
    const name = data.get('name');
    const description = data.get('description');
    const status = data.get('status');
    const ownerId = data.get('ownerId');

    // if(name && ['ACTIVE', 'INACTIVE'].includes(status) ) {
    //   await db.software.create({
    //               data: {
    //                 name: name,
    //                 description: description ?? undefined,
    //                 status: status??undefined,
    //                 owner :  { connect: { id: ownerId } }
    //               }
    //             });

    return {success: true};
    // } else {
    //   return fail(400, { invalid_input: true });
    // }
  },

};