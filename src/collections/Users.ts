import { authenticated } from '@/access'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: authenticated,
    // "read" access can be improved by creating an adminOrSelf function
    // but there will only be one user in the database
    // if we need to support multiple users in the future, we can implement adminOrSelf
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
