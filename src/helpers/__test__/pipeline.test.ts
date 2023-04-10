import { runPipeline } from '../pipeline'; // 假设您的 `runPipeline` 函数在一个名为 `pipeline.ts` 的文件中

describe('runPipeline', () => {
  const task1 = async (input: number): Promise<string> => {
    return `Task 1 result: ${input * 2}`;
  };

  const task1_1 = async (input: string): Promise<string> => {
    return `Task 1-1 result: ${input}`;
  };

  const task1_2 = async (input: string): Promise<string> => {
    return `Task 1-2 result: ${input}`;
  };

  const task2 = async (inputs: string[]): Promise<string> => {
    return `Task 2 result: ${inputs.join(' | ')}`;
  };

  it('should execute tasks sequentially and return the final result', async () => {
    const tasks = [task1, [task1_1, task1_2], task2];
    const result = await runPipeline<number, string>(tasks as any, 5);
    expect(result).toBe('Task 2 result: Task 1-1 result: Task 1 result: 10 | Task 1-2 result: Task 1 result: 10');
  });

  it('should throw an error if one of the tasks fails', async () => {
    const failingTask = async (input: string): Promise<string> => {
      throw new Error('Task failed');
    };

    const tasks = [task1, [failingTask, task1_2], task2];
    await expect(runPipeline<number, string>(tasks as any, 5)).rejects.toThrow(
      'Pipeline execution failed: Task failed'
    );
  });
});
