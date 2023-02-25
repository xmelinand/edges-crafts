import { Elements } from '@stripe/react-stripe-js'
import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_PUBLIC_KEY } from '../config'
import CheckoutForm from './CheckoutForm'

var stripeTestPromise = loadStripe(STRIPE_PUBLIC_KEY) 

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
        <CheckoutForm/>
    </Elements>
  )
}
