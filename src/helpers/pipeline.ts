export type Task<I, O> = (input: I) => Promise<O> | O | void;
export type ParallelTask<I, O> = (input: I) => Promise<O[]> | O[] | void;

function hasMessageProperty(error: unknown): error is { message: string } {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export async function runPipeline<T, R>(
  tasks: [Task<T, any>, ...(Task<any, any> | ParallelTask<any, any>)[]],
  initialInput: T
): Promise<R> {
  try {
    let currentInput: any = initialInput;
    for (const [index, task] of tasks.entries()) {
      if (Array.isArray(task)) {
        currentInput = await Promise.all(task.map((subTask) => subTask(currentInput)));
      } else {
        currentInput = await task(currentInput);
      }
    }
    return currentInput;
  } catch (error) {
    if (hasMessageProperty(error)) {
      throw new Error(`Pipeline execution failed: ${error.message}`);
    } else {
      throw new Error('Pipeline execution failed: An unknown error occurred.');
    }
  }
}
