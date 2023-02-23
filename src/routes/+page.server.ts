import type { PageServerLoad } from './$types';

import { db } from '$lib/server/db/client'
import { fail } from '@sveltejs/kit';


export const load = (async () => {
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

    if(name && ['ACTIVE', 'INACTIVE'].includes(status) ) {
      await db.software.create({
                  data: {
                    name: name,
                    description: description ?? undefined,
                    status: status??undefined,
                    owner :  { connect: { id: ownerId } }
                  }
                });

    return {success: true};
    } else {
      return fail(400, { invalid_input: true });
    }
  },

};