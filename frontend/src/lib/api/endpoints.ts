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
            GET_DETAILS: (id: string) => `/api/admin/users/${id}/details`,
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
        },
        ANALYTICS: {
            OVERVIEW: '/api/admin/analytics/overview',
            REVENUE: '/api/admin/analytics/revenue',
            TOP_PRODUCTS: '/api/admin/analytics/top-products',
            RECENT_ORDERS: '/api/admin/analytics/recent-orders',
            LOW_STOCK: '/api/admin/analytics/low-stock',
            TOP_SELLERS: '/api/admin/analytics/top-sellers',
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
    REVIEWS: {
        GET_PRODUCT_REVIEWS: (productId: string) => `/api/reviews/product/${productId}`,
        CREATE: (productId: string) => `/api/reviews/product/${productId}`,
        GET_MY_REVIEWS: '/api/reviews/my-reviews',
        UPDATE: (reviewId: string) => `/api/reviews/${reviewId}`,
        DELETE: (reviewId: string) => `/api/reviews/${reviewId}`,
    },
    NOTIFICATIONS: {
        GET_ALL: '/api/notifications',
        GET_UNREAD_COUNT: '/api/notifications/unread-count',
        MARK_AS_READ: (id: string) => `/api/notifications/${id}/read`,
        MARK_ALL_AS_READ: '/api/notifications/mark-all-read',
        DELETE: (id: string) => `/api/notifications/${id}`,
        DELETE_ALL: '/api/notifications',
    },
    CONVERSATIONS: {
        CREATE_OR_GET: '/api/conversations',
        GET_ALL: '/api/conversations',
        GET_ONE: (id: string) => `/api/conversations/${id}`,
        DELETE: (id: string) => `/api/conversations/${id}`,
        RESET_UNREAD: (id: string) => `/api/conversations/${id}/read`,
    },
        MESSAGES: {
        SEND: '/api/messages',
        GET_BY_CONVERSATION: (conversationId: string) => `/api/messages/conversation/${conversationId}`,
        DELETE: (id: string) => `/api/messages/${id}`,
        MARK_AS_READ: (conversationId: string) => `/api/messages/conversation/${conversationId}/read`,
    },
}