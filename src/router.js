import { createRouter, createWebHistory } from 'vue-router';
import MainPage from "./pages/MainPage.vue";
import ProfilePage from "./pages/ProfilePage.vue";
import AuthPage from "./pages/AuthPage.vue";
import AboutPage from "./pages/AboutPage.vue";
import Reviews from "./pages/Reviews.vue";
import Services from "./pages/Services.vue";
import EventDetails from "./pages/EventDetails.vue";
import Logout from "./pages/Logout.vue";
import CreateEventForm from "./pages/CreateEventForm.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: MainPage
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfilePage
        },
        {
          path: '/auth',
          name: 'auth',
          component: AuthPage
        },
        {
          path: '/about',
          name: 'about',
          component: AboutPage
        },
        {
          path: '/reviews',
          name: 'reviews',
          component: Reviews
        },
        {
            path: '/services',
            name: 'services',
            component: Services,
        },
        {
            path: "/event/:id", // :id будет динамическим параметром
            name: "EventDetails",
            component: EventDetails,
            props: true,
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout
        },
        {
            path: '/CreateForm',
            name: 'CreateForm',
            component: CreateEventForm
        },
    ]
});

export default router;