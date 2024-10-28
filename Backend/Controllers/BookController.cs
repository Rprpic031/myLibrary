using Library.Data;
using Library.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Library.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly LibraryContext _context;

        public BookController(LibraryContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Books.Include(book => book.Genre));
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetByid(int id)
        {
            return Ok(_context.Books.Include(book => book.Genre).FirstOrDefault(book => book.Id == id));
        }

        [HttpPost]
        public IActionResult Post(Book book)
        {
            _context.Books.Add(book);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, book);
        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, Book book)
        {
            var dbBook = _context.Books.Find(id);
            if (dbBook == null)
            {
                return NotFound();
            }

            dbBook.Name = book.Name;
            dbBook.AvailableFrom = book.AvailableFrom;
            dbBook.Price = book.Price;
            dbBook.PublishYear = book.PublishYear;
            dbBook.IsAvailableDigitally = book.IsAvailableDigitally;
            dbBook.GenreId = book.GenreId;

            _context.Books.Update(dbBook);
            _context.SaveChanges();

            return Ok(new { message = "Edited successfully" });
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            var dbBook = _context.Books.Find(id);
            if (dbBook == null)
            {
                return NotFound();
            }
            _context.Books.Remove(dbBook);
            _context.SaveChanges();

            return Ok(new { message = "Deleted successfully" });
        }
    }
}
