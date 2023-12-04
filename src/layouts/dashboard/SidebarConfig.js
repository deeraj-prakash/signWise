// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';
import { AssignmentInd, BusinessCenter, Groups, SupportAgent,AccountBox, RequestQuote  } from '@material-ui/icons';
// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  kanban: getIcon('ic_kanban')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'general',
  //   items: [
  //     {
  //       title: 'app',
  //       path: PATH_DASHBOARD.general.app,
  //       icon: ICONS.dashboard
  //     },
  //     { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
  //     { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics }
  //   ]
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [

      // MANAGEMENT : E-COMMERCE
      // {
      //   title: 'e-commerce',
      //   path: PATH_DASHBOARD.eCommerce.root,
      //   icon: ICONS.cart,
      //   children: [
      //     // { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
      //     // { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
      //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
      //     { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
      //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
      //     // { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
      //     // { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice }
      //   ]
      // },

      {
        title: 'calender',
        path: PATH_DASHBOARD.calendar,
        icon: ICONS.calendar,
        // children: [
        //   { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar }
        // ]
      },

      // MANAGEMENT : BLOG
      {
        title: 'Project',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
        children: [
          { title: 'All Project', path: PATH_DASHBOARD.blog.posts },
          { title: 'Project Type', path: PATH_DASHBOARD.blog.postById },
          { title: 'Project Category', path: PATH_DASHBOARD.blog.newPost }
        ]
      },

     // ONBOARDING
     {
      title:'Onboarding',
      path:PATH_DASHBOARD.onboard.root,
      icon:<AssignmentInd/>,
     },

    //CRM
    {
      title:'CRM',
      path:PATH_DASHBOARD.crm.root,
      icon:<SupportAgent/>,
      children: [
        { title: 'Contacts', path: PATH_DASHBOARD.crm.contact },
        { title: 'Leads', path: PATH_DASHBOARD.crm.lead },
        { title: 'Opportunities', path: PATH_DASHBOARD.crm.opportunity },
         { title: 'Calls', path: PATH_DASHBOARD.crm.call },
         { title: 'SMS', path: PATH_DASHBOARD.crm.sms },
        { title: 'Tickets', path: PATH_DASHBOARD.crm.ticket },
        { title: 'Campaigns', path: PATH_DASHBOARD.crm.campaign },
      ]
    },

      // MANAGEMENT : USER
      {
        title: 'clients',
        path: PATH_DASHBOARD.user.root,
        icon: <AccountBox />,
        children: [
          { title: 'all clients', path: PATH_DASHBOARD.user.cards },
          // { title: 'Test ChatBot', path: PATH_DASHBOARD.user.test },
          // { title: 'list', path: PATH_DASHBOARD.user.list },
          // { title: 'create', path: PATH_DASHBOARD.user.newUser },
          // { title: 'edit', path: PATH_DASHBOARD.user.useredit },
          // { title: 'account', path: PATH_DASHBOARD.user.profile },
          // { title: 'profile', path: PATH_DASHBOARD.user.account }
        ]
      },
      {
        title: 'call center',
        path: PATH_DASHBOARD.callCenter.root,
        icon: ICONS.user,
        children: [
          { title: 'incoming window', path: PATH_DASHBOARD.callCenter.incomingWindow },
          { title: 'analytics', path: PATH_DASHBOARD.callCenter.analytics },
          { title: 'account setup', path: PATH_DASHBOARD.callCenter.accountSetup },
          { title: 'call logs', path: PATH_DASHBOARD.callCenter.callLogs },
          { title: 'sms logs', path: PATH_DASHBOARD.callCenter.smsLogs },
          { title: 'recordings', path: PATH_DASHBOARD.callCenter.recordings },
          { title: 'monitor calls', path: PATH_DASHBOARD.callCenter.monitorCalls },
          { title: 'call settings', path: PATH_DASHBOARD.callCenter.callSettings },
        ]
      },
      //official request
       {
         title:'official request',
         path:PATH_DASHBOARD.official.root,
         icon:<RequestQuote/>,
       },
      { 
        title:'Insights',
        path:PATH_DASHBOARD.insight.root,
        icon:<BusinessCenter/>,
      },
      {
        title:'Groups',
        path:PATH_DASHBOARD.group.root,
        icon:<Groups/>
      },
      {
        title:'Payments',
        path:PATH_DASHBOARD.payments.root,
        icon: ICONS.ecommerce,
      },

      {
        title:'Products',
        path:PATH_DASHBOARD.products.root,
        icon: ICONS.analytics,
      },

      {
        title:'Customer Orders',
        path:PATH_DASHBOARD.customerOrders.root,
        icon: ICONS.cart,
      },

      

      // {
      //   title: 'Profile',
      //   path: PATH_DASHBOARD.user.account,
      //   // icon: ICONS.user,
      //   // children: [
      //   //   { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar }
      //   // ]
      // },

      // {
      //   title: 'products',
      //   path: PATH_DASHBOARD.eCommerce.root,
      //   icon: ICONS.cart,
      //   children: [
      //     // { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
      //     // { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
      //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
      //     { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
      //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
      //     // { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
      //     // { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice }
      //   ]
      // },

      
    ]
  },

  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     // { title: 'mail', path: PATH_DASHBOARD.mail.root, icon: ICONS.mail },
  //     // { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     // { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     // { title: 'kanban', path: PATH_DASHBOARD.kanban, icon: ICONS.kanban }
  //   ]
  // }
];

export default sidebarConfig;
