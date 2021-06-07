using Microsoft.EntityFrameworkCore;

namespace LemVik.Examples.TodoList.Models
{
    public class UserTasksContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<UserTask> Tasks { get; set; }
        public DbSet<TaskAndParent> TasksAndParents { get; set; }

        public UserTasksContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(new User[]
            {
                new ()
                {
                    Id = 1,
                    Name = "Tester"
                }
            });
            modelBuilder.Entity<UserTask>()
                        .HasOne<UserTask>(t => t.Parent)
                        .WithMany(t => t.SubTasks)
                        .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<TaskAndParent>().ToView(null);
            base.OnModelCreating(modelBuilder);
        }
    }
}
