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
    public class CampaignMessageController : ControllerBase
    {
        private readonly ILogger<CampaignMessage> _logger;
        private readonly CampaignMessageDataAccess _campaignMessageDataAccess;

        public CampaignMessageController(ILogger<CampaignMessage> logger, IConfiguration config)
        {
            _logger = logger;
            _campaignMessageDataAccess = new CampaignMessageDataAccess(config);
        }

        [Route("GetCampaignMessages")]
        [HttpGet]
        public string GetCampaignMessages(int campaignId)
        {
            var result = _campaignMessageDataAccess.GetCampaignMessages(campaignId);
            return JsonConvert.SerializeObject(result);
        }

        [Route("CreateCampaignMessage")]
        [HttpPost]
        public string CreateCampaignMessage(int campaignId, int userId, string messageText, bool isPrivate)
        {
            _campaignMessageDataAccess.CreateCampaignMessage(campaignId, userId, messageText, isPrivate);
            return JsonConvert.SerializeObject("true");
        }
    }
}
