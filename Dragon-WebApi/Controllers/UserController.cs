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

        [Route("RegisterUser")]
        [HttpPost]
        public string RegisterUser(string userEmail, string userPassword, string userName, string userSurname)
        {
            var result = _userDataAccess.RegisterUser(userEmail, userPassword, userName, userSurname);
            return JsonConvert.SerializeObject(result);
        }

        [Route("GetUsers")]
        [HttpGet]
        public string GetUsers()
        {
            var result = _userDataAccess.GetUsers();
            return JsonConvert.SerializeObject(result);
        }

        [Route("GetUsersFromCampaign")]
        [HttpGet]
        public string GetUsersFromCampaign(int campaignId)
        {
            var result = _userDataAccess.GetUsersFromCampaign(campaignId);
            return JsonConvert.SerializeObject(result);
        }

        [Route("GetUserCampaignData")]
        [HttpGet]
        public string GetUserCampaignData(int campaignId, int userId)
        {
            var result = _userDataAccess.GetUserCampaignData(campaignId, userId);
            return JsonConvert.SerializeObject(result);
        }
    }
}
