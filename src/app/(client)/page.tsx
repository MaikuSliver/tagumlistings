// components
import ClientHeader from "@/app/(client)/_components/header"
import PropertyCard from "@/app/(client)/_components/property-card"

// utils
import { properties } from "@/app/(client)/constants"

export default function ClientPage() {
  return (
    <div className="font-sans min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white">
      <ClientHeader />
      <main className="mx-auto pt-8 pb-16 max-w-7xl px-4 relative z-10">
        <h2 className="text-3xl font-bold mb-6">Featured Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </main>
    </div>
  )
}
