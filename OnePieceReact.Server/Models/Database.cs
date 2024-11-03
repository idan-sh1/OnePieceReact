using Microsoft.EntityFrameworkCore;

namespace OnePieceReact.Server.Models
{
    public class Database : DbContext
    {
        public Database(DbContextOptions<Database> options) : base(options) { }

        public DbSet<Pirate> Pirates { get; set; } = null!;
    }
}
