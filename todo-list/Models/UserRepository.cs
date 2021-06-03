using System.Threading.Tasks;

namespace LemVik.Examples.TodoList.Models
{
    public class UserRepository : IUserRepository
    {
        private readonly UserTasksContext databaseContext;

        public UserRepository(UserTasksContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public Task<User> GetUser(ulong id)
        {
            return databaseContext.Users.FindAsync(id).AsTask();
        }
    }
}
