using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace plain_api.Models;

public partial class NbaappContext : DbContext
{
    public NbaappContext()
    {
    }

    public NbaappContext(DbContextOptions<NbaappContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Player> Players { get; set; }

    public virtual DbSet<Team> Teams { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Server=localhost;Port=5432;Database=nbaapp;User Id=jahan;Password=jahan;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Player>(entity =>
        {
            entity.Property(e => e.Collegename)
                .HasColumnType("character varying")
                .HasColumnName("collegename");
            entity.Property(e => e.Country)
                .HasColumnType("character varying")
                .HasColumnName("country");
            entity.Property(e => e.Dateofbirth)
                .HasColumnType("character varying")
                .HasColumnName("dateofbirth");
            entity.Property(e => e.Firstname)
                .HasColumnType("character varying")
                .HasColumnName("firstname");
            entity.Property(e => e.Jersey)
                .HasColumnType("character varying")
                .HasColumnName("jersey");
            entity.Property(e => e.Lastname)
                .HasColumnType("character varying")
                .HasColumnName("lastname");
            entity.Property(e => e.Personid)
                .HasColumnType("character varying")
                .HasColumnName("personid");
            entity.Property(e => e.Yearspro)
                .HasColumnType("character varying")
                .HasColumnName("yearspro");
        });

        modelBuilder.Entity<Team>(entity =>
        {
            entity.HasKey(e => e.Teamname).HasName("teams_pkey");

            entity.ToTable("teams");

            entity.Property(e => e.Teamname)
                .HasColumnType("character varying")
                .HasColumnName("teamname");
            entity.Property(e => e.Coloraccent)
                .HasColumnType("character varying")
                .HasColumnName("coloraccent");
            entity.Property(e => e.Colormain)
                .HasColumnType("character varying")
                .HasColumnName("colormain");
            entity.Property(e => e.Coloroff)
                .HasColumnType("character varying")
                .HasColumnName("coloroff");
            entity.Property(e => e.Teamid)
                .HasColumnType("character varying")
                .HasColumnName("teamid");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
