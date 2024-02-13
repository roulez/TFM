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
    public class CampaignController
    {
        private readonly ILogger<Campaign> _logger;
        private readonly CampaignDataAccess _campaignDataAccess;

        public CampaignController(ILogger<Campaign> logger, IConfiguration config)
        {
            _logger = logger;
            _campaignDataAccess = new CampaignDataAccess(config);
        }

        [Route("GetCampaignData")]
        [HttpGet]
        public string GetCampaignData(int campaignId)
        {
            var result = _campaignDataAccess.GetCampaignData(campaignId);
            return JsonConvert.SerializeObject(result);
        }

        [Route("GetUserCampaigns")]
        [HttpGet]
        public string GetUserCampaigns(int userId)
        {
            var result = _campaignDataAccess.GetUserCampaigns(userId);
            return JsonConvert.SerializeObject(result);
        }
    }
}
