// hooks
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next-nprogress-bar"

// actions
import { registerAccount } from "@/app/(auth)/_actions/auth/register"

// utils
import { clientErrorHandler, sanitizer } from "@/lib/utils"
import { registerSchema } from "@/lib/validation"
import DOMPurify from "dompurify"

// types
import type { RegisterValues } from "@/lib/validation"
import type { QueryFilters } from "@tanstack/react-query"
import type { Accounts } from "@/app/(auth)/_actions/auth/get-all"

const purify = DOMPurify

export const useRegisterAccount = (status?: "client" | "admin") => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["register-account"],
    mutationFn: async (values: RegisterValues) => {
      const sanitizedData = sanitizer<RegisterValues>(
        values,
        registerSchema,
        purify,
      )
      return await registerAccount(sanitizedData)
    },
    onSuccess: async (newUser) => {
      const queryFilter: QueryFilters = {
        queryKey: ["accounts"],
      }

      await queryClient.cancelQueries(queryFilter)
      queryClient.setQueryData<Accounts>(["accounts"], (oldData) => {
        if (!oldData) {
          return { accounts: [newUser] }
        }
        return {
          ...oldData,
          accounts: [...oldData.accounts, newUser],
        }
      })

      if (status === "client") {
        router.push("/")
        router.refresh()
      }

      if (status === "admin") {
        router.refresh()
      }
    },
    onSettled: () => {
      router.refresh()
    },
    onError: (error) => clientErrorHandler(error),
  })
}
