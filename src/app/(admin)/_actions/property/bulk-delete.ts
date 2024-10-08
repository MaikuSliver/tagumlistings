"use server"

// configs
import { httpRequest } from "@/lib/config/http"

// types
import type { Property } from "@/app/(admin)/_components/data/properties"

export interface DeletePropertiesProps {
  ids: string[]
}

export async function deleteProperties(
  ids: DeletePropertiesProps,
): Promise<Property[]> {
  const URL = "property/bulk-delete"
  const response = await httpRequest<DeletePropertiesProps, Property[]>(
    URL,
    "POST",
    {
      body: ids,
    },
  )
  return response
}
