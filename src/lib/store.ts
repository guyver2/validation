	import { writable } from 'svelte/store';
	export const breadcrumb = writable([{ label: 'Home', link: '/' }]);


  export function setCrumbs(sw:{name: string, id: string}|undefined=undefined, release_id:string|undefined=undefined) {
    const crumbs = [{ label: 'Home', link: '/' }];
    if(sw) {
      crumbs.push({label: sw.name, link: `/software/${sw.id}`});
      if(release_id) {
        crumbs.push({label: 'Release', link: `/release/${release_id}`});
      }
    }
    breadcrumb.set(crumbs);
  }