'use client'

import Contact from "@/components/landing-page/trip-planner";
import { Explain } from "@/components/landing-page/explain";
import Hero from "@/components/landing-page/hero";
import { ListDestination } from "@/components/landing-page/list-destination";
import { PageWrapper } from "@/components/page-wrapper";
import MouseTrail from "@/components/atom/mouse-trail";

export default function Page() {
  return (
    <PageWrapper>
      {/* <MouseTrail /> */}
      <Hero />
      <Explain />
      <ListDestination />
      <Contact />
    </PageWrapper>
  )
}
