export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();
  if (user.value === null) {
    navigateTo("/auth/login");
  }
});
