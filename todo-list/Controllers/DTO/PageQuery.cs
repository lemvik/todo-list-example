using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace LemVik.Examples.TodoList.Controllers.DTO
{
    public class PageQuery
    {
        [Required]
        [Range(0, int.MaxValue)]
        public int Page { get; set; } = 0;
        [Required]
        [Range(1, 50)]
        public int PageSize { get; set; } = 5;

        public IQueryable<Models.UserTask> Apply(IQueryable<Models.UserTask> source)
        {
            return source.Take(PageSize).Skip(Page * PageSize);
        }
    }
}
