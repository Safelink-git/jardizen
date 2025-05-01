"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Trash2, CreditCard, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

export default function PanierPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Entretien de Jardin - Forfait Mensuel",
      price: 80,
      quantity: 1,
      image: "/images/service-maintenance.jpg",
    },
    {
      id: 2,
      name: "Consultation Paysagiste",
      price: 150,
      quantity: 1,
      image: "/images/service-consulting.jpg",
    },
  ])

  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "jardizen10") {
      setDiscount(10)
      toast({
        title: "Code promo appliqué",
        description: "Une réduction de 10€ a été appliquée à votre commande.",
      })
    } else {
      setDiscount(0)
      toast({
        title: "Code promo invalide",
        description: "Le code promo saisi n'est pas valide.",
        variant: "destructive",
      })
    }
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const total = subtotal - discount

  const handleCheckout = async () => {
    setIsLoading(true)

    // Simuler un traitement de commande
    setTimeout(() => {
      setIsLoading(false)
      setIsOrderComplete(true)
    }, 1500)
  }

  if (isOrderComplete) {
    return (
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-green-800">Commande Confirmée</CardTitle>
              <CardDescription className="text-center">
                Merci pour votre commande. Votre demande a été enregistrée avec succès.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-center space-y-2 mb-6">
                <p className="font-medium">Détails de la commande :</p>
                <p>Numéro de commande : ORD-{Math.floor(Math.random() * 10000)}</p>
                <p>Date : {new Date().toLocaleDateString("fr-FR")}</p>
                <p>Montant total : {total.toFixed(2)}€</p>
                <p className="text-gray-600 mt-4">
                  Vous recevrez un email de confirmation avec tous les détails de votre commande.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button asChild variant="outline" className="border-green-600 text-green-600">
                  <Link href="/services">Continuer mes achats</Link>
                </Button>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/">Retour à l'accueil</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Votre Panier</h1>
            <p className="text-lg md:text-xl text-gray-600">Votre panier est vide</p>
          </div>

          <div className="flex flex-col items-center">
            <ShoppingCart className="h-20 md:h-24 w-20 md:w-24 text-gray-300 mb-6" />
            <p className="text-gray-600 mb-6 text-center">Vous n'avez pas encore ajouté de services à votre panier.</p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/services">Découvrir nos services</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Votre Panier</h1>
          <p className="text-lg md:text-xl text-gray-600">Vérifiez vos services et procédez à la commande</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Services Sélectionnés</CardTitle>
                <CardDescription>{cartItems.length} service(s) dans votre panier</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg?height=80&width=80"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">{item.price}€</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <div className="text-right flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                      <p className="font-medium">{item.price * item.quantity}€</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{subtotal}€</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Réduction</span>
                    <span>-{discount}€</span>
                  </div>
                )}

                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <Input
                      placeholder="Code promo"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" onClick={handleApplyCoupon}>
                    Appliquer
                  </Button>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{total}€</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? (
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
                    <span className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Commander
                    </span>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-4 text-center text-sm text-gray-600">
              <p>
                Besoin d'aide ?{" "}
                <Link href="/contact" className="text-green-600 hover:underline">
                  Contactez-nous
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
