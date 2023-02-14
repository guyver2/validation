import { db } from '$lib/server/db/client'


const users = [
  {name: 'Antoine', email: 'antoine@gmail.com'},
  {name: 'test', email: 'test@gmail.com'},
];


export async function GET() {
  for (const user of users) {
    await db.User.upsert({
      where: {
        email: user.email,
      },
      update: {},
      create: {
        name: user.name,
        email: user.email,
      },
    });
  }

  return new Response(JSON.stringify({}), { status: 200 });
}
