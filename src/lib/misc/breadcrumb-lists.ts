interface BreadcrumbItemProps {
  label: string
  href?: string
}

// dashboard
export const dashboardItems: BreadcrumbItemProps[] = [{ label: "Dashboard" }]

// users
export const usersItems: BreadcrumbItemProps[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Users" },
]

// user
export const userItems: BreadcrumbItemProps[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Users", href: "/users" },
  { label: "User" },
]

// appointments
export const appointmentsItems: BreadcrumbItemProps[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Appointments" },
]

// appointment
export const appointmentItems: BreadcrumbItemProps[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Appointments", href: "/appointments" },
  { label: "Appointment" },
]

// payments
export const paymentsItems: BreadcrumbItemProps[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Payments" },
]

// payment
export const paymentItems: BreadcrumbItemProps[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Payment", href: "/payments" },
  { label: "Payment" },
]

// properties
export const propertiesItems: BreadcrumbItemProps[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Properties" },
]

// property
export const propertyItems: BreadcrumbItemProps[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Properties", href: "/properties" },
  { label: "Property" },
]