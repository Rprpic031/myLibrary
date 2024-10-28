using System.ComponentModel.DataAnnotations;

namespace Library.Models
{
    public abstract class Entity
    {
        [Key]
        public int? Id { get; set; }
    }
}
