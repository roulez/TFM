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
    public class CampaignController : ControllerBase
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

        [Route("CreateCampaign")]
        [HttpPost]
        public string CreateCampaign(string campaignName, int userId)
        {
            var result = _campaignDataAccess.CreateCampaign(campaignName, userId);
            return JsonConvert.SerializeObject(result);
        }

        [Route("AddUserToCampaign")]
        [HttpPost]
        public string AddUserToCampaign(int campaignId, int userId, int userRole)
        {
            var result = _campaignDataAccess.AddUserToCampaign(campaignId, userId, userRole);
            return JsonConvert.SerializeObject(result);
        }

        [Route("GetUserCampaigns")]
        [HttpGet]
        public string GetUserCampaigns(int userId)
        {
            var result = _campaignDataAccess.GetUserCampaigns(userId);
            return JsonConvert.SerializeObject(result);
        }

        [Route("UpdateCampaign")]
        [HttpPut]
        public string UpdateCampaign(int campaignId, string campaignName)
        {
            _campaignDataAccess.UpdateCampaign(campaignId, campaignName);
            return JsonConvert.SerializeObject("true");
        }

        [Route("DeleteUsersCampaign")]
        [HttpDelete]
        public string DeleteUsersCampaign(int campaignId)
        {
            _campaignDataAccess.DeleteCampaignUsers(campaignId);
            return JsonConvert.SerializeObject("true");
        }

        [Route("DeleteCampaign")]
        [HttpDelete]
        public string DeleteCampaign(int campaignId)
        {
            _campaignDataAccess.DeleteCampaignUsers(campaignId);
            _campaignDataAccess.DeleteCampaign(campaignId);
            return JsonConvert.SerializeObject("true");
        }
    }
}
