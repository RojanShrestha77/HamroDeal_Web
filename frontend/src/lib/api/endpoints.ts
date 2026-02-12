export const API = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        WHOAMI: "/api/auth/whoami",
        UPDATEPROFILE: "/api/auth/update-profile",
        REQUEST_PASSWORD_RESET: '/api/auth/request-password-reset',
        RESET_PASSWORD: (token: string) => `api/auth/reset-password/${token}`

    },
    ADMIN: {
        USER: {
            CREATE: '/api/admin/users',
            GET_ALL: '/api/admin/users',
            GET_ONE: (id: string) => `/api/admin/users/${id}`,
            UPDATE: (id: string) => `/api/admin/users/${id}`,
            DELETE: (id: string) => `/api/admin/users/${id}`,
            APPROVE_SELLER: (id: string) => `/api/admin/users/${id}/approve-seller`,
        },
        BLOGS: {
            GET_ALL: "/api/admin/blogs",
            GET_ONE: (id: string) => `/api/admin/blogs/${id}`,
            DELETE: (id: string) => `/api/admin/blogs/${id}`
        },
        ORDERS: {
            GET_ALL: '/api/admin/orders',
            GET_ONE: (id: string) => `/api/admin/orders/${id}`,
            UPDATE_STATUS: (id: string) => `/api/admin/orders/${id}/status`,
            DELETE: (id: string) => `/api/admin/orders/${id}`,
        }
    },
    BLOGS: {
        GET_ALL: '/api/blogs',
        GET_ONE: (id: string) => `/api/blogs/${id}`,
        CREATE: '/api/blogs',
        UPDATE: (id: string) => `/api/blogs/${id}`,
    },
    ORDERS: {
        CREATE: '/api/orders',
        GET_MY_ORDERS: '/api/orders/my-orders',
        GET_ONE: (id: string) => `/api/orders/${id}`,
        CANCEL: (id: string) => `/api/orders/${id}/cancel`,
    },
    SELLER: {
        ORDERS: {
            GET_ALL: '/api/seller/orders',
            GET_ONE: (id: string) => `/api/seller/orders/${id}`,
            UPDATE_STATUS: (id: string) => `/api/seller/orders/${id}/status`,
        }
    },
    PRODUCT: {
        CREATE: '/api/products',
        GET_MY: '/api/products/',
        GET_MY_PRODUCTS: '/api/products/my-products',
        GET_ONE: (id: string) => `/api/products/${id}`,
        UPDATE: (id: string) => `/api/products/${id}`,
        DELETE: (id: string) => `/api/products/${id}`,
        BY_CATEGORY: '/api/products/category',
        SEARCH: '/api/products/search',
    },
    CATEGORIES: {
        GET_ALL: '/api/categories',
        GET_ACTIVE: '/api/categories/active',
    },
    CART: {
        ADD: '/api/cart',
        GET: '/api/cart',
        UPDATE: (productId: string) => `/api/cart/${productId}`,
        REMOVE: (productId: string) => `/api/cart/${productId}`,
        CLEAR: '/api/cart/clear/all',
    },
    WISHLIST: {
        ADD: '/api/wishlist',
        GET: '/api/wishlist',
        REMOVE: (productId: string) => `/api/wishlist/${productId}`,
        CLEAR: '/api/wishlist/clear/all',
    },

}