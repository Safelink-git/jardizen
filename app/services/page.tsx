import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Check } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "Aménagement Paysager",
      description: "Conception et réalisation de jardins sur mesure adaptés à vos besoins et à votre espace.",
      features: [
        "Conception de plans personnalisés",
        "Sélection de plantes adaptées",
        "Installation de systèmes d'irrigation",
        "Aménagement de zones de détente",
        "Éclairage paysager",
      ],
      price: "Sur devis",
      image: "/images/service-landscaping.jpg",
    },
    {
      id: 2,
      title: "Entretien Régulier",
      description: "Services d'entretien programmés pour maintenir votre jardin en parfait état toute l'année.",
      features: [
        "Tonte de pelouse",
        "Taille de haies et arbustes",
        "Désherbage et traitement",
        "Fertilisation saisonnière",
        "Nettoyage et évacuation des déchets",
      ],
      price: "À partir de 80€/mois",
      image: "/images/service-maintenance.jpg",
    },
    {
      id: 3,
      title: "Plantation et Taille",
      description: "Services de plantation d'arbres, arbustes et fleurs, ainsi que taille et élagage professionnels.",
      features: [
        "Plantation d'arbres et arbustes",
        "Création de massifs floraux",
        "Taille d'entretien et de formation",
        "Élagage d'arbres",
        "Conseils d'entretien personnalisés",
      ],
      price: "À partir de 120€",
      image: "/images/service-planting.jpg",
    },
    {
      id: 4,
      title: "Systèmes d'Irrigation",
      description: "Installation et maintenance de systèmes d'arrosage automatiques pour un jardin toujours hydraté.",
      features: [
        "Étude et conception sur mesure",
        "Installation de systèmes goutte à goutte",
        "Arrosage automatique programmable",
        "Récupération d'eau de pluie",
        "Maintenance et réparation",
      ],
      price: "À partir de 500€",
      image: "/images/service-irrigation.jpg",
    },
    {
      id: 5,
      title: "Terrasses et Allées",
      description: "Création de terrasses, allées et autres aménagements extérieurs pour valoriser votre espace.",
      features: [
        "Conception personnalisée",
        "Choix de matériaux durables",
        "Installation professionnelle",
        "Drainage efficace",
        "Finitions soignées",
      ],
      price: "Sur devis",
      image: "/images/service-terrace.jpg",
    },
    {
      id: 6,
      title: "Conseil et Expertise",
      description:
        "Consultation professionnelle pour vous aider à choisir les meilleures solutions pour votre espace vert.",
      features: [
        "Analyse de sol",
        "Recommandations de plantes",
        "Plans d'aménagement",
        "Conseils d'entretien",
        "Suivi personnalisé",
      ],
      price: "À partir de 150€",
      image: "/images/service-consulting.jpg",
    },
  ]

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-3 md:mb-4">Nos Services</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de services de paysagisme pour transformer et entretenir votre espace
            extérieur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <Card key={service.id} className="border-green-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={service.image || `/placeholder.svg?height=200&width=400`}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 text-green-800">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base">{service.description}</p>
                <ul className="space-y-2 mb-6 text-sm md:text-base">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col space-y-3 md:space-y-4">
                  <p className="font-semibold text-lg">{service.price}</p>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button asChild className="flex-1 bg-green-600 hover:bg-green-700">
                      <Link href={`/reservation?service=${service.id}`}>Réserver</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
                    >
                      <Link href={`/devis?service=${service.id}`}>Devis</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
