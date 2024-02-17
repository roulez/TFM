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
    public class PublicationController : ControllerBase
    {
        private readonly ILogger<Publication> _logger;
        private readonly PublicationDataAccess _publicationDataAccess;

        public PublicationController(ILogger<Publication> logger, IConfiguration config)
        {
            _logger = logger;
            _publicationDataAccess = new PublicationDataAccess(config);
        }

        [Route("GetPublications")]
        [HttpGet]
        public string GetPublications()
        {
            var result = _publicationDataAccess.GetPublications();
            return JsonConvert.SerializeObject(result);
        }

        [Route("GetPublicationData")]
        [HttpGet]
        public string GetPublicationData(int publicationId)
        {
            var result = _publicationDataAccess.GetPublicationData(publicationId);
            return JsonConvert.SerializeObject(result);
        }

        [Route("CreatePublication")]
        [HttpPost]
        public string CreatePublication(string publicationTitle, string publicationMessage, int userId)
        {
            _publicationDataAccess.CreatePublication(publicationTitle, publicationMessage, userId);
            return JsonConvert.SerializeObject("true");
        }
    }
}
