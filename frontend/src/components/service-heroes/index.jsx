import WebsitesHero from "./WebsitesHero.jsx";
import WebAppsHero from "./WebAppsHero.jsx";
import EnterpriseHero from "./EnterpriseHero.jsx";
import AgentsHero from "./AgentsHero.jsx";
import ScrapingHero from "./ScrapingHero.jsx";
import AutomationsHero from "./AutomationsHero.jsx";
import BrandHero from "./BrandHero.jsx";
import DeployHero from "./DeployHero.jsx";

const HERO_MAP = {
  typography:      WebsitesHero,
  "wireframe-morph": WebAppsHero,
  "network-graph": EnterpriseHero,
  orchestration:   AgentsHero,
  "dom-tree":      ScrapingHero,
  "cron-orbit":    AutomationsHero,
  monogram:        BrandHero,
  pipeline:        DeployHero,
};

export default function ServiceHero({ type }) {
  const Cmp = HERO_MAP[type] || WebsitesHero;
  return <Cmp />;
}

export { HERO_MAP };
