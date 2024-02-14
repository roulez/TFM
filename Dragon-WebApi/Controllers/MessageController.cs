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
    public class MessageController : ControllerBase
    {
        private readonly ILogger<Message> _logger;
        private readonly MessageDataAccess _messageDataAccess;

        public MessageController(ILogger<Message> logger, IConfiguration config)
        {
            _logger = logger;
            _messageDataAccess = new MessageDataAccess(config);
        }

        [Route("GetUserMessages")]
        [HttpGet]
        public string GetUserMessages(int userId)
        {
            var result = _messageDataAccess.GetUserMessages(userId);
            return JsonConvert.SerializeObject(result);
        }
    }
}
