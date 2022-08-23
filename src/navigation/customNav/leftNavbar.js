export default [
  {
    title: 'Dashboard',
    route: 'dashboard-ecommerce',
    icon: 'HomeIcon',
    action: 'view',
    resource: 'navbar',
  },
  {
    title: 'Category',
    route: 'categories',
    icon: 'BriefcaseIcon',
    action: 'view',
    resource: 'navbar',
  },
  {
    title: 'Sub Category',
    route: 'categories_sub_categories',
    icon: 'FileTextIcon',
    action: 'view',
    resource: 'navbar',
  },
  {
    title: 'Groups',
    route: 'groups',
    icon: 'FileTextIcon',
    action: 'view',
    resource: 'navbar',
  },
  {
    title: 'Plans',
    route: 'plans',
    icon: 'ToolIcon',
    action: 'view',
    resource: 'navbar',
  },
  {
    title: 'Users',
    route: 'users',
    icon: 'BookIcon',
    action: 'view',
    resource: 'navbar',
  },
  {
    title: 'FAQs',
    route: 'faqs',
    icon: 'SlidersIcon',
    action: 'view',
  },
  {
    title: 'Promotions',
    route: 'promotions',
    icon: 'FileTextIcon',
    action: 'view',
  },
  {
    title: 'Payment Transactions',
    route: 'payment-transactions',
    icon: 'BookIcon',
    action: 'view',
  },
  {
    title: 'Refunds Requests',
    route: 'refunds-requests',
    icon: 'BookIcon',
    action: 'view',
  },
  {
    title: 'Settings',
    icon: 'SlidersIcon',
    action: 'view',
    resource: 'navbar',
    children: [{
      title: 'Global Settings',
      route: 'global-terms',
      action: 'view',
      resource: 'user_level',
    },
    {
      title: 'Razorpay',
      route: 'razorpay',
      action: 'view',
      resource: 'user',
    },
    ],
  },
]