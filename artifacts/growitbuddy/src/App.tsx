import { Layout } from "@/components/layout/Layout";
import { Switch, Route, Router as WouterRouter } from "wouter";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Work from "@/pages/Work";
import Framework from "@/pages/Framework";
import Insights from "@/pages/Insights";
import InsightDetail from "@/pages/InsightDetail";
import Creators from "@/pages/Creators";
import Freelancers from "@/pages/Freelancers";
import FullTime from "@/pages/FullTime";
import AuthorityAudit from "@/pages/AuthorityAudit";
import Resources from "@/pages/Resources";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import CustomCursor from "@/components/effects/CustomCursor";
import PageIntro from "@/components/effects/PageIntro";

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <PageIntro />
      <CustomCursor />
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/work" component={Work} />
          <Route path="/framework" component={Framework} />
          <Route path="/insights" component={Insights} />
          <Route path="/insights/:slug" component={InsightDetail} />
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
    </WouterRouter>
  );
}

export default App;
