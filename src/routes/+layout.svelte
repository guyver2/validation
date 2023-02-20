<script>
	// import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';
	import Sidebar from '../components/Sidebar.svelte';
</script>

<AppShell>
	<!-- <svelte:fragment slot="header">Header</svelte:fragment> -->
	<svelte:fragment slot="sidebarLeft"><Sidebar /></svelte:fragment>
	<!-- Router Slot -->
	<slot />
</AppShell>
