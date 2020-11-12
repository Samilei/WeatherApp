using Microsoft.EntityFrameworkCore;



namespace WeatherApp.Models
{
    public partial class DatabaseContext : DbContext
    {

        public DatabaseContext()
        {


        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {

        }

        public virtual DbSet<Location> Location { get; set; }
        public virtual DbSet<WeatherInfo> WeatherInfo { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //secretsien pyörittely jäi viimetippaan, joten tähän parempi toteutus vielä omalla ajalla
                optionsBuilder.UseSqlServer("Data Source = tcp:daatta.database.windows.net, 1433; Initial Catalog = daatta; User Id = sadleinonen@daatta;");
            }

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Location>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<WeatherInfo>(entity =>
            {
                entity.HasKey(e => e.WeatherId)
                    .HasName("PK__WeatherI__0BF97BF5E7214258");

                entity.Property(e => e.Location)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
