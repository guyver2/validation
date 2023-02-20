

export type softwareData = {
  id: string | undefined;
  name: string | undefined;
  status: string | undefined;
};

export const defaultSoftwareData = {
  id : undefined,
  name : undefined,
  status : undefined,
};



export async function getSoftware(user: softwareData = defaultSoftwareData) {
  const params = [] as string[];
  for (const key in user) {
    if (user[key as keyof softwareData]) {
      params.push(`${key}=${encodeURIComponent(user[key])}`);
    }
  }

  if(params){
    return fetch(`/api/software?${params.join('&')}`);
  } else {
    return fetch('/api/software')
  }
}