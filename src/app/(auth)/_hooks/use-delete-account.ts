"use client"

// action
import { deleteAccount } from "@/app/(auth)/_actions/delete-account"
import { getSession } from "@/app/(auth)/_actions/get-session"
import { logout } from "@/app/(auth)/_actions/logout"

// hooks
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next-nprogress-bar"

// utils
import { clientErrorHandler } from "@/lib/utils"

// types
import type { Accounts } from "@/app/(auth)/_actions/get-accounts"
import type { QueryFilters } from "@tanstack/react-query"
import type { UserData } from "@/lib/types"

export const useDeleteAccount = (id: string | undefined, self?: "self") => {
  const router = useRouter()

  // init query client
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["delete-account", id],
    mutationFn: async () => await deleteAccount(id!),
    onSuccess: async (users) => {
      // get session
      const session = await getSession()

      const queryFilter: QueryFilters = {
        queryKey: ["accounts"],
      }
      await queryClient.cancelQueries(queryFilter)
      queryClient.setQueryData<Accounts | undefined>(
        ["accounts"],
        (oldData) => {
          if (!oldData) return undefined

          const updatedAccounts = users.filter(
            (user) => user.id !== session?.id,
          )

          const currentUser = oldData.accounts.find(
            (user) => user.id === session?.id,
          )
          if (
            currentUser &&
            !updatedAccounts.some((user) => user.id === currentUser.id)
          ) {
            updatedAccounts.push(currentUser as UserData)
          }

          return {
            ...oldData,
            accounts: updatedAccounts,
          }
        },
      )
    },
    onSettled: async () => {
      if (self) {
        await logout()
        router.replace("/login")
        router.refresh()
      }

      router.replace("/admin/users")
      router.refresh()
    },
    onError: (error) => clientErrorHandler(error),
  })
}
