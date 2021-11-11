import Vue from "vue";
import VueRouter from "vue-router";
import StudentLogin from "../views/StudentLogin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "StudentLogin",
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
    path: "/adminlogin",
    name: "AdminLogin",
    component: () => import("../views/AdminLogin.vue"),
  },
  {
    path: "/studentlogin",
    name: "StudentLogin",
    component: () => import("../views/StudentLogin.vue"),
  },
  {
    path: "/StudentCreateAccount",
    name: "StudentCreateAccount",
    component: () => import("../views/StudentCreateAccount.vue"),
  },
  {
    path: "/InstructorCreateAccount",
    name: "InstructorCreateAccount",
    component: () => import("../views/InstructorCreateAccount.vue"),
  },
  {
    path: "/StudentHome",
    name: "StudentHome",
    component: () => import("../views/StudentHome.vue"),
  },
  {
    path: "/AdminViewStudent/:id",
    name: "AdminViewStudent",
    component: () => import("../views/AdminViewStudent.vue"),
  },
  {
    path: "/AdminViewStudentSearch",
    name: "AdminViewStudentSearch",
    component: () => import("../views/AdminViewStudentSearch.vue"),
  },
  {
    path: "/viewinstructor/:id",
    name: "AdminViewInstructor",
    component: () => import("../views/AdminViewInstructor.vue"),
  },
  {
    path: "/AdminViewInstructorSearch",
    name: "AdminViewInstructorSearch",
    component: () => import("../views/AdminViewInstructorSearch.vue"),
  },
  {
    path: "/StudentBuySession",
    name: "StudentBuySession",
    component: () => import("../views/StudentBuySession.vue"),
  },
  {
    path: "/StudentHistory",
    name: "StudentHistory",
    component: () => import("../views/StudentHistory.vue"),
  },
  {
    path: "/StudentSchedulePage",
    name: "StudentSchedulePage",
    component: () => import("../views/StudentSchedulePage.vue"),
  },
  {
    //router for Admin View/Edit Instructor
    path: "/InstructorCreate",
    name: "InstructorCreate",
    //component: () => import('../views/InstructorCreate.vue')
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/test.vue"),
  },
  {
    path: "/AdminHome",
    name: "AdminHome",
    component: () => import("../views/AdminHome.vue"),
  },
  {
    path: "/AdminSchedule",
    name: "AdminSchedule",
    component: () => import("../views/AdminSchedule.vue"),
  },
  {
    path: "/InstructorSchedule",
    name: "ViewOfInstructorSchedule",
    component: () => import("../views/InstructorViewSchedule.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
