/**
 * Safe execution of custom logic using Function constructor instead of eval
 * @param logic - The custom logic string to execute
 * @param values - The form values to pass to the logic
 * @returns The result of the logic execution
 */
export function executeCustomLogic(logic: string, values: any): string {
  try {
    // Create a safe function using Function constructor
    // This is safer than eval as it doesn't have access to the local scope
    const executeLogic = new Function('values', `return (${logic})`);
    const result = executeLogic(values);
    
    // Ensure we return a string result
    if (typeof result === 'string') {
      return result;
    }
    
    // If result is not a string, convert it
    return String(result);
  } catch (error) {
    throw new Error(`Logic execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
