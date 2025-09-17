import { createClient } from 'next-sanity'

export const backendClient = createClient({
  projectId: 'y4tmnyw3',
  dataset: 'production',
  apiVersion: '2025-07-09',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
})
