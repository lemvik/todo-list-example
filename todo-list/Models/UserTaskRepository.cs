using System;
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
            return databaseContext.Tasks.Include(t => t.Parent).FirstOrDefaultAsync(t => t.Id == id);
        }

        public Task Delete(UserTask toDelete)
        {
            databaseContext.Tasks.Remove(toDelete);
            return Task.CompletedTask;
        }

        public async Task<int> CountTasks(Func<IQueryable<UserTask>, IQueryable<UserTask>> mapper)
        {
            return await mapper(databaseContext.Tasks).CountAsync();
        }

        public async Task<IEnumerable<UserTask>> ListTasks(Func<IQueryable<UserTask>, IQueryable<UserTask>> mapper)
        {
            return await mapper(databaseContext.Tasks).Include(t => t.SubTasks).ToListAsync();
        }

        public async Task<IEnumerable<ulong>> SubTaskIds(ulong id)
        {
            var ids = await databaseContext.TasksAndParents.FromSqlRaw(@"
            WITH RECURSIVE task_subtasks AS (
                SELECT Id, ParentId FROM Tasks WHERE Id = {0}
                UNION ALL
                SELECT t.Id, t.ParentId FROM Tasks AS t INNER JOIN task_subtasks AS ts ON ts.Id = t.ParentId
            )
            SELECT Id, ParentId FROM task_subtasks; 
            ", id).ToListAsync();

            return ids.Select(t => t.Id);
        }

        public Task SaveChangesAsync()
        {
            return databaseContext.SaveChangesAsync();
        }
    }
}
