"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, Check, CreditCard } from "lucide-react"

export default function ReservationPage() {
  const searchParams = useSearchParams()
  const serviceId = searchParams.get("service")

  const [date, setDate] = useState(null)
  const [step, setStep] = useState(1)
  const [formState, setFormState] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    codePostal: "",
    ville: "",
    service: serviceId || "",
    date: null,
    heure: "",
    acceptConditions: false,
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
    isSubmitting: false,
    isSubmitted: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate)
    setFormState({
      ...formState,
      date: selectedDate,
    })
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormState({ ...formState, isSubmitting: true })

    try {
      const response = await fetch("https://formspree.io/f/mnndjkyz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: formState.nom,
          prenom: formState.prenom,
          email: formState.email,
          telephone: formState.telephone,
          adresse: formState.adresse,
          codePostal: formState.codePostal,
          ville: formState.ville,
          service: formState.service,
          date: formState.date ? format(formState.date, "dd/MM/yyyy") : "",
          heure: formState.heure,
          type: "reservation",
          // Ne pas envoyer les informations de carte bancaire pour des raisons de sécurité
          // Ceci est juste une simulation
        }),
      })

      if (response.ok) {
        setFormState({
          ...formState,
          isSubmitting: false,
          isSubmitted: true,
        })
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.")
        setFormState({
          ...formState,
          isSubmitting: false,
        })
      }
    } catch (error) {
      alert("Une erreur est survenue. Veuillez réessayer.")
      setFormState({
        ...formState,
        isSubmitting: false,
      })
    }
  }

  const services = [
    { id: "1", name: "Aménagement Paysager", price: "Sur devis" },
    { id: "2", name: "Entretien Régulier", price: "À partir de 80€" },
    { id: "3", name: "Plantation et Taille", price: "À partir de 120€" },
    { id: "4", name: "Systèmes d'Irrigation", price: "À partir de 500€" },
    { id: "5", name: "Terrasses et Allées", price: "Sur devis" },
    { id: "6", name: "Conseil et Expertise", price: "À partir de 150€" },
  ]

  const selectedService = services.find((s) => s.id === formState.service)

  if (formState.isSubmitted) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-green-800">Réservation Confirmée</CardTitle>
              <CardDescription className="text-center">
                Merci pour votre réservation. Votre rendez-vous a été confirmé.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-center space-y-2 mb-6">
                <p className="font-medium">Détails de la réservation :</p>
                <p>Service : {selectedService?.name}</p>
                {formState.date && <p>Date : {format(formState.date, "dd MMMM yyyy", { locale: fr })}</p>}
                {formState.heure && <p>Heure : {formState.heure}</p>}
                <p className="text-gray-600 mt-4">
                  Vous recevrez un email de confirmation avec tous les détails de votre réservation.
                </p>
              </div>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <a href="/">Retour à l'accueil</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Réservation de Service</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Réservez un rendez-vous avec nos experts en paysagisme en quelques étapes simples.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>
              {step === 1 && "Informations Personnelles"}
              {step === 2 && "Sélection du Service et de la Date"}
              {step === 3 && "Paiement"}
            </CardTitle>
            <CardDescription>Étape {step} sur 3</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom *</Label>
                      <Input id="nom" name="nom" value={formState.nom} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prénom *</Label>
                      <Input id="prenom" name="prenom" value={formState.prenom} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone *</Label>
                      <Input
                        id="telephone"
                        name="telephone"
                        type="tel"
                        value={formState.telephone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adresse">Adresse *</Label>
                    <Input id="adresse" name="adresse" value={formState.adresse} onChange={handleChange} required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="codePostal">Code Postal *</Label>
                      <Input
                        id="codePostal"
                        name="codePostal"
                        value={formState.codePostal}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="ville">Ville *</Label>
                      <Input id="ville" name="ville" value={formState.ville} onChange={handleChange} required />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="service">Service souhaité *</Label>
                    <Select
                      value={formState.service}
                      onValueChange={(value) => handleSelectChange("service", value)}
                      required
                    >
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Sélectionnez un service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} - {service.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date du rendez-vous *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "dd MMMM yyyy", { locale: fr }) : <span>Sélectionnez une date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateSelect}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heure">Heure préférée *</Label>
                    <Select
                      value={formState.heure}
                      onValueChange={(value) => handleSelectChange("heure", value)}
                      required
                    >
                      <SelectTrigger id="heure">
                        <SelectValue placeholder="Sélectionnez une heure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">09:00</SelectItem>
                        <SelectItem value="10:00">10:00</SelectItem>
                        <SelectItem value="11:00">11:00</SelectItem>
                        <SelectItem value="14:00">14:00</SelectItem>
                        <SelectItem value="15:00">15:00</SelectItem>
                        <SelectItem value="16:00">16:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="acceptConditions"
                      name="acceptConditions"
                      checked={formState.acceptConditions}
                      onCheckedChange={(checked) => handleSelectChange("acceptConditions", checked)}
                      required
                    />
                    <Label htmlFor="acceptConditions" className="text-sm">
                      J'accepte les conditions générales de service et la politique de confidentialité. *
                    </Label>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-green-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-green-800 mb-2">Récapitulatif de la réservation</h3>
                    <p>Service : {selectedService?.name}</p>
                    {formState.date && <p>Date : {format(formState.date, "dd MMMM yyyy", { locale: fr })}</p>}
                    {formState.heure && <p>Heure : {formState.heure}</p>}
                    <p className="font-semibold mt-2">Prix : {selectedService?.price}</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Informations de paiement
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formState.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nom sur la carte</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formState.cardName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Date d'expiration</Label>
                        <Input
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formState.cardExpiry}
                          onChange={handleChange}
                          placeholder="MM/AA"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardCvc">CVC</Label>
                        <Input
                          id="cardCvc"
                          name="cardCvc"
                          value={formState.cardCvc}
                          onChange={handleChange}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 && (
              <Button variant="outline" onClick={prevStep}>
                Précédent
              </Button>
            )}
            {step < 3 ? (
              <Button className="bg-green-600 hover:bg-green-700 ml-auto" onClick={nextStep}>
                Suivant
              </Button>
            ) : (
              <Button
                className="bg-green-600 hover:bg-green-700 ml-auto"
                onClick={handleSubmit}
                disabled={formState.isSubmitting}
              >
                {formState.isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Traitement...
                  </span>
                ) : (
                  "Confirmer et payer"
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
