using System.Collections.Generic;
using System.Threading.Tasks;

namespace LemVik.Examples.TodoList.Models
{
    public interface IUserTasksRepository
    {
        Task<UserTask> GetTask(ulong id); 
        
        Task<IEnumerable<UserTask>> ListTasks();
    }
}
