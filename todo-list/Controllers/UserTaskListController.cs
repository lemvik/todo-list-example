using System.Linq;
using System.Threading.Tasks;
using LemVik.Examples.TodoList.Controllers.DTO;
using LemVik.Examples.TodoList.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using UserTask = LemVik.Examples.TodoList.Controllers.DTO.UserTask;

namespace LemVik.Examples.TodoList.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class UserTaskListController : ControllerBase
    {
        private readonly ILogger<UserTaskListController> logger;

        // TODO: this should be replaced with authorization. 
        private readonly IUserRepository userRepository;
        private readonly IUserTasksRepository tasksRepository;

        public UserTaskListController(ILogger<UserTaskListController> logger,
                                      IUserRepository userRepository,
                                      IUserTasksRepository tasksRepository)
        {
            this.logger = logger;
            this.tasksRepository = tasksRepository;
            this.userRepository = userRepository;
        }

        [HttpGet]
        public async Task<PaginatedResponse<UserTask>> List([FromQuery] ListQuery query)
        {
            var count = await tasksRepository.CountTasks(query.ApplyNoPaging);
            var tasks = await tasksRepository.ListTasks(query.ApplyPaging);

            return new PaginatedResponse<UserTask>
            {
                Page = query.Page,
                PageSize = query.PageSize,
                Total = count,
                Payload = tasks.Select(UserTask.FromModel)
            };
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<UserTask>> Get(ulong id)
        {
            var task = await tasksRepository.GetTask(id);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(UserTask.FromModel(task));
        }

        [HttpPost]
        public async Task<ActionResult<UserTask>> Create(UserTask createdTask)
        {
            Models.UserTask parentTask = null;

            if (createdTask.ParentId.HasValue)
            {
                parentTask = await tasksRepository.GetTask(createdTask.ParentId.Value);
                if (parentTask == null)
                {
                    return NotFound();
                }
            }

            var taskModel = createdTask.ToModel();
            taskModel.Owner = await userRepository.GetUser(1); // TODO: assign logged-in user.
            taskModel.Parent = parentTask;

            await tasksRepository.Insert(taskModel);
            await tasksRepository.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new {id = taskModel.Id}, UserTask.FromModel(taskModel));
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<UserTask>> Update(ulong id, [FromBody] UserTask userTask)
        {
            var existing = await tasksRepository.GetTask(id);
            if (existing == null)
            {
                return NotFound();
            }

            existing.Summary = userTask.Summary;
            existing.Description = userTask.Description;
            existing.Priority = userTask.Priority;
            existing.DueAt = userTask.DueAt;
            existing.Status = (Models.UserTaskStatus) userTask.Status;

            var forbiddenIds = await tasksRepository.SubTaskIds(id);

            if (userTask.ParentId.HasValue && forbiddenIds.Contains(userTask.ParentId.Value))
            {
                return BadRequest();
            }

            if (userTask.ParentId != existing.Parent?.Id)
            {
                if (userTask.ParentId.HasValue)
                {
                    var newParent = await tasksRepository.GetTask(userTask.ParentId.Value);

                    if (newParent == null)
                    {
                        return NotFound();
                    }

                    existing.Parent = newParent;
                }
                else
                {
                    existing.Parent = null;
                }
            }

            await tasksRepository.SaveChangesAsync();

            return UserTask.FromModel(existing);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> Delete(ulong id)
        {
            var existing = await tasksRepository.GetTask(id);
            if (existing == null)
            {
                return NotFound();
            }

            await tasksRepository.Delete(existing);
            await tasksRepository.SaveChangesAsync();

            return NoContent();
        }
    }
}
