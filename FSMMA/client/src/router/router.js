import Vue from "vue";
import VueRouter from "vue-router";
import StudentLogin from "../views/StudentLogin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "studentlogin",
    component: StudentLogin,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/admin-login",
    name: "AdminLogin",
    component: () => import("../views/AdminLogin.vue"),
  },
  {
    path: "/student-login",
    name: "StudentLogin",
    component: () => import("../views/StudentLogin.vue"),
  },
  {
    path: "/student-create-account",
    name: "StudentCreateAccount",
    component: () => import("../views/StudentCreateAccount.vue"),
  },
  {
    path: "/instructor-create-account",
    name: "InstructorCreateAccount",
    component: () => import("../views/InstructorCreateAccount.vue"),
  },
  {
    path: "/student-home",
    name: "StudentHome",
    component: () => import("../views/StudentHome.vue"),
  },
  {
    path: "/admin-view-student/:id",
    name: "AdminViewStudent",
    component: () => import("../views/AdminViewStudent.vue"),
  },
  {
    path: "/admin-view-student-search",
    name: "AdminViewStudentSearch",
    component: () => import("../views/AdminViewStudentSearch.vue"),
  },
  {
    path: "/view-instructor/:id",
    name: "AdminViewInstructor",
    component: () => import("../views/AdminViewInstructor.vue"),
  },
  {
    path: "/admin-view-instructor-search",
    name: "AdminViewInstructorSearch",
    component: () => import("../views/AdminViewInstructorSearch.vue"),
  },
  {
    path: "/student-buy-session",
    name: "StudentBuySession",
    component: () => import("../views/StudentBuySession.vue"),
  },
  {
    path: "/student-history",
    name: "StudentHistory",
    component: () => import("../views/StudentHistory.vue"),
  },
  {
    path: "/student-schedule-page",
    name: "StudentSchedulePage",
    component: () => import("../views/StudentSchedulePage.vue"),
  },
  {
    //router for Admin View/Edit Instructor
    path: "/instructor-create",
    name: "InstructorCreate",
    //component: () => import('../views/InstructorCreate.vue')
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/test.vue"),
  },
  {
    path: "/admin-home",
    name: "AdminHome",
    component: () => import("../views/AdminHome.vue"),
  },
  {
    path: "/admin-schedule",
    name: "AdminSchedule",
    component: () => import("../views/AdminSchedule.vue"),
  },
  {
    path: "/instructor-schedule",
    name: "ViewOfInstructorSchedule",
    component: () => import("../views/InstructorViewSchedule.vue"),
  },
  {
    path: "/StudentInformation",
    name: "StudentInformation",
    component: () => import("../views/StudentInformation.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
