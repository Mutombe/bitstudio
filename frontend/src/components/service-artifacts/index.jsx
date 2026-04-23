import WebsitesArtifact from "./WebsitesArtifact.jsx";
import WebAppsArtifact from "./WebAppsArtifact.jsx";
import EnterpriseArtifact from "./EnterpriseArtifact.jsx";
import AgentsArtifact from "./AgentsArtifact.jsx";
import ScrapingArtifact from "./ScrapingArtifact.jsx";
import AutomationsArtifact from "./AutomationsArtifact.jsx";
import BrandArtifact from "./BrandArtifact.jsx";
import DeployArtifact from "./DeployArtifact.jsx";

const ARTIFACT_MAP = {
  "websites-perf-bars": WebsitesArtifact,
  "web-apps-url-bar": WebAppsArtifact,
  "enterprise-graph": EnterpriseArtifact,
  "agents-chain": AgentsArtifact,
  "scraping-json": ScrapingArtifact,
  "automations-clock": AutomationsArtifact,
  "brand-chips": BrandArtifact,
  "deploy-pipeline": DeployArtifact,
};

export default function ServiceArtifact({ id }) {
  const Cmp = ARTIFACT_MAP[id];
  if (!Cmp) return null;
  return <Cmp />;
}

export { ARTIFACT_MAP };
