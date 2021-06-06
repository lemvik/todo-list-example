using System.Collections.Generic;

namespace LemVik.Examples.TodoList.Controllers.DTO
{
    public class PaginatedResponse<T>
    {
        public IEnumerable<T> Payload { get; set; }
        public int Total { get; set; }
        public int PageSize { get; set; }
        public int Page { get; set; }
    }
}
