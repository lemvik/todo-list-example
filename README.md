## Task list application

### Objectives

The user can create new tasks and delete, update the existing tasks.

- [x] The task is going to have
  - [x] Summary: string
  - [x] Description: string
  - [x] Create date: date
  - [x] Due date: date
  - [x] Priority: integer
  - [x] Status: Reserved / Ongoing / Done / Pending
- [x] Unlimited numbers of sub-tasks can be created under the task.
- [x] Unlimited numbers of the depth of sub-tasks.
- [x] All the data is going to be stored in DB. You can choose MySQL or DynamoDB. If you want to use any other, please let us know beforehand.
- [x] The tasks can be moved into a different location in the list. Any sub-task can be moved under a different task, or even it can be another top-level task.
- [x] A Top-level task can be moved under the other task. For this case, if there were any sub-tasks with the moved top-level task, all the sub-tasks are going to follow the moved top-level task.
- [x] On the list, the tasks can be sorted by each data field. You do not need to sort sub-tasks.

### Notes on implementation

- To run the application, do the following:
  - `docker-compose up -d` (note that sometimes DB can take long time to start accepting connections, one possible fix would be to use tools from [here](https://docs.docker.com/compose/startup-order/), if that's the case, just `docker-compose down && docker-compose up -d` for now)
  - navigate to `localhost` (assuming port 80 is bind-able on your machine, if not, modify `docker-compose.yaml` to make `tasks` use different port)
- To create a task - use button on the top right corner.
- To re-parent a task - use `Edit` button and specify the parent ID (it's inconvenient, but nice UI would have taken some more time)
- To display sub-tasks - click on `Subtasks` button.

Unfortunately, due to time constraints on my side there are quite a few things that need to be improved:

- There is currently no authentication and user is hard-coded (in `Create` controller method).
  - This makes an app effectively single-user.
- There are no tests. Functionality is easy to test, but I had time to write only minimal app since UI coding was quite slow for me. So either functional UI or tests.
- Migrations are at run-time since it's easier to package stuff into `docker-compose` swarm.
