import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DocsLayout from '../layouts/docs';
// import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
import MinimizablePopup from 'src/components/MinimizablePopup';
import MinimizableCall from 'src/components/MinimizableCall';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: '/', element: <Navigate to="/dashboard/user/" replace /> },
        { path: 'app', element: <GeneralApp /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        {
          path: 'analytics',
          element: <GeneralAnalytics />
        },
        {
          path: 'e-commerce',
          children: [
            { path: '/', element: <Navigate to="/dashboard/e-commerce/shop" replace /> },
            { path: 'shop', element: <EcommerceShop /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
            { path: 'invoice', element: <EcommerceInvoice /> }
          ]
        },
        
        {
          path: 'user',
          children: [
            { path: '/', element: <Navigate to="/dashboard/calendar" replace /> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'test', element: <TestChatBot /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: '/:name/edit', element: <UserCreate /> },
            {path: 'edit', element: <UserEdit/> },
            { path: 'account', element: <UserAccount /> },
            { path: 'messages', element: <Messages /> },
            { path: 'view-requests', element: <ViewRequests /> },
            { path: 'requests-invoice', element: <InvoiceRequests /> },
            { path: 'add-tickets', element: <AddTicket /> },
            { path: 'minimize-call', element: <AllClientsMinimizeCall /> },
            { path: 'chat', element: <Chat /> },
            
            
            


          ]
        },
        {
          path: 'call-center',
          children: [
            { path: '/', element: <Navigate to="/dashboard/calendar" replace /> },
            { path: 'incoming-window', element: <MinimizablePopup/> },
            { path: 'analytics', element: <Analytics /> },
            { path: 'account-setup', element: <AccountSetup /> },
            { path: 'teams', element: <AdminCards /> },
            { path: 'departments', element: <Departments /> },
            { path: 'call-flows', element: <CallFlow /> },
            { path: 'call-logs', element: <CallLog /> },
            { path: 'sms-logs', element: <SmsLog /> },
            { path: 'recordings', element: <Recordings /> },
            { path: 'monitor-calls', element: <MonitorCalls /> },
            { path: 'call-settings', element: <CallSettings /> },
          ]
        },
        {
          path:'official-request',
          children:[
            { path: '/', element: <OfficialRequest/> },
            { path: 'view', element: <ViewOfficialRequest/> },
          ]
        },
        {
          path: 'blog',
          children: [
            { path: '/', element: <Navigate to="/dashboard/blog/posts" replace /> },
            { path: 'posts', element: <BlogPosts /> },
            {path:'view-project/id', element:<ViewProject />},
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new-post', element: <BlogNewPost /> }
          ]
        },
        {
          path:'onboard',
          children:[
            {path:'/',element:<Onboarding/>},
            {path:'create',element:<AddNewWorkFlow/>}
          ]

        },
        {
          path:'crm',
          children:[
            {path:'/',element:<Crm/>},
            {path:'contact',element:<Crmcontact/>},
            {path:'contact/viewcontact',element:<ViewCrmContact/>},
            {path:'lead',element:<Crmlead/>},
            {path:'lead/viewlead',element:<Viewlead/>},
            {path:'lead/status',element:<LeadStatus/>},
            {path:'opportunity',element:<Opportunity/>},
            {path:'opportunity/info',element:<OpportunityInfo/>},
            {path:'call',element:<CallLog />},
            {path:'sms',element:<SmsLog /> },
            {path:'ticket',element:<CrmTickets/>},
            {path:'ticket/view',element:<ViewTickets/>},
            {path:'campaign',element:<CrmCampaign/>},
            {path:'campaign/custom-field',element:<CustomFeilds/>},
            {path:'campaign/contact-builder',element:<CustomContactBuilder/>},
          ]
        },
        {
         path:'insight',
         children:[
          {path:'/',element:<Insights/>}
         ]
        },
        {
          path:'group',
          children:[
            {path:'/',element:<Groups/>}
          ]
        },

        {
          path:'Admin-Settings',
          children:[
            {path:'/',element:<AdminAccount />},
            {path:'User-Role-Edit',element:<UserRoleEdit />},
            {path:'Add-User-Role',element:<AddUserRole />},
            
          ]
        },
        // {
        //   path:'crm',
        //   children:[
        //     {path:'/',element:<Crm/>},
        //     {path:'contact',element:<Crmcontact/>},
        //     {path:'contact/viewcontact',element:<ViewCrmContact/>},
        //     {path:'lead',element:<Crmlead/>},
        //     {path:'lead/status',element:<LeadStatus/>},
        //     {path:'opportunity',element:<Opportunity/>},
        //     {path:'call',element:<Crmcall/>},
        //     {path:'sms',element:<Crmsms/>},
        //     {path:'ticket',element:<CrmTickets/>},
        //     {path:'campaign',element:<CrmCampaign/>},
        //   ]
        // },
        // {
        //  path:'insight',
        //  children:[
        //   {path:'/',element:<Insights/>}
        //  ]
        // },
        // {
        //   path:'group',
        //   children:[
        //     {path:'/',element:<Groups/>}
        //   ]
        // },
        {
          path:'products',
          children:[
            {path:'/',element:<Products/>},
            {path:'add-products',element:<AddProducts/>},
            {path:'edit-products',element:<EditProducts/>}        
          ]

        },

        {
          path:'payments',
          children:[
            {path:'/',element:<Payments/>},
            {path:'add-payments',element:<AddPayment/>},
            {path:'invoice',element:<InvoiceProducts/>}        
          ]

        },

        {
          path:'customer',
          children:[
            {path:'/',element:<CustomerOrders/>},
             {path:'invoice',element:<InvoiceOrder />}
          ]

        },
        {
          path:'departments',
          children:[
            {path:'/',element:<AdminDepartments/>},
          ]

        },

        {
          path:'Questionnaire-Templates',
          children:[
            {path:'/',element:<QuestionnaireTemplates/>},
            {path:'Add-QuestionnaireTemplates',element:<QuestionnaireTemplates/>},
            {path:'Edit-QuestionnaireTemplates',element:<QuestionnaireTemplates/>},
          ]

        },
        

        {
          path:'sign-agreements',
          children:[
            {path:'/',element:<SignAgreements/>},
            {path:'add-agreements',element:<AddAgreements/>},
            {path:'edit-agreements',element:<EditAgreements/>},
          ]

        },


        {
          path:'custom-field-template',
          children:[
            {path:'/',element:<CustomeFieldTemplate />},
            {path:'create-custom-templates',element:<AddCustomFieldTemplate />},
            {path:'edit-custom-templates',element:<EditCustomFiledTemplate />}        
          ]
        },

        {
          path: 'mail',
          children: [
            { path: '/', element: <Navigate to="/dashboard/mail/all" replace /> },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> }
          ]
        },
        {
          path: 'chat',
          children: [
            { path: '/', element: <Chat /> },
            { path: 'new', element: <Chat /> },
            { path: ':conversationKey', element: <Chat /> }
          ]
        },
        { path: 'calendar', element: <Calendar /> }
        // { path: 'kanban', element: <Kanban /> }
      ]
    },

    // Docs Routes
    {
      path: 'docs',
      element: <DocsLayout />,
      children: [
        { path: '/', element: <Navigate to="/docs/introduction" replace /> },
        { path: '*', element: <Docs /> }
      ]
    },
    // Call Routes
    {
      path: 'call',
      element: <MinimizableCall />,
      // children: [
      //   { path: '/', element: <Navigate to="/docs/introduction" replace /> },
      //   { path: '*', element: <Docs /> }
      // ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      // element: <MainLayout />,
      children: [
        { path: '/', element: <Login /> },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <Faqs /> },
        {
          path: 'components',
          children: [
            { path: '/', element: <ComponentsOverview /> },
            // FOUNDATIONS
            { path: 'color', element: <Color /> },
            { path: 'typography', element: <Typography /> },
            { path: 'shadows', element: <Shadows /> },
            { path: 'grid', element: <Grid /> },
            { path: 'icons', element: <Icons /> },
            // MATERIAL UI
            { path: 'accordion', element: <Accordion /> },
            { path: 'alert', element: <Alert /> },
            { path: 'autocomplete', element: <Autocomplete /> },
            { path: 'avatar', element: <Avatar /> },
            { path: 'badge', element: <Badge /> },
            { path: 'breadcrumbs', element: <Breadcrumb /> },
            { path: 'buttons', element: <Buttons /> },
            { path: 'checkbox', element: <Checkbox /> },
            { path: 'chip', element: <Chip /> },
            { path: 'dialog', element: <Dialog /> },
            { path: 'label', element: <Label /> },
            { path: 'list', element: <List /> },
            { path: 'menu', element: <Menu /> },
            { path: 'pagination', element: <Pagination /> },
            { path: 'pickers', element: <Pickers /> },
            { path: 'popover', element: <Popover /> },
            { path: 'progress', element: <Progress /> },
            { path: 'radio-button', element: <RadioButtons /> },
            { path: 'rating', element: <Rating /> },
            { path: 'slider', element: <Slider /> },
            { path: 'snackbar', element: <Snackbar /> },
            { path: 'stepper', element: <Stepper /> },
            { path: 'switch', element: <Switches /> },
            { path: 'table', element: <Table /> },
            { path: 'tabs', element: <Tabs /> },
            { path: 'textfield', element: <Textfield /> },
            { path: 'timeline', element: <Timeline /> },
            { path: 'tooltip', element: <Tooltip /> },
            { path: 'transfer-list', element: <TransferList /> },
            { path: 'tree-view', element: <TreeView /> },
            // EXTRA COMPONENTS
            { path: 'chart', element: <Charts /> },
            { path: 'map', element: <Map /> },
            { path: 'editor', element: <Editor /> },
            { path: 'copy-to-clipboard', element: <CopyToClipboard /> },
            { path: 'upload', element: <Upload /> },
            { path: 'carousel', element: <Carousel /> },
            { path: 'multi-language', element: <MultiLanguage /> },
            { path: 'animate', element: <Animate /> },
            { path: 'mega-menu', element: <MegaMenu /> }
          ]
        }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
const EcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductDetails')));
const EcommerceProductList = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductList')));
const EcommerceProductCreate = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductCreate')));
const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));
const EcommerceInvoice = Loadable(lazy(() => import('../pages/dashboard/EcommerceInvoice')));
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const ViewProject = Loadable(lazy(() => import('../pages/dashboard/ViewProject')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));
const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
const Onboarding = Loadable(lazy(()=>import('../pages/dashboard/OnBoarding')))
const AddNewWorkFlow = Loadable(lazy(()=>import('../pages/dashboard/AddNewWorkFlow')))
const Insights = Loadable(lazy(()=>import('../pages/dashboard/Insights')))
const Analytics = Loadable(lazy(()=>import('../pages/dashboard/Analytics')))
const AccountSetup = Loadable(lazy(()=>import('../pages/dashboard/AccountSetup')))
const AdminCards = Loadable(lazy(()=>import('../pages/dashboard/AdminCards')))
const Departments = Loadable(lazy(()=>import('../pages/dashboard/Departments')))
const CallFlow = Loadable(lazy(()=>import('../pages/dashboard/CallFlow')))
const CallLog = Loadable(lazy(()=>import('../pages/dashboard/CallLog')))
const SmsLog = Loadable(lazy(()=>import('../pages/dashboard/SmsLog')))
const Recordings = Loadable(lazy(()=>import('../pages/dashboard/Recordings')))
const MonitorCalls = Loadable(lazy(()=>import('../pages/dashboard/MonitorCalls')))
const CallSettings = Loadable(lazy(()=>import('../pages/dashboard/CallSettings')))
const Groups = Loadable(lazy(()=>import('../pages/dashboard/Groups')))
const Crm =   Loadable(lazy(()=>import('../pages/dashboard/Crm')))
const CrmCampaign =   Loadable(lazy(()=>import('../pages/dashboard/CrmCampaign')))
const CrmTickets =   Loadable(lazy(()=>import('../pages/dashboard/CrmTickets')))
const ViewTickets =   Loadable(lazy(()=>import('../pages/dashboard/ViewTicketCrm')))
const Crmcall =   Loadable(lazy(()=>import('../pages/dashboard/Crmcall')))
const Crmcontact =   Loadable(lazy(()=>import('../pages/dashboard/Crmcontact')))
const Crmlead =   Loadable(lazy(()=>import('../pages/dashboard/Crmlead')))
const Crmsms =   Loadable(lazy(()=>import('../pages/dashboard/Crmsms')))
const Opportunity =  Loadable(lazy(()=>import('../pages/dashboard/Opportunity')))
const ViewCrmContact =  Loadable(lazy(()=>import('../pages/dashboard/ViewCrmContact')))
const Viewlead =  Loadable(lazy(()=>import('../pages/dashboard/ViewLead')))
const LeadStatus =  Loadable(lazy(()=>import('../pages/dashboard/LeadStatus')))
const OpportunityInfo =  Loadable(lazy(()=>import('../pages/dashboard/Opportunityinfo')))
const CustomContactBuilder =  Loadable(lazy(()=>import('../pages/dashboard/CustomContactBuilder')))
const CustomFeilds =  Loadable(lazy(()=>import('../pages/dashboard/CustomFields')))
const OfficialRequest = Loadable(lazy(()=>import('../pages/dashboard/OfficialRequest')))
const ViewOfficialRequest = Loadable(lazy(()=>import('../pages/dashboard/ViewOfficialRequest')))
// const Kanban = Loadable(lazy(() => import('../pages/dashboard/Kanban')));
// Docs
const Docs = Loadable(lazy(() => import('../pages/Docs')));
// Main
// const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
// Components
const ComponentsOverview = Loadable(lazy(() => import('../pages/ComponentsOverview')));
const Color = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationColor')));
const Typography = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationTypography')));
const Shadows = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationShadows')));
const Grid = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationGrid')));
const Icons = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationIcons')));
const Accordion = Loadable(lazy(() => import('../pages/components-overview/material-ui/Accordion')));
const Alert = Loadable(lazy(() => import('../pages/components-overview/material-ui/Alert')));
const Autocomplete = Loadable(lazy(() => import('../pages/components-overview/material-ui/Autocomplete')));
const Avatar = Loadable(lazy(() => import('../pages/components-overview/material-ui/Avatar')));
const Badge = Loadable(lazy(() => import('../pages/components-overview/material-ui/Badge')));
const Breadcrumb = Loadable(lazy(() => import('../pages/components-overview/material-ui/Breadcrumb')));
const Buttons = Loadable(lazy(() => import('../pages/components-overview/material-ui/buttons')));
const Checkbox = Loadable(lazy(() => import('../pages/components-overview/material-ui/Checkboxes')));
const Chip = Loadable(lazy(() => import('../pages/components-overview/material-ui/chips')));
const Dialog = Loadable(lazy(() => import('../pages/components-overview/material-ui/dialog')));
const Label = Loadable(lazy(() => import('../pages/components-overview/material-ui/Label')));
const List = Loadable(lazy(() => import('../pages/components-overview/material-ui/Lists')));
const Menu = Loadable(lazy(() => import('../pages/components-overview/material-ui/Menus')));
const Pagination = Loadable(lazy(() => import('../pages/components-overview/material-ui/Pagination')));
const Pickers = Loadable(lazy(() => import('../pages/components-overview/material-ui/pickers')));
const Popover = Loadable(lazy(() => import('../pages/components-overview/material-ui/Popover')));
const Progress = Loadable(lazy(() => import('../pages/components-overview/material-ui/progress')));
const RadioButtons = Loadable(lazy(() => import('../pages/components-overview/material-ui/RadioButtons')));
const Rating = Loadable(lazy(() => import('../pages/components-overview/material-ui/Rating')));
const Slider = Loadable(lazy(() => import('../pages/components-overview/material-ui/Slider')));
const Snackbar = Loadable(lazy(() => import('../pages/components-overview/material-ui/Snackbar')));
const Stepper = Loadable(lazy(() => import('../pages/components-overview/material-ui/stepper')));
const Switches = Loadable(lazy(() => import('../pages/components-overview/material-ui/Switches')));
const Table = Loadable(lazy(() => import('../pages/components-overview/material-ui/table')));
const Tabs = Loadable(lazy(() => import('../pages/components-overview/material-ui/Tabs')));
const Textfield = Loadable(lazy(() => import('../pages/components-overview/material-ui/textfield')));
const Timeline = Loadable(lazy(() => import('../pages/components-overview/material-ui/Timeline')));
const Tooltip = Loadable(lazy(() => import('../pages/components-overview/material-ui/Tooltip')));
const TransferList = Loadable(lazy(() => import('../pages/components-overview/material-ui/transfer-list')));
const TreeView = Loadable(lazy(() => import('../pages/components-overview/material-ui/TreeView')));
const Charts = Loadable(lazy(() => import('../pages/components-overview/extra/Charts')));
const Map = Loadable(lazy(() => import('../pages/components-overview/extra/Map')));
const Editor = Loadable(lazy(() => import('../pages/components-overview/extra/Editor')));
const CopyToClipboard = Loadable(lazy(() => import('../pages/components-overview/extra/CopyToClipboard')));
const Upload = Loadable(lazy(() => import('../pages/components-overview/extra/Upload')));
const Carousel = Loadable(lazy(() => import('../pages/components-overview/extra/Carousel')));
const MultiLanguage = Loadable(lazy(() => import('../pages/components-overview/extra/MultiLanguage')));
const Animate = Loadable(lazy(() => import('../pages/components-overview/extra/animate')));
const MegaMenu = Loadable(lazy(() => import('../pages/components-overview/extra/MegaMenu')));
const Messages = Loadable(lazy(() => import('src/components/_dashboard/user/profile/Messages.js')));
const Request = Loadable(lazy(() => import('src/components/_dashboard/user/profile/Request.js')));
const UserEdit = Loadable(lazy(() => import('src/components/_dashboard/user/UserEdit.js')));
const CustomerOrders = Loadable(lazy(() => import('src/components/_dashboard/user/profile/CustomerOrders.js')));
const Products = Loadable(lazy(() => import('src/components/_dashboard/user/profile/Products.js')));
const TestChatBot = Loadable(lazy(() => import('src/components/_dashboard/user/profile/TestChatBot.js')));
const AddProducts = Loadable(lazy(() => import('src/components/_dashboard/blog/AddProducts.js')));
const EditProducts = Loadable(lazy(() => import('src/components/_dashboard/blog/EditProducts.js')));
const InvoiceOrder = Loadable(lazy(() => import('src/components/_dashboard/blog/InvoiceOrder.js')));
const Payments = Loadable(lazy(() => import('src/components/_dashboard/blog/Payments.js')));
const AddPayment = Loadable(lazy(() => import('src/components/_dashboard/user/profile/AddPayment.js')));
const InvoiceProducts = Loadable(lazy(() => import('src/components/_dashboard/blog/InvoiceProducts.js')));
const ViewRequests = Loadable(lazy(() => import('src/pages/dashboard/ViewRequests.js')));
const InvoiceRequests = Loadable(lazy(() => import('src/components/_dashboard/blog/InvoiceRequests.js')));
const AddTicket = Loadable(lazy(() => import('src/components/_dashboard/user/profile/AddTicket.js')));
const AllClientsMinimizeCall = Loadable(lazy(() => import('src/components/AllClientsMinimizeCall.js')));
const AdminAccount = Loadable(lazy(() => import('src/pages/dashboard/AdminAccount.js')));
const UserRoleEdit = Loadable(lazy(() => import('src/components/_dashboard/user/list/UserRoleEdit.js')));
const AddUserRole = Loadable(lazy(() => import('src/components/_dashboard/user/list/AddUserRole.js')));
const AdminDepartments = Loadable(lazy(() => import('src/components/_dashboard/user/list/AdminDepartments.js')));
const SignAgreements = Loadable(lazy(() => import('src/components/_dashboard/user/list/SignAgreements.js')));
const AddAgreements = Loadable(lazy(() => import('src/components/_dashboard/user/list/AddAgreements.js')));
const EditAgreements = Loadable(lazy(() => import('src/components/_dashboard/user/list/EditAgreements.js')));
const CustomeFieldTemplate = Loadable(lazy(() => import('src/components/_dashboard/user/list/CustomeFieldTemplate.js')));
const AddCustomFieldTemplate = Loadable(lazy(() => import('src/pages/dashboard/AddCustomFieldTemplate.js')));
const EditCustomFiledTemplate = Loadable(lazy(() => import('src/pages/dashboard/EditCustomFiledTemplate')));
const QuestionnaireTemplates = Loadable(lazy(() => import('src/components/_dashboard/user/list/QuestionnaireTemplates.js')));
