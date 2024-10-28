namespace Library.Models
{
    public class Book : Entity
    {
        public string? Name { get; set; }
        public int? PublishYear { get; set; }
        public decimal? Price { get; set; }
        public DateTime? AvailableFrom { get; set; }
        public bool? IsAvailableDigitally { get; set; }
        public int? GenreId { get; set; }
        public Genre? Genre { get; set; } = null!;
    }
}
