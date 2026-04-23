// PhosphorIcon — small named-import resolver.
// Keeps tree-shaking intact (no wildcard imports). Extend the map as new
// icons are added to service iconClusters.
import {
  Globe,
  Code,
  Gauge,
  Megaphone,
  Stack,
  Database,
  Lightning,
  UsersThree,
  Graph,
  Vault,
  GitBranch,
  ShieldCheck,
  Robot,
  ChatCircleDots,
  BookOpen,
  Wrench,
  Cpu,
  DownloadSimple,
  Tree,
  Funnel,
  Clock,
  ArrowsClockwise,
  BellRinging,
  Sparkle,
  PaintBrush,
  Swatches,
  TextAa,
  Rocket,
  Broadcast,
  Pulse,
} from "@phosphor-icons/react";

const ICONS = {
  Globe,
  Code,
  Gauge,
  Megaphone,
  Stack,
  Database,
  Lightning,
  UsersThree,
  Graph,
  Vault,
  GitBranch,
  ShieldCheck,
  Robot,
  ChatCircleDots,
  BookOpen,
  Wrench,
  Cpu,
  DownloadSimple,
  Tree,
  Funnel,
  Clock,
  ArrowsClockwise,
  BellRinging,
  Sparkle,
  PaintBrush,
  Swatches,
  TextAa,
  Rocket,
  Broadcast,
  Pulse,
};

export function PhosphorIcon({ name, ...rest }) {
  const Icon = ICONS[name] || Sparkle;
  return <Icon {...rest} />;
}

export default PhosphorIcon;
