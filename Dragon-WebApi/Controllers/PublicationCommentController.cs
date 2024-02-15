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
    public class PublicationCommentController : ControllerBase
    {
        private readonly ILogger<PublicationComment> _logger;
        private readonly PublicationCommentDataAccess _publicationCommentDataAccess;

        public PublicationCommentController(ILogger<PublicationComment> logger, IConfiguration config)
        {
            _logger = logger;
            _publicationCommentDataAccess = new PublicationCommentDataAccess(config);
        }

        [Route("GetPublicationComments")]
        [HttpGet]
        public string GetPublicationComments(int publicationId)
        {
            var result = _publicationCommentDataAccess.GetPublicationComments(publicationId);
            return JsonConvert.SerializeObject(result);
        }
    }
}
