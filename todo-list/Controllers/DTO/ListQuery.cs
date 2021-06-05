using System.Linq;

namespace LemVik.Examples.TodoList.Controllers.DTO
{
    public class ListQuery
    {
        public ulong? Parent { get; set; }
        public string OrderBy { get; set; } = "id";
        public string Ordering { get; set; } = "asc";
        public string Summary { get; set; }
        public string Description { get; set; }
        public int? PriorityMin { get; set; }
        public int? PriorityMax { get; set; }
        public UserTaskStatus? Status { get; set; }

        public IQueryable<Models.UserTask> Apply(IQueryable<Models.UserTask> source)
        {
            return ApplyOrdering(ApplyFiltering(source));
        }

        private IQueryable<Models.UserTask> ApplyOrdering(IQueryable<Models.UserTask> source)
        {
            source = OrderBy switch
            {
                "summary" => source.OrderBy(t => t.Summary),
                "status" => source.OrderBy(t => t.Status),
                "priority" => source.OrderBy(t => t.Priority),
                _ => source.OrderBy(t => t.Id)
            };

            if (Ordering == "desc")
            {
                source = source.Reverse();
            }

            return source;
        }

        private IQueryable<Models.UserTask> ApplyFiltering(IQueryable<Models.UserTask> source)
        {
            source = Parent.HasValue
                ? source.Where(t => t.Parent.Id == Parent.Value)
                : source.Where(t => t.Parent == null);

            if (Summary != null)
            {
                source = source.Where(t => t.Summary.Contains(Summary));
            }

            if (Description != null)
            {
                source = source.Where(t => t.Description.Contains(Description));
            }

            if (PriorityMin.HasValue)
            {
                source = source.Where(t => t.Priority >= PriorityMin.Value);
            }

            if (PriorityMax.HasValue)
            {
                source = source.Where(t => t.Priority <= PriorityMax.Value);
            }

            if (Status.HasValue)
            {
                source = source.Where(t => t.Status == (Models.UserTaskStatus) Status.Value);
            }

            return source;
        }
    }
}
