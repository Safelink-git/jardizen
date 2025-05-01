"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Leaf, ShoppingCart } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white border-b border-green-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              <span className="text-lg sm:text-xl font-bold text-green-800">Jardizen</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 font-medium text-sm lg:text-base">
              Accueil
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-green-600 font-medium text-sm lg:text-base">
              Services
            </Link>
            <Link href="/devis" className="text-gray-700 hover:text-green-600 font-medium text-sm lg:text-base">
              Devis
            </Link>
            <Link href="/reservation" className="text-gray-700 hover:text-green-600 font-medium text-sm lg:text-base">
              Réservation
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600 font-medium text-sm lg:text-base">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/panier" className="text-gray-700 hover:text-green-600 p-1">
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <Button asChild className="hidden md:flex bg-green-600 hover:bg-green-700 text-sm lg:text-base">
              <Link href="/devis">Demander un Devis</Link>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-green-600 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Accueil
                  </Link>
                  <Link
                    href="/services"
                    className="text-gray-700 hover:text-green-600 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Services
                  </Link>
                  <Link
                    href="/devis"
                    className="text-gray-700 hover:text-green-600 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Devis
                  </Link>
                  <Link
                    href="/reservation"
                    className="text-gray-700 hover:text-green-600 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Réservation
                  </Link>
                  <Link
                    href="/contact"
                    className="text-gray-700 hover:text-green-600 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                  <Button asChild className="bg-green-600 hover:bg-green-700 mt-4">
                    <Link href="/devis" onClick={() => setIsOpen(false)}>
                      Demander un Devis
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
