using Library.Data;
using Microsoft.AspNetCore.Mvc;

namespace Library.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class GenreController : ControllerBase
    {
        private readonly LibraryContext _context;

        public GenreController(LibraryContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Genres);
        }
    }
}
