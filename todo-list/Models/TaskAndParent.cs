using Microsoft.EntityFrameworkCore;

namespace LemVik.Examples.TodoList.Models
{
    [Keyless]
    public class TaskAndParent
    {
        public ulong Id { get; set; } 
        public ulong? ParentId { get; set; } 
    }
}
