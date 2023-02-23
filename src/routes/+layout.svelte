<script>
	// import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';
	import TopBar from '../components/TopBar.svelte';
	import { Toast } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="header"><TopBar /></svelte:fragment>
	<!-- <svelte:fragment slot="sidebarLeft"><Sidebar /></svelte:fragment> -->
	<!-- Router Slot -->
	<slot />
</AppShell>
<Toast />
