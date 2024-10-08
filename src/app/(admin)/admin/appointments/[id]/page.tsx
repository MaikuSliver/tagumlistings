// components
import HydrationBoundaryWrapper from "@/components/shared/hydration-boundary"
import AppointmentClient from "@/app/(admin)/_components/appointment/client"
import ContentLayout from "@/app/(admin)/_components/shared/content-layout"
import DynamicBreadcrumb from "@/components/shared/dynamic-breadcrumb"
import BounceWrapper from "@/components/shared/bounce"

// actions
import { getSession } from "@/app/(auth)/_actions/session/get"

// utils
import { appointmentItems } from "@/lib/misc/breadcrumb-lists"
import { dataSerializer } from "@/lib/utils"

// types
import type { Metadata } from "next"

// meta data
export const metadata: Metadata = {
  title: "Appointments",
}

export default async function AppointmentIDPage({
  params,
}: { params: { id: string } }) {
  // get session
  const session = await getSession()

  // session serialize
  const userData = dataSerializer(session)

  return (
    <HydrationBoundaryWrapper accountId={userData.id} appointmentId={params.id}>
      <ContentLayout title="Appointment">
        <BounceWrapper>
          <DynamicBreadcrumb items={appointmentItems} />

          <AppointmentClient id={params.id} />
        </BounceWrapper>
      </ContentLayout>
    </HydrationBoundaryWrapper>
  )
}
