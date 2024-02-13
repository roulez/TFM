using Dapper;
using Dragon_WebApi.Models;
using Microsoft.Data.SqlClient;

namespace Dragon_WebApi.DataAccess
{
    public class CampaignDataAccess
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;
        private SqlConnection _connection;

        public CampaignDataAccess(IConfiguration config)
        {
            _config = config;
            _connectionString = _config.GetConnectionString("DefaultConnection");
            _connection = new SqlConnection(_connectionString);
        }

        public List<Campaign> GetCampaignData(int campaignId)
        {
            var userCampaignsQuery = _connection.Query<Campaign>($@"
                            SELECT 
                            Id,
                            CampaignName,
                            CampaignImage
                            FROM Campaigns
                            WHERE Id='{campaignId}';").ToList();

            return userCampaignsQuery;
        }

        public int CreateCampaign(string campaignName, int userId)
        {
            var createCampaignId = _connection.QuerySingle<int>($@"
                            INSERT INTO Campaigns (CampaignName, CampaignImage, UserId, CreationDate)
                            OUTPUT INSERTED.Id 
                            Values ('{campaignName}', '../../../assets/images/login-screen.jpg', '{userId}', CURRENT_TIMESTAMP);");

            return createCampaignId;
        }

        public int AddUserToCampaign(int campaignId, int userId)
        {
            var createCampaignUserId = _connection.QuerySingle<int>($@"
                        INSERT INTO CampaignsUsers (UserId, CampaignId)
                        OUTPUT INSERTED.Id 
                        Values ('{userId}', '{campaignId}');");
            return createCampaignUserId;
        }

        public List<Campaign> GetUserCampaigns(int userId)
        {
            var userCampaignsQuery = _connection.Query<Campaign>($@"
                            SELECT 
                            C.Id,
                            C.CampaignName,
                            C.CampaignImage
                            FROM Campaigns C
                            WHERE EXISTS (SELECT * FROM CampaignsUsers CU WHERE CU.CampaignId=C.Id AND CU.UserId='{userId}')").ToList();

            return userCampaignsQuery;
        }

        public void DeleteCampaignUsers(int campaignId)
        {
            _connection.Query($@"DELETE FROM CampaignsUsers WHERE CampaignId='{campaignId}';");
        }

        public void DeleteCampaign(int campaignId)
        {
            _connection.Query($@"DELETE FROM Campaigns WHERE ID='{campaignId}';");
        }
    }
}
