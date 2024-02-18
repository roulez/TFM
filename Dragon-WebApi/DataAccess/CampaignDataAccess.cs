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

        public Campaign GetCampaignData(int campaignId)
        {
            var campaignDataQuery = _connection.Query<Campaign>($@"
                            SELECT 
                            Id,
                            CampaignName,
                            CampaignImage
                            FROM Campaigns
                            WHERE Id='{campaignId}';").FirstOrDefault();

            return campaignDataQuery;
        }

        public int CreateCampaign(string campaignName, int userId)
        {
            var createCampaignId = _connection.QuerySingle<int>($@"
                            INSERT INTO Campaigns (CampaignName, CampaignImage, UserId, CreationDate)
                            OUTPUT INSERTED.Id 
                            Values ('{campaignName}', '../../../assets/images/login-screen.jpg', '{userId}', CURRENT_TIMESTAMP);");

            return createCampaignId;
        }

        public int AddUserToCampaign(int campaignId, int userId, int userRole)
        {
            var createCampaignUserId = _connection.QuerySingle<int>($@"
                        INSERT INTO CampaignsUsers (UserId, CampaignId, UserRole)
                        OUTPUT INSERTED.Id 
                        Values ('{userId}', '{campaignId}', '{userRole}');");
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

        public bool IsUserPartOfTheCampaign(int campaignId, int userId)
        {
            var isUserFromCampaignQuery = _connection.Query<Campaign>($@"
                            SELECT 
                            Id
                            FROM CampaignsUsers
                            WHERE UserId='{userId}' AND CampaignId='{campaignId}';").FirstOrDefault();

            return isUserFromCampaignQuery != null;
        }

        public void UpdateCampaign(int campaignId, string campaignName)
        {
            _connection.Query($@"
                            UPDATE Campaigns
                            SET CampaignName='{campaignName}'
                            WHERE ID='{campaignId}';");
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
