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
            var campaignMessagesQuery = _connection.Query<CampaignMessage>($@"
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
                            WHERE CM.CampaignId='{campaignId}';").ToList();

            return campaignMessagesQuery;
        }

        public void CreateCampaignMessage(int campaignId, int userId, string messageText, bool isPrivate)
        {
            _connection.Query($@"
                            INSERT INTO CampaignMessages (CampaignId, UserId, MessageText, IsPrivate, CreationDate)
                            Values ('{campaignId}', '{userId}', '{messageText}', '{isPrivate}', CURRENT_TIMESTAMP);");
        }
    }
}
