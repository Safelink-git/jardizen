"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    nom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: "",
    isSubmitting: false,
    isSubmitted: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormState({
      ...formState,
      [name]: value,
    })
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
          email: formState.email,
          telephone: formState.telephone,
          sujet: formState.sujet,
          message: formState.message,
          type: "contact",
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

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-3 md:mb-4">Contactez-nous</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Nous sommes à votre disposition pour répondre à toutes vos questions concernant nos services de paysagisme.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Formulaire de Contact</CardTitle>
              <CardDescription>
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formState.isSubmitted ? (
                <div className="flex flex-col items-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Message Envoyé</h3>
                  <p className="text-center text-gray-600">
                    Merci pour votre message. Nous vous contacterons très prochainement.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom complet *</Label>
                    <Input id="nom" name="nom" value={formState.nom} onChange={handleChange} required />
                  </div>

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
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input
                      id="telephone"
                      name="telephone"
                      type="tel"
                      value={formState.telephone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sujet">Sujet *</Label>
                    <Select
                      value={formState.sujet}
                      onValueChange={(value) => handleSelectChange("sujet", value)}
                      required
                    >
                      <SelectTrigger id="sujet">
                        <SelectValue placeholder="Sélectionnez un sujet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="information">Demande d'information</SelectItem>
                        <SelectItem value="devis">Demande de devis</SelectItem>
                        <SelectItem value="rendez-vous">Prise de rendez-vous</SelectItem>
                        <SelectItem value="reclamation">Réclamation</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      placeholder="Votre message..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
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
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        Envoyer le message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6 md:space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Nos Coordonnées</CardTitle>
                <CardDescription>N'hésitez pas à nous contacter directement par téléphone ou email.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-gray-600">123 Rue du Jardin, 75000 Paris, France</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-gray-600">01 23 45 67 89</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">contact@jardizen.fr</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Horaires d'Ouverture</CardTitle>
                <CardDescription>Nos bureaux sont ouverts aux horaires suivants.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span>8h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi</span>
                    <span>9h00 - 16h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche</span>
                    <span>Fermé</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 md:mt-12 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Notre Emplacement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video rounded-md overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt="Carte de localisation Jardizen"
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
