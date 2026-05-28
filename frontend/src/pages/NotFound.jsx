import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import PageTransition from "../components/PageTransition.jsx";
import { useCursorHover } from "../hooks/useCursor.jsx";
import SEO from "../components/SEO.jsx";

export default function NotFound() {
  const hover = useCursorHover("hover", "");
  return (
    <PageTransition>
      <SEO
        title="Not found"
        description="The requested page is not at this address."
        path="/404"
        noindex
      />
      <section className="min-h-[100svh] flex items-center radial-bleed">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-32 md:py-44">
          <p className="label-mono text-bone-100/50">404 · Transmission lost</p>
          <h1 className="mt-6 display-massive text-bone-100 leading-[0.8]">
            This page is <span className="italic-accent text-maroon-400">elsewhere</span>.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-bone-100/75">
            We routed you to a wrong frequency. It happens. Try the index, or summon
            the palette. You'll find what you were looking for.
          </p>
          <Link to="/" {...hover} className="btn btn-primary mt-10">
            <ArrowLeftIcon size={14} weight="bold" />
            Back to index
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
