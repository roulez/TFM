using Dapper;
using Dragon_WebApi.Models;
using Microsoft.Data.SqlClient;

namespace Dragon_WebApi.DataAccess
{
    public class UserDataAccess
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;
        private SqlConnection _connection;

        public UserDataAccess(IConfiguration config)
        {
            _config = config;
            _connectionString = _config.GetConnectionString("DefaultConnection");
            _connection = new SqlConnection(_connectionString);
        }

        public LoginResult IsValidLogin(string userEmail, string userPassword)
        {
            var loginResult = new LoginResult();
            var sqlParameters = new { UserEmail = userEmail };

            var loginQuery = $@"
                            SELECT
                            Id,
                            UserEmail,
                            UserPassword
                            FROM Users
                            WHERE UserEmail=@UserEmail;";

            var userResult = _connection.Query<User>(loginQuery, sqlParameters).FirstOrDefault();

            if (userResult == null)
                loginResult.IsEmailCorrect = false;
            else
            {
                loginResult.Id = userResult.Id;
                loginResult.IsPasswordCorrect = userPassword == userResult.UserPassword;
            }

            return loginResult;
        }

        public bool RegisterUser(string userEmail, string userPassword, string userName, string userSurname)
        {
            var sqlParameters = new { UserEmail = userEmail };
            var userEmailExistsQuery = $@"
                            SELECT
                            UserEmail
                            FROM Users
                            WHERE UserEmail=@UserEmail;";

            var userQueryResult = _connection.Query<User>(userEmailExistsQuery, sqlParameters).FirstOrDefault();

            if (userQueryResult != null)
                return false;
            else
            {
                var sqlCreateParameters = new { UserEmail = userEmail, UserPassword = userPassword, UserName = userName, UserSurname = userSurname };
                var registerUserQuery = $@"INSERT INTO Users (UserEmail, UserPassword, UserName, UserSurname)
                    Values (@UserEmail, @UserPassword, @UserName, @UserSurname);";

                _connection.Query(registerUserQuery, sqlCreateParameters);
                return true;
            }
        }

        public List<User> GetUsers()
        {
            var usersQuery = $@"
                            SELECT
                            Id,
                            UserEmail,
                            UserName,
                            UserSurname
                            FROM Users;";

            var userList = _connection.Query<User>(usersQuery).ToList();

            return userList;
        }

        public List<User> GetUsersFromCampaign(int campaignId)
        {
            var sqlParameters = new { CampaignId = campaignId };

            var usersFromCampaignQuery = $@"
                            SELECT
                            U.Id,
                            U.UserEmail,
                            U.UserName,
                            U.UserSurname,
                            CU.UserRole AS CampaignRole
                            FROM Users U
                            INNER JOIN CampaignsUsers CU ON CU.UserId=U.Id
                            WHERE CU.CampaignId=@CampaignId;";

            var usersFromCampaign = _connection.Query<User>(usersFromCampaignQuery, sqlParameters).ToList();

            return usersFromCampaign;
        }

        public User GetUserCampaignData(int campaignId, int userId)
        {
            var sqlParameters = new { CampaignId = campaignId, UserId = userId };

            var userCampaignDataQuery = $@"
                            SELECT
                            U.Id,
                            U.UserEmail,
                            U.UserName,
                            U.UserSurname,
                            CU.UserRole AS CampaignRole
                            FROM Users U
                            INNER JOIN CampaignsUsers CU ON CU.UserId=U.Id
                            WHERE CU.CampaignId=@CampaignId AND U.ID=@UserId;";

            var userCampaignData = _connection.Query<User>(userCampaignDataQuery, sqlParameters).FirstOrDefault();

            return userCampaignData;
        }
    }
}
