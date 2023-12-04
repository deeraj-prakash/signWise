// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DOCS = '/docs';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_CALL = '/call';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_CALL = {
  root: ROOTS_CALL,
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics')
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all')
  },
  chat: {
    // root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    test: path(ROOTS_DASHBOARD, '/user/test'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, '/user/ada-lindgren/edit'),
    useredit: path(ROOTS_DASHBOARD, '/user/edit'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    // moreinfo: path(ROOTS_DASHBOARD, '/user/moreinfo'),
    // messages: path(ROOTS_DASHBOARD, '/user/messages'),
    requests: path(ROOTS_DASHBOARD, '/user/view-requests'),
    invoice: path(ROOTS_DASHBOARD, '/user/requests-invoice'),
    addticket: path(ROOTS_DASHBOARD, '/user/add-tickets'),
    minimizecall: path(ROOTS_DASHBOARD, '/user/minimize-call'),
    chat: path(ROOTS_DASHBOARD, '/chat'),
    
    // documents: path(ROOTS_DASHBOARD, '/user/documents'),
  },
  callCenter: {
    root: path(ROOTS_DASHBOARD, '/call-center'),
    incomingWindow: path(ROOTS_DASHBOARD, '/call-center/incoming-window'),
    analytics: path(ROOTS_DASHBOARD, '/call-center/analytics'),
    accountSetup: path(ROOTS_DASHBOARD, '/call-center/account-setup'),
    teams: path(ROOTS_DASHBOARD, '/call-center/teams'),
    departments: path(ROOTS_DASHBOARD, '/call-center/departments'),
    callFlows: path(ROOTS_DASHBOARD, '/call-center/call-flows'),
    callLogs: path(ROOTS_DASHBOARD, '/call-center/call-logs'),
    smsLogs: path(ROOTS_DASHBOARD, '/call-center/sms-logs'),
    recordings: path(ROOTS_DASHBOARD, '/call-center/recordings'),
    monitorCalls: path(ROOTS_DASHBOARD, '/call-center/monitor-calls'),
    callSettings: path(ROOTS_DASHBOARD, '/call-center/call-settings'),
  },
   official:{
    root:path(ROOTS_DASHBOARD,'/official-request'),
    viewRequest:path(ROOTS_DASHBOARD,'/official-request/view'),
   },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    viewproject : path(ROOTS_DASHBOARD,'/blog/view-project/id'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/portfolio-review-is-this-portfolio-too-creative'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
  },
  onboard:{
    root:path(ROOTS_DASHBOARD,'/onboard'),
    create:path(ROOTS_DASHBOARD,'/onboard/create')
  },
  customerOrders:{
    root:path(ROOTS_DASHBOARD,'/customer'),
    create:path(ROOTS_DASHBOARD,'/customer/invoice')
  },
  departments:{
    root:path(ROOTS_DASHBOARD,'/departments'),
  },

  signagreements:{
    root:path(ROOTS_DASHBOARD,'/sign-agreements'),
    addagreement:path(ROOTS_DASHBOARD,'/sign-agreements/add-agreements'),
    editagreement:path(ROOTS_DASHBOARD,'/sign-agreements/edit-agreements')
  },
  customfieldtemplate:{
    root:path(ROOTS_DASHBOARD,'/custom-field-template'),
    create:path(ROOTS_DASHBOARD,'/custom-field-template/create-custom-templates'),
    edit:path(ROOTS_DASHBOARD,'/custom-field-template/edit-custom-templates')
  },
  
  products:{
    root:path(ROOTS_DASHBOARD,'/products'),
    create:path(ROOTS_DASHBOARD,'/products/add-products'),
    edit:path(ROOTS_DASHBOARD,'/products/edit-products')
  },
  payments:{
    root:path(ROOTS_DASHBOARD,'/payments'),
    create:path(ROOTS_DASHBOARD,'/payments/add-payments'),
    invoice:path(ROOTS_DASHBOARD,'/payments/invoice')
  },

  QuestionnaireTemplates:{
    root:path(ROOTS_DASHBOARD,'/Questionnaire-Templates'),
    create:path(ROOTS_DASHBOARD,'/Questionnaire-Templates/Add-QuestionnaireTemplates'),
    edit:path(ROOTS_DASHBOARD,'/Questionnaire-Templates/Edit-QuestionnaireTemplates')
  },
  
 crm: {
    root:path(ROOTS_DASHBOARD,'/crm'),
    contact:path(ROOTS_DASHBOARD,'/crm/contact'),
    viewcontact:path(ROOTS_DASHBOARD,'/crm/contact/viewcontact'),
    lead:path(ROOTS_DASHBOARD,'/crm/lead'),
    viewlead:path(ROOTS_DASHBOARD,'/crm/lead/viewlead'),
    leadstatus:path(ROOTS_DASHBOARD,'/crm/lead/status'),
    opportunity:path(ROOTS_DASHBOARD,'/crm/opportunity'),
    opportunityinfo:path(ROOTS_DASHBOARD,'/crm/opportunity/info'),
    call:path(ROOTS_DASHBOARD,'/crm/call'),
    sms:path(ROOTS_DASHBOARD,'/crm/sms'),
    ticket:path(ROOTS_DASHBOARD,'/crm/ticket'),
    viewticket:path(ROOTS_DASHBOARD,'/crm/ticket/view'),
    campaign:path(ROOTS_DASHBOARD,'/crm/campaign'),
    customfield:path(ROOTS_DASHBOARD,'/crm/campaign/custom-field'),
    contactbuilder:path(ROOTS_DASHBOARD,'/crm/campaign/contact-builder'),
  },
  insight:{
    root:path(ROOTS_DASHBOARD,'/insight'),
  },
  group:{
    root:path(ROOTS_DASHBOARD,'/group'),
  },

  adminAccount:{
    root:path(ROOTS_DASHBOARD,'/Admin-Settings'),
    userRoleEdit:path(ROOTS_DASHBOARD,'/Admin-Settings/User-Role-Edit'), 
    userRoleAdd:path(ROOTS_DASHBOARD,'/Admin-Settings/Add-User-Role'), 
  },
};

export const PATH_DOCS = {
  root: ROOTS_DOCS,
  introduction: path(ROOTS_DOCS, '/introduction'),
  quickstart: path(ROOTS_DOCS, '/quick-start'),
  package: path(ROOTS_DOCS, '/package'),

  // Theme UI
  color: path(ROOTS_DOCS, '/color'),
  typography: path(ROOTS_DOCS, '/typography'),
  icon: path(ROOTS_DOCS, '/icon'),
  shadows: path(ROOTS_DOCS, '/shadows'),
  components: path(ROOTS_DOCS, '/components'),
  settings: path(ROOTS_DOCS, '/settings'),
  tips: path(ROOTS_DOCS, '/tips'),

  // Development
  routing: path(ROOTS_DOCS, '/routing'),
  environmentVariables: path(ROOTS_DOCS, '/environment-variables'),
  stateManagement: path(ROOTS_DOCS, '/state-management'),
  apiCalls: path(ROOTS_DOCS, '/api-calls'),
  analytics: path(ROOTS_DOCS, '/analytics'),
  authentication: path(ROOTS_DOCS, '/authentication'),
  multiLanguage: path(ROOTS_DOCS, '/multi-language'),
  lazyload: path(ROOTS_DOCS, '/lazyload-image'),
  formHelper: path(ROOTS_DOCS, '/form-helper'),

  // Changelog
  support: path(ROOTS_DOCS, '/support'),
  changelog: path(ROOTS_DOCS, '/changelog')
};
