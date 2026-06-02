import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Customers } from './collections/Customers'
import { Partners } from './collections/Partners'
import { Shared } from './globals/Shared'
import { Home } from './globals/Home'
import { Products } from './collections/Products'
import { Services } from './collections/Services'
import { Company } from './globals/Company'
import { Contact } from './globals/Contact'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [Shared, Home, Contact, Company],
  collections: [Products, Services, Customers, Partners, Users, Media],
  editor: lexicalEditor(),
  localization: {
    locales: ['en', 'el'],
    defaultLocale: 'en',
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
  sharp,
  plugins: [
    mcpPlugin({
      overrideApiKeyCollection: (collection) => ({
        ...collection,
        admin: {
          ...collection.admin,
          group: 'Admin',
        },
      }),
      collections: {
        products: {
          description: 'Product pages and product implementation details.',
          enabled: { find: true, create: true, update: true, delete: false },
        },
        services: {
          description: 'Service pages, feature lists, approach steps, and case studies.',
          enabled: { find: true, create: true, update: true, delete: false },
        },
        customers: {
          description: 'Customer logos and customer references shown on the website.',
          enabled: { find: true, create: true, update: true, delete: false },
        },
        partners: {
          description: 'Partner logos and partner references shown on the website.',
          enabled: { find: true, create: true, update: true, delete: false },
        },
        media: {
          description: 'Uploaded website media assets.',
          enabled: { find: true, create: true, update: true, delete: false },
        },
      },
      globals: {
        shared: {
          description: 'Shared website header, footer, logo, and global metadata.',
          enabled: { find: true, update: true },
        },
        home: {
          description: 'Localized homepage content.',
          enabled: { find: true, update: true },
        },
        contact: {
          description: 'Localized contact page content.',
          enabled: { find: true, update: true },
        },
        company: {
          description: 'Localized company page content.',
          enabled: { find: true, update: true },
        },
      },
      mcp: {
        serverOptions: {
          serverInfo: {
            name: 'ThinkRIT Payload CMS',
            version: '1.0.0',
          },
        },
      },
    }),
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
