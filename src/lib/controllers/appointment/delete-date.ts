// utils
import { convertAndCheckRateLimit, handleErrorResponse } from "@/lib/helpers"
import { doc, deleteDoc } from "firebase/firestore"
import { NextResponse } from "next/server"

// configs
import { firestore } from "@/lib/config/firebase"

// actions
import { getSession } from "@/app/(auth)/_actions/session/get"

// type
import type { NextRequest } from "next/server"

export async function deleteAppointmentDatesController(request: NextRequest) {
  try {
    const rateLimitCheck = await convertAndCheckRateLimit(request)

    if (rateLimitCheck instanceof NextResponse) {
      return rateLimitCheck
    }

    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "Missing session" }, { status: 400 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "No ID provided" }, { status: 400 })
    }

    const appointmentDateRef = doc(firestore, "appointment_dates", id)
    await deleteDoc(appointmentDateRef)

    return NextResponse.json(id, { status: 200 })
  } catch (error) {
    return await handleErrorResponse(error)
  }
}
