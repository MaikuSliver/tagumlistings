// components
import ClientHeader from "@/app/(client)/_components/header"
import ClientFooter from "@/app/(client)/_components/footer"

// utils
import HydrationBoundaryWrapper from "@/components/shared/hydration-boundary"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <HydrationBoundaryWrapper>
      <ClientHeader />
      {children}
      <ClientFooter />
    </HydrationBoundaryWrapper>
  )
}