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

            var loginQuery = _connection.Query<User>($@"
                            SELECT
                            Id,
                            UserEmail,
                            UserPassword
                            FROM Users
                            WHERE UserEmail='{userEmail}';").FirstOrDefault();

            if (loginQuery == null)
                loginResult.IsEmailCorrect = false;
            else
            {
                loginResult.Id = loginQuery.Id;
                loginResult.IsPasswordCorrect = userPassword == loginQuery.UserPassword;
            }

            return loginResult;
        }

        public bool RegisterUser(string userEmail, string userPassword, string userName, string userSurname)
        {
            var userEmailExistsQuery = _connection.Query<User>($@"
                            SELECT
                            UserEmail
                            FROM Users
                            WHERE UserEmail='{userEmail}';").FirstOrDefault();

            if (userEmailExistsQuery != null)
                return false;
            else
            {
                _connection.Query($@"INSERT INTO Users (UserEmail, UserPassword, UserName, UserSurname)
                    Values ('{userEmail}', '{userPassword}', '{userName}', '{userSurname}');");
                return true;
            }
        }

        public List<User> GetUsers()
        {
            var usersQuery = _connection.Query<User>($@"
                            SELECT
                            Id,
                            UserEmail,
                            UserName,
                            UserSurname
                            FROM Users;").ToList();

            return usersQuery;
        }

        public List<User> GetUsersFromCampaign(int campaignId)
        {
            var usersQuery = _connection.Query<User>($@"
                            SELECT
                            U.Id,
                            U.UserEmail,
                            U.UserName,
                            U.UserSurname
                            FROM Users U
                            INNER JOIN CampaignsUsers CU ON CU.UserId=U.Id
                            WHERE CU.CampaignId='{campaignId}';").ToList();

            return usersQuery;
        }
    }
}
