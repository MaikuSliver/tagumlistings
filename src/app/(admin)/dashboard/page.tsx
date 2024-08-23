// components
import ContentLayout from "@/app/(admin)/_components/content-layout"
import AdminDashboardClient from "@/app/(admin)/dashboard/_components/client"
import DynamicBreadcrumb from "@/components/shared/dynamic-breadcrumb"

// utils
import { dashboardItems } from "@/lib/misc/breadcrumb-lists"

// types
import type { Metadata } from "next"

// meta data
export const metadata: Metadata = {
  title: "Admin",
}

export default function AdminDashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      {/* breadcrumb */}
      <DynamicBreadcrumb items={dashboardItems} />

      {/* client */}
      <AdminDashboardClient />
    </ContentLayout>
  )
}
