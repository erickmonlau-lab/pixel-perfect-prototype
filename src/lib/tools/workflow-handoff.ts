/**
 * In-Memory Handoff Store for Multi-Tool Workflow Chaining
 *
 * Transfers output files between tools in the browser without intermediate download or disk write.
 * Memory safety:
 * - Stored in RAM via standard JavaScript File array.
 * - Automatically consumed on next tool arrival or cleared.
 * - Zero server communication, 100% private.
 */

let pendingWorkflowFiles: File[] | null = null;
let pendingTargetToolSlug: string | null = null;

export function setPendingWorkflowFiles(targetToolSlug: string, files: File[]): void {
  pendingTargetToolSlug = targetToolSlug;
  pendingWorkflowFiles = files;
}

export function consumePendingWorkflowFiles(currentToolSlug: string): File[] | null {
  if (pendingTargetToolSlug === currentToolSlug && pendingWorkflowFiles) {
    const files = pendingWorkflowFiles;
    pendingWorkflowFiles = null;
    pendingTargetToolSlug = null;
    return files;
  }
  return null;
}

export function clearPendingWorkflowFiles(): void {
  pendingWorkflowFiles = null;
  pendingTargetToolSlug = null;
}
