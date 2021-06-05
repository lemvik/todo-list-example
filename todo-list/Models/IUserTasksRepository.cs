using System.Collections.Generic;
using System.Threading.Tasks;

namespace LemVik.Examples.TodoList.Models
{
    public interface IUserTasksRepository
    {
        Task Insert(UserTask newOne);

        Task<UserTask> GetTask(ulong id);

        Task Delete(UserTask toDelete);

        Task<IEnumerable<UserTask>> ListTasks();

        Task SaveChangesAsync();
    }
}
