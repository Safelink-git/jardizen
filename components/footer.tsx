import Link from "next/link"
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-lg sm:text-xl font-bold">Jardizen</span>
            </div>
            <p className="text-green-100 mb-4 text-sm sm:text-base">
              Votre partenaire pour tous vos projets de paysagisme et d'aménagement extérieur.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-green-200">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white hover:text-green-200">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white hover:text-green-200">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link href="/services" className="text-green-100 hover:text-white">
                  Aménagement Paysager
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-green-100 hover:text-white">
                  Entretien de Jardin
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-green-100 hover:text-white">
                  Plantation et Taille
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-green-100 hover:text-white">
                  Systèmes d'Irrigation
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-green-100 hover:text-white">
                  Terrasses et Allées
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link href="/" className="text-green-100 hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-green-100 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/devis" className="text-green-100 hover:text-white">
                  Demander un Devis
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="text-green-100 hover:text-white">
                  Réservation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-green-100 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-green-100">123 Rue du Jardin, 75000 Paris, France</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span className="text-green-100">01 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span className="text-green-100">contact@jardizen.fr</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-green-100 text-sm">
          <p>&copy; {new Date().getFullYear()} Jardizen. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
