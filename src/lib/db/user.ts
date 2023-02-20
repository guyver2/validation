

export type userData = {
  id: string | undefined;
  name: string | undefined;
  email: string | undefined;
};

export const defaultUserData = {
  id : undefined,
  name : undefined,
  email : undefined,
};



export async function getUsers(user: userData = defaultUserData) {
  const params = [] as string[];
  for (const key in user) {
    if (user[key as keyof userData]) {
      params.push(`${key}=${encodeURIComponent(user[key])}`);
    }
  }

  if(params){
    return fetch(`/api/user?${params.join('&')}`);
  } else {
    return fetch('/api/user')
  }
}