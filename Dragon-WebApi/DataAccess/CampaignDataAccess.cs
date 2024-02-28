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
            var sqlParameters = new { CampaignId = campaignId };
            var campaignDataQuery = $@"
                            SELECT 
                            Id,
                            CampaignName,
                            CampaignImage
                            FROM Campaigns
                            WHERE Id=@CampaignId;";

            var campaignDataResult = _connection.Query<Campaign>(campaignDataQuery, sqlParameters).FirstOrDefault();

            return campaignDataResult;
        }

        public int CreateCampaign(string campaignName, int userId)
        {
            var sqlParameters = new { CampaignName = campaignName, CampaignImage = "../../../assets/images/login-screen.jpg", UserId = userId, CreationDate = DateTime.Now.ToString()};
            var createCampaignQuery = $@"
                            INSERT INTO Campaigns (CampaignName, CampaignImage, UserId, CreationDate)
                            OUTPUT INSERTED.Id 
                            Values (@CampaignName, @CampaignImage, @UserId, @CreationDate);";

            var createdCampaignId = _connection.QuerySingle<int>(createCampaignQuery, sqlParameters);

            return createdCampaignId;
        }

        public int AddUserToCampaign(int campaignId, int userId, int userRole)
        {
            var sqlParameters = new { UserId = userId, CampaignId = campaignId, UserRole = userRole };
            var createCampaignUserQuery = $@"
                        INSERT INTO CampaignsUsers (UserId, CampaignId, UserRole)
                        OUTPUT INSERTED.Id 
                        Values (@UserId, @CampaignId, @UserRole);";

            var createdCampaignUserId = _connection.QuerySingle<int>(createCampaignUserQuery, sqlParameters);

            return createdCampaignUserId;
        }

        public List<Campaign> GetUserCampaigns(int userId)
        {
            var sqlParameters = new { UserId = userId };
            var userCampaignsQuery = $@"
                            SELECT 
                            C.Id,
                            C.CampaignName,
                            C.CampaignImage
                            FROM Campaigns C
                            WHERE EXISTS (SELECT * FROM CampaignsUsers CU WHERE CU.CampaignId=C.Id AND CU.UserId=@UserId)";

            var userCampaigns = _connection.Query<Campaign>(userCampaignsQuery, sqlParameters).ToList();

            return userCampaigns;
        }

        public bool IsUserPartOfTheCampaign(int campaignId, int userId)
        {
            var sqlParameters = new { UserId = userId, CampaignId = campaignId };
            var isUserFromCampaignQuery = $@"
                            SELECT 
                            Id
                            FROM CampaignsUsers
                            WHERE UserId=@UserId AND CampaignId=@CampaignId;";

            var userFromCampaign = _connection.Query<Campaign>(isUserFromCampaignQuery, sqlParameters).FirstOrDefault();

            return userFromCampaign != null;
        }

        public void UpdateCampaign(int campaignId, string campaignName)
        {
            var sqlParameters = new { CampaignName = campaignName, CampaignId = campaignId };
            var updateCampaignQuery = $@"
                            UPDATE Campaigns
                            SET CampaignName=@CampaignName
                            WHERE ID=@CampaignId;";

            _connection.Query(updateCampaignQuery, sqlParameters);
        }

        public void DeleteCampaignUsers(int campaignId)
        {
            var sqlParameters = new { CampaignId = campaignId };
            var deleteCampaignUsersQuery = $@"DELETE FROM CampaignsUsers WHERE CampaignId=@CampaignId;";
            _connection.Query(deleteCampaignUsersQuery, sqlParameters);
        }

        public void DeleteCampaign(int campaignId)
        {
            var sqlParameters = new { CampaignId = campaignId };
            var deleteCampaignQuery = $@"DELETE FROM Campaigns WHERE ID=@CampaignId;";
            _connection.Query(deleteCampaignQuery, sqlParameters);
        }
    }
}
