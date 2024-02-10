using Dragon_WebApi.DataAccess;
using Dragon_WebApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Dragon_WebApi.Controllers
{
    [ApiController]
    [EnableCors("AllowedOrigins")]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<User> _logger;
        private readonly UserDataAccess _userDataAccess;

        public UserController(ILogger<User> logger, IConfiguration config)
        {
            _logger = logger;
            _userDataAccess = new UserDataAccess(config);
        }

        [Route("IsValidLogin")]
        [HttpPost]
        public string IsValidLogin(string userEmail, string userPassword)
        {
            var result = _userDataAccess.IsValidLogin(userEmail, userPassword);
            return JsonConvert.SerializeObject(result);
        }
    }
}
