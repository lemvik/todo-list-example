using System.Threading.Tasks;

namespace LemVik.Examples.TodoList.Models
{
    public interface IUserRepository
    {
        Task<User> GetUser(ulong id);
    }
}
