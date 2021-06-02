using System;

namespace LemVik.Examples.TodoList.Controllers.DTO
{
    public class UserTask
    {
        public ulong Id { get; set; }
        public string Summary { get; set; } 
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime DueAt { get; set; }
        public int Priority { get; set; }
        public UserTaskStatus Status { get; set; }
    }
}
