import { Layout } from "@/components/layout/Layout";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Work from "@/pages/Work";
import Framework from "@/pages/Framework";
import Insights from "@/pages/Insights";
import InsightDetail from "@/pages/InsightDetail";
import Creators from "@/pages/Creators";
import Freelancers from "@/pages/Freelancers";
import InfluencerExplore from "@/pages/InfluencerExplore";
import InfluencerProfile from "@/pages/InfluencerProfile";
import DistributionNetwork from "@/pages/DistributionNetwork";
import JoinNetwork from "@/pages/JoinNetwork";
import FullTime from "@/pages/FullTime";
import AuthorityAudit from "@/pages/AuthorityAudit";
import Resources from "@/pages/Resources";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import CustomCursor from "@/components/effects/CustomCursor";
import PageIntro from "@/components/effects/PageIntro";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import { AdminLayout } from "@/components/admin/AdminLayout";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminInfluencers from "@/pages/admin/AdminInfluencers";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminServices from "@/pages/admin/AdminServices";
import AdminWork from "@/pages/admin/AdminWork";
import AdminHome from "@/pages/admin/AdminHome";
import AdminAbout from "@/pages/admin/AdminAbout";
import AdminNavbar from "@/pages/admin/AdminNavbar";
import AdminFooter from "@/pages/admin/AdminFooter";
import AdminLeads from "@/pages/admin/AdminLeads";

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdmin();
  if (!isAuthenticated) return <Redirect to="/admin/login" />;
  return <AdminLayout>{children}</AdminLayout>;
}

function AdminRoutes() {
  return (
    <Switch>
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/settings">
        {() => <AdminGuard><AdminSettings /></AdminGuard>}
      </Route>
      <Route path="/admin/home">
        {() => <AdminGuard><AdminHome /></AdminGuard>}
      </Route>
      <Route path="/admin/services">
        {() => <AdminGuard><AdminServices /></AdminGuard>}
      </Route>
      <Route path="/admin/work">
        {() => <AdminGuard><AdminWork /></AdminGuard>}
      </Route>
      <Route path="/admin/influencers">
        {() => <AdminGuard><AdminInfluencers /></AdminGuard>}
      </Route>
      <Route path="/admin/blog">
        {() => <AdminGuard><AdminBlog /></AdminGuard>}
      </Route>
      <Route path="/admin/about">
        {() => <AdminGuard><AdminAbout /></AdminGuard>}
      </Route>
      <Route path="/admin/navbar">
        {() => <AdminGuard><AdminNavbar /></AdminGuard>}
      </Route>
      <Route path="/admin/footer">
        {() => <AdminGuard><AdminFooter /></AdminGuard>}
      </Route>
      <Route path="/admin/leads">
        {() => <AdminGuard><AdminLeads /></AdminGuard>}
      </Route>
      <Route path="/admin">
        {() => <AdminGuard><AdminDashboard /></AdminGuard>}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <AdminProvider>
        <CustomCursor />
        <Switch>
          {/* All admin routes */}
          <Route path="/admin/:rest*" component={AdminRoutes} />
          <Route path="/admin" component={AdminRoutes} />

          {/* Public site */}
          <Route>
            {() => (
              <>
                <PageIntro />
                <Layout>
                  <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/services" component={Services} />
                    <Route path="/work" component={Work} />
                    <Route path="/framework" component={Framework} />
                    <Route path="/insights" component={Insights} />
                    <Route path="/insights/:slug" component={InsightDetail} />
                    <Route path="/influencers" component={InfluencerExplore} />
                    <Route path="/influencers/:slug" component={InfluencerProfile} />
                    <Route path="/distribution" component={DistributionNetwork} />
                    <Route path="/join" component={JoinNetwork} />
                    <Route path="/creators" component={Creators} />
                    <Route path="/freelancers" component={Freelancers} />
                    <Route path="/full-time" component={FullTime} />
                    <Route path="/authority-audit" component={AuthorityAudit} />
                    <Route path="/resources" component={Resources} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route component={NotFound} />
                  </Switch>
                </Layout>
              </>
            )}
          </Route>
        </Switch>
      </AdminProvider>
    </WouterRouter>
  );
}

export default App;
