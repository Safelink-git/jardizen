import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Leaf, Calendar, FileText } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1659775272289-d0647806a6d4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Jardinage professionnel"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-start">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-2 md:mb-4">Jardizen</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 md:mb-8 max-w-2xl">
            Transformez votre espace extérieur avec nos services de paysagisme professionnels
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
              <Link href="/services">Nos Services</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white hover:bg-white/20 w-full sm:w-auto"
            >
              <Link href="/devis">Demander un Devis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-10 md:py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-green-800">
            Nos Services de Paysagisme
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Aménagement Paysager</h3>
                <p className="text-gray-600 text-center">
                  Conception et réalisation de jardins sur mesure adaptés à vos besoins et à votre espace.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Entretien Régulier</h3>
                <p className="text-gray-600 text-center">
                  Services d'entretien programmés pour maintenir votre jardin en parfait état toute l'année.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Conseil et Expertise</h3>
                <p className="text-gray-600 text-center">
                  Consultation professionnelle pour vous aider à choisir les meilleures solutions pour votre espace
                  vert.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8 md:mt-12">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/services">Voir tous nos services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-green-800">Comment ça marche</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Demande de Devis</h3>
              <p className="text-gray-600 text-center">
                Remplissez notre formulaire en ligne pour nous faire part de votre projet.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Consultation</h3>
              <p className="text-gray-600 text-center">
                Nous vous contactons pour discuter de vos besoins et planifier une visite si nécessaire.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Proposition</h3>
              <p className="text-gray-600 text-center">
                Nous vous envoyons un devis détaillé avec notre proposition personnalisée.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-green-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Réalisation</h3>
              <p className="text-gray-600 text-center">
                Après validation et paiement, nous réalisons votre projet selon le calendrier convenu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 md:py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-green-800">
            Ce que disent nos clients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="border-green-200">
              <CardContent className="pt-6">
                <p className="italic text-gray-600 mb-4">
                  "L'équipe de Jardizen a complètement transformé notre jardin. Leur professionnalisme et leur
                  créativité ont dépassé nos attentes."
                </p>
                <p className="font-semibold">Marie Dupont</p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardContent className="pt-6">
                <p className="italic text-gray-600 mb-4">
                  "Service impeccable et résultat magnifique. Je recommande vivement Jardizen pour tous vos projets
                  d'aménagement extérieur."
                </p>
                <p className="font-semibold">Pierre Martin</p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardContent className="pt-6">
                <p className="italic text-gray-600 mb-4">
                  "Grâce à leur service d'entretien régulier, notre jardin est toujours parfait, quelle que soit la
                  saison."
                </p>
                <p className="font-semibold">Sophie Leroy</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Prêt à transformer votre espace extérieur?</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de votre projet ou réserver un service.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-700 w-full sm:w-auto"
            >
              <Link href="/contact">Nous Contacter</Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-green-700 hover:bg-green-100 w-full sm:w-auto">
              <Link href="/reservation">Réserver un Service</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
