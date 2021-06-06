using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LemVik.Examples.TodoList.Models
{
    public interface IUserTasksRepository
    {
        Task Insert(UserTask newOne);

        Task<UserTask> GetTask(ulong id);

        Task Delete(UserTask toDelete);

        Task<int> CountTasks(Func<IQueryable<UserTask>, IQueryable<UserTask>> mapper);
        
        Task<IEnumerable<UserTask>> ListTasks(Func<IQueryable<UserTask>, IQueryable<UserTask>> mapper);

        Task SaveChangesAsync();
    }
}
