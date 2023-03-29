const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/chat",
    component: () => import("pages/ChatPage.vue"),
  },
  {
    path: "/image",
    component: () => import("pages/ImagePage.vue"),
  },
  {
    path: "/setup",
    component: () => import("pages/SetupPage.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
