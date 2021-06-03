using System;
using System.Collections.Generic;
using System.Linq;

namespace LemVik.Examples.TodoList.Controllers.DTO
{
    public class UserTask
    {
        public ulong Id { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? DueAt { get; set; }
        public int Priority { get; set; }
        public UserTaskStatus Status { get; set; }
        public List<UserTask> SubTasks { get; set; }
        public ulong? ParentId { get; set; }

        public Models.UserTask ToModel()
        {
            // Only those fields that are available and safe to set are set.
            // This method is mostly used during creation of the UserTask via PUT.
            return new()
            {
                Id = this.Id,
                Summary = this.Summary,
                Description = this.Description,
                DueAt = this.DueAt,
                Priority = this.Priority,
                Status = ToModelStatus(this.Status),
            };
        }

        public static UserTask FromModel(Models.UserTask modelTask)
        {
            return new()
            {
                Id = modelTask.Id,
                Summary = modelTask.Summary,
                Description = modelTask.Description,
                CreatedAt = modelTask.CreatedAt,
                DueAt = modelTask.DueAt,
                Priority = modelTask.Priority,
                Status = FromModelStatus(modelTask.Status),
                ParentId = modelTask.Parent?.Id,
                SubTasks = modelTask.SubTasks.Select(FromModel).ToList()
            };
        }

        private static UserTaskStatus FromModelStatus(Models.UserTaskStatus status)
        {
            switch (status)
            {
                case Models.UserTaskStatus.Reserved:
                    return UserTaskStatus.Reserved;
                case Models.UserTaskStatus.Ongoing:
                    return UserTaskStatus.Ongoing; 
                case Models.UserTaskStatus.Done:
                    return UserTaskStatus.Done; 
                case Models.UserTaskStatus.Pending:
                    return UserTaskStatus.Pending; 
                default:
                    throw new ArgumentOutOfRangeException(nameof(status), status, null);
            }
        }

        private static Models.UserTaskStatus ToModelStatus(UserTaskStatus status)
        {
            switch (status)
            {
                case UserTaskStatus.Reserved:
                    return Models.UserTaskStatus.Reserved;
                case UserTaskStatus.Ongoing:
                    return Models.UserTaskStatus.Ongoing;
                case UserTaskStatus.Done:
                    return Models.UserTaskStatus.Done;
                case UserTaskStatus.Pending:
                    return Models.UserTaskStatus.Pending;
                default:
                    throw new ArgumentOutOfRangeException(nameof(status), status, null);
            }
        }
    }
}
