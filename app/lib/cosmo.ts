import { CosmosClient } from "@azure/cosmos";

const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT!,
  key: process.env.COSMOS_KEY!,
});

export const database =
  client.database("MaintenanceDB");

export const container =
  database.container("Tickets");