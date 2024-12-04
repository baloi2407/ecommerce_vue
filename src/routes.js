import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Products from "./components/Products.vue";
import ProductDetails from "./components/ProductDetails.vue";
import Cart from "./components/Cart.vue";
import Payment from "./components/Payment.vue";
import Thanks from "./components/Thanks.vue";
import Profile from "./components/Profile.vue";
import About from "./components/About.vue";
import Contact from "./components/Contact.vue";
import WishList from "./components/WishList.vue";
import Auth from "./components/Auth.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { title: 'Home' }
    },
    {
        path: '/products',
        name: 'Products',
        component: Products,
        meta: { title: 'Product List' }
    },
    {
        path: '/product-details/:id',
        name: 'Product Details',
        component: ProductDetails,
        meta: { title: 'Product Details' }
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart,
        meta: { title: 'Your Cart',requiresAuth: true }
    },
    {
        path: '/payment',
        name: 'Payment',
        component: Payment,
        meta: { title: 'Payment',requiresAuth: true }
    },
    {
        path: '/thanks',
        name: 'Thanks',
        component: Thanks,
        meta: { title: 'Thanks for shopping' }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { title: 'Profile',requiresAuth: true }
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: { title: 'About Us' }
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact,
        meta: { title: 'Contact Us' }
    },
    {
        path: '/wishlist',
        name: 'WishList',
        component: WishList,
        meta: { title: 'Your Wish List',requiresAuth: true }
    },
    {
        path: '/auth',
        name: 'Auth',
        component: Auth,
        meta: { title: 'Authentication' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('authToken')

    if (to.name === 'Auth' && isAuthenticated) {
        next({ name: 'Home' })
    } else if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'Auth' })
    } else {
        next()
    }
})
export default router