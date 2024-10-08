// components
import SessionProvider from "@/components/providers/session"

// utils
import SidePanel from "@/app/(admin)/_components/shared/side-panel"
import { dataSerializer } from "@/lib/utils"

// actions
import { getSession } from "@/app/(auth)/_actions/session/get"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // get session
  const session = await getSession()

  // session serialize
  const userData = dataSerializer(session)

  return (
    <SessionProvider value={userData}>
      <SidePanel>{children}</SidePanel>
    </SessionProvider>
  )
}
