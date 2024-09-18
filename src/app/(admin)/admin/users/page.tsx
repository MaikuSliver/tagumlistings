// components
import HydrationBoundaryWrapper from "@/components/shared/hydration-boundary"
import ContentLayout from "@/app/(admin)/_components/shared/content-layout"
import DynamicBreadcrumb from "@/components/shared/dynamic-breadcrumb"
import UsersClient from "@/app/(admin)/_components/users/client"
import BounceWrapper from "@/components/shared/bounce"

// actions
import { getSession } from "@/app/(auth)/_actions/get-session"

// utils
import { usersItems } from "@/lib/misc/breadcrumb-lists"
import { dataSerializer } from "@/lib/utils"

// types
import type { Metadata } from "next"

// meta data
export const metadata: Metadata = {
  title: "Users",
}

export default async function UsersPage() {
  // get session
  const session = await getSession()

  // session serialize
  const userData = dataSerializer(session)

  return (
    <HydrationBoundaryWrapper accountId={userData.id}>
      <ContentLayout title="Users">
        <BounceWrapper>
          <DynamicBreadcrumb items={usersItems} />

          <UsersClient />
        </BounceWrapper>
      </ContentLayout>
    </HydrationBoundaryWrapper>
  )
}
