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
                            UserEmail,
                            UserPassword
                            FROM Users
                            WHERE UserEmail='{userEmail}';").FirstOrDefault();

            if (loginQuery == null)
                loginResult.IsEmailCorrect = false;
            else
                loginResult.IsPasswordCorrect = userPassword == loginQuery.UserPassword;

            return loginResult;
        }
    }
}
