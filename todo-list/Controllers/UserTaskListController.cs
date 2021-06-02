using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using LemVik.Examples.TodoList.Controllers.DTO;
using Microsoft.AspNetCore.Mvc;

namespace LemVik.Examples.TodoList.Controllers 
{
    [ApiController]
    [Route("[controller]")]
    public class UserTaskListController : ControllerBase
    {
        private readonly UserTask[] hardcodedTasks = {
            new()
            {
                Id = 1,
                Summary = "Summary",
                Description = "Description",
                CreatedAt = DateTime.Now,
                DueAt = DateTime.Now + TimeSpan.FromHours(1),
                Priority = 1,
                Status = UserTaskStatus.Reserved
            }
        };
        
        [HttpGet]
        public Task<IEnumerable<UserTask>> Get()
        {
            return Task.FromResult<IEnumerable<UserTask>>(hardcodedTasks);
        }
    }
}
