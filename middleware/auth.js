export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth();
  const localePath = useLocalePath();
  const runtimeConfig = useRuntimeConfig();

  const hideGUAuthParamName = runtimeConfig.public.hideGUAuthParamName;

  if (status.value === "authenticated" && to.path === "/login") {
    return navigateTo(localePath("/" + "error"), {
      replace: true,
    });
  } else if (status.value === "unauthenticated" && to.path !== "/login") {
    return navigateTo(
      localePath({
        path: "/login",
        replace: true,
        query: {
          redirect: to.fullPath,
          [hideGUAuthParamName]: to.query[hideGUAuthParamName] || null, // pa ss the hideGUAuth param if it exists in the original route
        }, // 👈 store original route
      }),
    );
  }
});
