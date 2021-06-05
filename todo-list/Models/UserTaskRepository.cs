using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace LemVik.Examples.TodoList.Models
{
    public class UserTaskRepository : IUserTasksRepository
    {
        private readonly UserTasksContext databaseContext;

        public UserTaskRepository(UserTasksContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public Task Insert(UserTask newOne)
        {
            return databaseContext.Tasks.AddAsync(newOne).AsTask();
        }

        public Task<UserTask> GetTask(ulong id)
        {
            return databaseContext.Tasks.FindAsync(id).AsTask();
        }

        public Task Delete(UserTask toDelete)
        {
            databaseContext.Tasks.Remove(toDelete);
            return Task.CompletedTask;
        }

        public async Task<IEnumerable<UserTask>> ListTasks()
        {
            var tasks = databaseContext.Tasks.FromSqlRaw(@"
            WITH RECURSIVE task_list(Id, OwnerId, Summary, Description, CreatedAt, DueAt, Priority, Status, ParentId) AS
            (
            SELECT Id, OwnerId, Summary, Description, CreatedAt, DueAt, Priority, Status, ParentId FROM Tasks WHERE ParentId IS NULL
            UNION ALL
            SELECT t.Id, t.OwnerId, t.Summary, t.Description, t.CreatedAt, t.DueAt, t.Priority, t.Status, t.ParentId 
                FROM task_list AS tl INNER JOIN Tasks AS t ON tl.Id = t.ParentId
            )
            SELECT * FROM task_list
            ").AsNoTrackingWithIdentityResolution().AsAsyncEnumerable();

            return await tasks.Where(task => task.Parent == null).ToListAsync();
        }

        public Task SaveChangesAsync()
        {
            return databaseContext.SaveChangesAsync();
        }
    }
}
