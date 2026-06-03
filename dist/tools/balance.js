/**
 * Balance tool — check Meshy account credit balance
 */
import { handleMeshyError } from "../services/error-handler.js";
import { CheckBalanceInputSchema } from "../schemas/balance.js";
import { BalanceOutputSchema } from "../schemas/output.js";
import { ResponseFormat } from "../constants.js";
export function registerBalanceTool(server, client) {
    server.registerTool("meshy_check_balance", {
        title: "Check Credit Balance",
        description: `Check your Meshy account credit balance.\n\nReturns the current number of credits available in your account.\n\nArgs:\n  - response_format (enum): Output format - "markdown" or "json" (default: "markdown")\n\nReturns:\n  { "balance": 150 }`,
        inputSchema: CheckBalanceInputSchema,
        outputSchema: BalanceOutputSchema,
        annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true }
    }, async (params) => {
        try {
            const data = await client.get("/openapi/v1/balance");
            const output = { balance: data.balance };
            const textContent = params.response_format === ResponseFormat.MARKDOWN
                ? `# Meshy Credit Balance\n\n**Balance**: ${data.balance} credits`
                : JSON.stringify(output, null, 2);
            return { content: [{ type: "text", text: textContent }], structuredContent: output };
        } catch (error) {
            return { isError: true, content: [{ type: "text", text: handleMeshyError(error) }] };
        }
    });
}
