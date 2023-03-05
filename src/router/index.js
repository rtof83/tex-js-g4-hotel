import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },

  {
    path: "/admin2",
    name: "admin2",
    component: () => import("@/views/AdminView.vue"),
  },

  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
  },
  {
    path: "/accommodations",
    name: "accommodations",
    component: () => import("@/views/AccommodationsView.vue"),
  },
  {
    path: "/reservations",
    name: "reservations",
    component: () => import("@/views/ReservationsView.vue"),
  },
  {
    path: "/reservations/:id",
    name: "reservationsId",
    component: () => import("@/views/ReservationsView.vue"),
    props: true
  },
  {
    path: "/my-reservations",
    name: "my-reservations",
    component: () => import("@/views/MyReservationsView.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/ContactView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/ReportView.vue"),
  },
  {
    path: "/accommodation/:id",
    name: "accomodation",
    component: () => import("@/views/AccommodationView.vue"),
    props: true
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
