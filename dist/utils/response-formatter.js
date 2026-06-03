/**
 * Shared response formatting for task creation tools.
 */
import { ResponseFormat } from "../constants.js";
export function formatTaskCreatedResponse(output, responseFormat, title, body, nextStepHint) {
    let textContent;
    if (responseFormat === ResponseFormat.MARKDOWN) {
        const taskTypeParam = nextStepHint ? ` and task_type "${nextStepHint}"` : "";
        textContent = `# ${title}\n\n**Task ID**: ${output.task_id}\n**Status**: ${output.status}\n**Estimated Time**: ${output.estimated_time}\n\n${body}\n\n**Next Steps**:\n1. **Recommended**: Use \`meshy_get_task_status\` with task_id "${output.task_id}"${taskTypeParam} to automatically wait for completion.\n2. **Alternative**: Use \`meshy_get_task_status\` with wait=false to check once.`;
    }
    else {
        textContent = JSON.stringify(output, null, 2);
    }
    return {
        content: [{ type: "text", text: textContent }],
        structuredContent: output
    };
}
