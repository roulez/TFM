using Dapper;
using Dragon_WebApi.Models;
using Microsoft.Data.SqlClient;

namespace Dragon_WebApi.DataAccess
{
    public class CampaignMessageDataAccess
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;
        private SqlConnection _connection;

        public CampaignMessageDataAccess(IConfiguration config)
        {
            _config = config;
            _connectionString = _config.GetConnectionString("DefaultConnection");
            _connection = new SqlConnection(_connectionString);
        }

        public List<CampaignMessage> GetCampaignMessages(int campaignId)
        {
            var sqlParameters = new { CampaignId = campaignId };
            var campaignMessagesQuery = $@"
                            SELECT
                            CM.Id,
                            CM.CampaignId,
                            CM.UserId,
                            U.UserName,
                            CM.MessageText,
                            CM.IsPrivate,
                            CM.CreationDate
                            FROM CampaignMessages CM
                            INNER JOIN Users U ON U.Id=CM.UserId
                            WHERE CM.CampaignId=@CampaignId;";

            var campaignMessages = _connection.Query<CampaignMessage>(campaignMessagesQuery, sqlParameters).ToList();

            return campaignMessages;
        }

        public void CreateCampaignMessage(int campaignId, int userId, string messageText, bool isPrivate)
        {
            var sqlParameters = new { CampaignId = campaignId, UserId = userId, MessageText = messageText, IsPrivate = isPrivate, CreationDate = DateTime.Now.ToString() };
            var createCampaignMessage = $@"
                            INSERT INTO CampaignMessages (CampaignId, UserId, MessageText, IsPrivate, CreationDate)
                            Values (@CampaignId, @UserId, @MessageText, @IsPrivate, @CreationDate);";

            _connection.Query(createCampaignMessage, sqlParameters);
        }
    }
}
