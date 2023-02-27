import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
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
  newRelease: async ({ request }) => {
    const data = await request.formData();
    console.log(data);
    const version = data.get('version');
    const ownerId = data.get('ownerId');
    const status = data.get('status');
    const swId = data.get('swId');
    const date = data.get('date');

    if(!version || !date){
      return fail(400, { invalid_input: true });
    }

    try {
      await db.release.create({
                  data: {
                    version: version,
                    releaseDate: new Date(date),
                    status: status,
                    createdBy :  { connect: { id: ownerId } },
                    software : { connect: {id: swId }}
                  }
                });
    } catch(err) {
      return fail(400, { invalid_input: true });
    } 
    return {success: true};
  },

  newTest: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const description = data.get('description');
    const status = data.get('status');
    const ownerId = data.get('ownerId');
    const swId = data.get('swId');

    if(!name){
      return fail(400, { invalid_input: true });
    }

    try {
      await db.test.create({
                  data: {
                    name: name,
                    description: description,
                    status: status,
                    createdBy :  { connect: { id: ownerId } },
                    software : { connect: {id: swId }}
                  }
                });
    } catch(err) {
      return fail(400, { invalid_input: true });
    } 
    return {success: true};
  },

};