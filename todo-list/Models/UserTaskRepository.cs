using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LemVik.Examples.TodoList.Models
{
    public class UserTaskRepository : IUserTasksRepository
    {
        private readonly UserTasksContext databaseContext;

        public UserTaskRepository(UserTasksContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public Task<UserTask> GetTask(ulong id)
        {
            return databaseContext.Tasks.FindAsync(id).AsTask();
        }

        public Task<IEnumerable<UserTask>> ListTasks()
        {
            return Task.FromResult(databaseContext.Tasks.AsEnumerable());
        }
    }
}
