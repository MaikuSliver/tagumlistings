"use client"

// action
import { deleteAppointmentDate } from "@/app/(admin)/_actions/appointment/delete-date"

// hooks
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next-nprogress-bar"

// utils
import { clientErrorHandler } from "@/lib/utils"

// types
import type { AppointmentDates } from "@/app/(admin)/_actions/appointment/get-dates"
import type { QueryFilters } from "@tanstack/react-query"

export const useDeleteAppointmentDate = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["delete-appointment-date"],
    mutationFn: async (id: string) => await deleteAppointmentDate(id),
    onSuccess: async (deletedId: string) => {
      const queryFilter: QueryFilters = {
        queryKey: ["appointment-dates"],
      }

      await queryClient.cancelQueries(queryFilter)
      queryClient.setQueryData<AppointmentDates>(
        ["appointment-dates"],
        (oldData) => {
          if (!oldData) return undefined

          return {
            ...oldData,
            dates: oldData.dates.filter((date) => date.id !== deletedId),
          }
        },
      )
    },
    onSettled: async () => {
      router.push("/admin/appointments")
      router.refresh()
    },
    onError: (error) => clientErrorHandler(error),
  })
}