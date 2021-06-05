using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LemVik.Examples.TodoList.Models
{
    public class UserTask
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public ulong Id { get; set; }
        
        [Required]
        public User Owner { get; set; }

        [Required]
        public string Summary { get; set; }

        public string Description { get; set; }

        public DateTime? CreatedAt { get; set; } = DateTime.Now;

        public DateTime? DueAt { get; set; }

        [Required]
        public int Priority { get; set; } = 0;

        [Required]
        public UserTaskStatus Status { get; set; } = UserTaskStatus.Reserved;
        
        public UserTask Parent { get; set; }
        public List<UserTask> SubTasks { get; set; } = new();
    }
}
