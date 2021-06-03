using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LemVik.Examples.TodoList.Models;
using Microsoft.AspNetCore.Mvc;
using UserTask = LemVik.Examples.TodoList.Controllers.DTO.UserTask;

namespace LemVik.Examples.TodoList.Controllers 
{
    [ApiController]
    [Route("[controller]")]
    public class UserTaskListController : ControllerBase
    {
        private readonly IUserTasksRepository tasksRepository;

        public UserTaskListController(IUserTasksRepository tasksRepository)
        {
            this.tasksRepository = tasksRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<UserTask>> Get()
        {
            var tasks = await tasksRepository.ListTasks();

            return tasks.Select(UserTask.FromModel);
        }

        [HttpPut]
        public async Task<UserTask> Put(UserTask createdTask)
        {
            Models.UserTask parentTask = null;

            if (createdTask.ParentId.HasValue)
            {
                parentTask = await tasksRepository.GetTask(createdTask.ParentId.Value);
                if (parentTask == null)
                {
                    throw new Exception($"Cannot find supposed parent task [id={createdTask.Id}]");
                }
            }
            
            var taskModel = createdTask.ToModel();
            taskModel.Owner = null; // TODO: assign logged-in user.
            taskModel.SubTasks = new List<Models.UserTask>();
            taskModel.Parent = parentTask;
            return createdTask;
        }
    }
}
