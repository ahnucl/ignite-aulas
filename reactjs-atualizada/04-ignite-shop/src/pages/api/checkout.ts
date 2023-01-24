// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const { priceId } = req.body

  if (!priceId) {
    return res.status(400).json({ error: 'Price not found.' })
  }

  const successUrl = `${process.env.NEXT_URL}/success`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSessio = await stripe.checkout.sessions.create({
    success_url: successUrl, // acho que só essa é obrigatória nessa versão
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      // informações sobre quais produtos o usuário está comprando
      {
        price: priceId,
        quantity: 1,
      },
    ],
  })

  return res.status(201).json({
    checkoutUrl: checkoutSessio.url,
  }) // create a checkout session
}
