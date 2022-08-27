export default [

  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/views/table/bs-table/categories/list_categories.vue'),
    meta: {
      pageTitle: 'Categories',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },
  {
    path: '/add_category',
    name: 'add_category',
    component: () => import('@/views/table/bs-table/categories/add_category.vue'),
    meta: {
      pageTitle: 'Add Category',
      breadcrumb: [{
        text: 'Create',
      },
      {
        text: 'Category',
        active: true,
      },
      ],
    },
  },
  {
    path: '/edit_category/:id',
    name: 'edit_category',
    component: () => import('@/views/table/bs-table/categories/edit_category.vue'),
    meta: {
      pageTitle: 'Edit Category',
      breadcrumb: [{
        text: 'Edit',
      },
      {
        text: 'Category',
        active: true,
      },
      ],
    },
  },

  /// //////////// Sub Categories ////////////////////////

  {
    path: '/categories_sub_categories',
    name: 'categories_sub_categories',
    component: () => import('@/views/table/bs-table/sub_categories/list_categories_sub_categories.vue'),
    meta: {
      pageTitle: 'Sub categories',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },
  {
    path: '/sub_categories/:id',
    name: 'sub_categories',
    component: () => import('@/views/table/bs-table/sub_categories/list_sub_categories.vue'),
    meta: {
      pageTitle: 'Sub categories',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },
  {
    path: '/add_sub_categories/:id',
    name: 'add_sub_categories',
    component: () => import('@/views/table/bs-table/sub_categories/add_sub_cat.vue'),
    meta: {
      pageTitle: 'Add Sub Categories',
      breadcrumb: [{
        text: 'Create',
      },
      {
        text: 'Sub Category',
        active: true,
      },
      ],
    },
  },
  {
    path: '/edit_sub_categories/:id',
    name: 'edit_sub_categories',
    component: () => import('@/views/table/bs-table/sub_categories/edit_sub_cat.vue'),
    meta: {
      pageTitle: 'Edit Sub Category',
      breadcrumb: [{
        text: 'Edit',
      },
      {
        text: 'Sub Category',
        active: true,
      },
      ],
    },
  },

  /// / users /////////////////////////////////
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/table/bs-table/users/list_users.vue'),
    meta: {
      pageTitle: 'Users',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },

  /// ///// faqs /////////////////////////////////
  {
    path: '/faqs',
    name: 'faqs',
    component: () => import('@/views/table/bs-table/faqs/list_faqs.vue'),
    meta: {
      pageTitle: 'FAQs',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },
  {
    path: '/add_faqs',
    name: 'add_faqs',
    component: () => import('@/views/table/bs-table/faqs/add_faqs.vue'),
    meta: {
      pageTitle: 'Add FAQs',
      breadcrumb: [{
        text: 'Create',
      },
      {
        text: 'FAQs',
        active: true,
      },
      ],
    },
  },
  {
    path: '/edit_faqs/:id',
    name: 'edit_faqs',
    component: () => import('@/views/table/bs-table/faqs/edit_faqs.vue'),
    meta: {
      pageTitle: 'Edit FAQs',
      breadcrumb: [{
        text: 'Update',
      },
      {
        text: 'FAQs',
        active: true,
      },
      ],
    },
  },

  /// /// promotions /////////////////////////////////

  {
    path: '/promotions',
    name: 'promotions',
    component: () => import('@/views/table/bs-table/promotions/list_promotion.vue'),
    meta: {
      pageTitle: 'Promotions',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },

  {
    path: '/add_promotions',
    name: 'add_promotions',
    component: () => import('@/views/table/bs-table/promotions/add_promotion.vue'),
    meta: {
      pageTitle: 'Add Promotions',
      breadcrumb: [{
        text: 'Create',
      },
      {
        text: 'Promotions',
        active: true,
      },
      ],
    },
  },
  {
    path: '/update_promo/:id',
    name: 'update_promo',
    component: () => import('@/views/table/bs-table/promotions/edit_promo.vue'),
    meta: {
      pageTitle: 'Edit Promotions',
      breadcrumb: [{
        text: 'Edit',
      },
      {
        text: 'Promotions',
        active: true,
      },
      ],
    },
  },
  {
    path: '/plans/:id',
    name: 'plans',
    component: () => import('@/views/table/bs-table/plans/list_plans.vue'),
    meta: {
      pageTitle: 'List Plans',
      breadcrumb: [{
        text: 'View',
      },
      {
        text: 'Plans',
        active: true,
      },
      ],
    },
  },
  {
    path: '/add_plans/:id',
    name: 'add_plan',
    component: () => import('@/views/table/bs-table/plans/add_plans.vue'),
    meta: {
      pageTitle: 'List Plans',
      breadcrumb: [{
        text: 'View',
      },
      {
        text: 'Plans',
        active: true,
      },
      ],
    },
  },
  {
    path: '/edit_plans/:id',
    name: 'edit_plan',
    component: () => import('@/views/table/bs-table/plans/edit_plans.vue'),
    meta: {
      pageTitle: 'List Plans',
      breadcrumb: [{
        text: 'View',
      },
      {
        text: 'Plans',
        active: true,
      },
      ],
    },
  },

  {
    path: '/global-terms',
    name: 'global-terms',
    component: () => import('@/views/table/bs-table/global/globalSettings.vue'),
    meta: {
      pageTitle: 'Global Terms',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },

  {
    path: '/razorpay',
    name: 'razorpay',
    component: () => import('@/views/table/bs-table/global/secrets.vue'),
    meta: {
      pageTitle: 'Razorpay',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },

  {
    path: '/payment-transactions',
    name: 'payment-transactions',
    component: () => import('@/views/table/bs-table/paymnetTransactions/list_paymnetTransactions.vue'),
    meta: {
      pageTitle: 'Razorpay',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },
  {
    path: '/groups',
    name: 'groups',
    component: () => import('@/views/table/bs-table/groups/list_groups.vue'),
    meta: {
      pageTitle: 'Groups',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },
  {
    path: '/refunds-requests',
    name: 'refunds-requests',
    component: () => import('@/views/table/bs-table/refund/list_refund.vue'),
    meta: {
      pageTitle: 'Refunds',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },

  {
    path: '/groupMembers/:id',
    name: 'groupMembers',
    component: () => import('@/views/table/bs-table/groups/list_group_members.vue'),
    meta: {
      pageTitle: 'Group Members',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },

  {
    path: '/updateuser/:id',
    name: 'updateuser',
    component: () => import('@/views/table/bs-table/users/edit_users.vue'),
    meta: {
      pageTitle: 'Group Members',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },

  {
    path: '/edit_grouop/:id',
    name: 'edit_group',
    component: () => import('@/views/table/bs-table/groups/edit_group.vue'),
    meta: {
      pageTitle: 'Edit Group',
      breadcrumb: [{
        text: 'Update',
      },
      {
        text: 'Groups',
        active: true,
      },
      ],
    },
  },

  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/error/Error404.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      action: 'read',
    },
  },
  {
    path: '/pages/miscellaneous/not-authorized',
    name: 'misc-not-authorized',
    component: () => import('@/views/pages/miscellaneous/NotAuthorized.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/pages/authentication/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
]
