/** @type { import("drizzle-kit").config} */

export default {
  schema: "./utils/schema.tsx",
  dialect: 'postgresql',
  dbCredentials:{
    url:'postgresql://neondb_owner:npg_bj39kyqAaoMV@ep-purple-boat-a8ciddyx-pooler.eastus2.azure.neon.tech/AI-Content-Generator?sslmode=require'
  }
};
