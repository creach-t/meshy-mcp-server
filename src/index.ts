#!/usr/bin/env node
/**
 * Meshy MCP Server
 */

import dotenv from "dotenv";
const originalLog = console.log;
console.log = (...args: unknown[]) => console.error(...args);
dotenv.config();
console.log = originalLog;

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { createMeshyClient } from "./services/meshy-client.js";
import { registerGenerationTools } from "./tools/generation.js";
import { registerTaskTools } from "./tools/tasks.js";
import { registerWorkspaceTools } from "./tools/workspace.js";
import { registerPostProcessingTools } from "./tools/postprocessing.js";
import { registerImageTools } from "./tools/image.js";
import { registerPrintingTools } from "./tools/printing.js";
import { registerBalanceTool } from "./tools/balance.js";
import { MESHY_INSTRUCTIONS } from "./instructions.js";

const server = new McpServer(
  { name: "@creach-t/meshy-mcp-server", version: "0.3.1" },
  { instructions: MESHY_INSTRUCTIONS }
);

async function initializeServer() {
  const meshyClient = await createMeshyClient();
  console.error("✓ Meshy client initialized");

  registerGenerationTools(server, meshyClient);
  registerTaskTools(server, meshyClient);
  registerWorkspaceTools(server, meshyClient);
  registerPostProcessingTools(server, meshyClient);
  registerImageTools(server, meshyClient);
  registerPrintingTools(server, meshyClient);
  registerBalanceTool(server, meshyClient);

  console.error("✓ Server initialized with all tools");
  return meshyClient;
}

async function runStdio() {
  await initializeServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("✓ Meshy MCP Server running via stdio");
}

async function runHTTP() {
  await initializeServer();
  const app = express();
  app.use(express.json({ limit: "100mb" }));
  app.get("/health", (_req, res) => res.json({ status: "ok", version: "0.3.1" }));
  app.post("/mcp", async (req, res) => {
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
    res.on("close", () => transport.close());
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  });
  const port = parseInt(process.env.PORT || "3000", 10);
  app.listen(port, () => console.error(`✓ HTTP mode on :${port}`));
}

async function main() {
  try {
    if (process.env.TRANSPORT === "http") await runHTTP();
    else await runStdio();
  } catch (e) {
    console.error("Fatal:", e);
    process.exit(1);
  }
}

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
main();
