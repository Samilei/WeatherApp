using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.DependencyInjection;
using System.Configuration;
using Microsoft.IdentityModel.Protocols;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;
using Microsoft.EntityFrameworkCore.SqlServer.Infrastructure.Internal;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Configuration;



namespace WeatherApp.Models
{
    public partial class DatabaseContext : DbContext
    {

        
    


        public DatabaseContext()
        {

            
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options) {



       

        }

        public virtual DbSet<Location> Location { get; set; }
        public virtual DbSet<WeatherInfo> WeatherInfo { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {


       

            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source = tcp:daatta.database.windows.net, 1433; Initial Catalog = daatta; User Id = sadleinonen@daatta; Password = Tiedetään1");
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
