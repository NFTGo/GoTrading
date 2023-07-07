# ..

create offer / listing

accept offer / listing

cancel orders (both offer & listing)


# Usage
```ts
const { actions, executeAllActions } = await createListing();

// way.1
const executor = utils.createActionExecutor(actions);
executor.execute({
    onTaskExecuted(task){
        console.log(task.action, task.index, task.status)
    }
})

// way.2
for(const task of executor) {
    await task.execute();
    console.log(task.action, task.index, task.status)
}

// way.3 same as way.1
executeAllActions({
    onTaskExecuted(task) {
        console.log(task.action, task.index, task.status)
    }
})

// way.4 same as way.2
const tasks = utils.createActionTasks(actions);
for(const task of tasks) {
    await task.execute();
    console.log(task.action, task.index, task.status)
}

```

for way.2 and way.4 you have more freedom to customize workflow

such as

```ts

const { actions } = await createListing();

const executor = utils.createActionExecutor(actions);
for(const task of executor) {
    if(task.action.kind === TradeActionKind.Signature) {
        const signature = 'do your own logic to get user signature';
        task.result = {
            signature
        }
        continue;
    }
    await task.execute();
}
```
