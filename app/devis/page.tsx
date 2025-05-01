"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Send } from "lucide-react"

export default function DevisPage() {
  const searchParams = useSearchParams()
  const serviceId = searchParams.get("service")

  const [formState, setFormState] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    codePostal: "",
    ville: "",
    service: serviceId || "",
    description: "",
    surface: "",
    budget: "",
    datePreferee: "",
    acceptConditions: false,
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
          description: formState.description,
          surface: formState.surface,
          budget: formState.budget,
          datePreferee: formState.datePreferee,
          type: "devis",
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

  if (formState.isSubmitted) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-green-800">Demande de Devis Envoyée</CardTitle>
              <CardDescription className="text-center">
                Merci pour votre demande de devis. Nous l'avons bien reçue et nous vous contacterons dans les plus brefs
                délais.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-center text-gray-600 mb-6">
                Un membre de notre équipe examinera votre demande et vous contactera sous 24-48 heures avec un devis
                personnalisé.
              </p>
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
          <h1 className="text-4xl font-bold text-green-800 mb-4">Demande de Devis</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Remplissez le formulaire ci-dessous pour recevoir un devis personnalisé pour vos besoins en paysagisme.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Formulaire de Demande</CardTitle>
            <CardDescription>Tous les champs marqués d'un * sont obligatoires.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    <SelectItem value="1">Aménagement Paysager</SelectItem>
                    <SelectItem value="2">Entretien Régulier</SelectItem>
                    <SelectItem value="3">Plantation et Taille</SelectItem>
                    <SelectItem value="4">Systèmes d'Irrigation</SelectItem>
                    <SelectItem value="5">Terrasses et Allées</SelectItem>
                    <SelectItem value="6">Conseil et Expertise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description du projet *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  placeholder="Décrivez votre projet, vos besoins et vos attentes..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="surface">Surface approximative (m²)</Label>
                  <Input id="surface" name="surface" type="number" value={formState.surface} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget estimé (€)</Label>
                  <Input id="budget" name="budget" type="number" value={formState.budget} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="datePreferee">Date préférée pour le début des travaux</Label>
                <Input
                  id="datePreferee"
                  name="datePreferee"
                  type="date"
                  value={formState.datePreferee}
                  onChange={handleChange}
                />
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
                  J'accepte que mes données soient utilisées pour me contacter concernant ma demande de devis. *
                </Label>
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
                    Envoyer ma demande
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
