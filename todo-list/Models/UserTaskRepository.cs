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
            return databaseContext.Tasks.FindAsync(id).AsTask();
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

        public Task SaveChangesAsync()
        {
            return databaseContext.SaveChangesAsync();
        }
    }
}
