using Dapper;
using Dragon_WebApi.Models;
using Microsoft.Data.SqlClient;

namespace Dragon_WebApi.DataAccess
{
    public class MessageDataAccess
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;
        private SqlConnection _connection;

        public MessageDataAccess(IConfiguration config)
        {
            _config = config;
            _connectionString = _config.GetConnectionString("DefaultConnection");
            _connection = new SqlConnection(_connectionString);
        }

        public List<Message> GetUserMessages(int userId)
        {
            var userMessagesQuery = _connection.Query<Message>($@"
                            SELECT
                            M.Id AS Id,
                            M.MessageTitle AS MessageTitle,
                            M.MessageText AS MessageText,
                            SU.Id AS SendingUserId,
                            SU.UserName AS SendingUserName,
                            SU.UserSurname AS SendingUserSurname,
                            SU.UserEmail AS SendingUserEmail,
                            RU.Id AS ReceivingUserId,
                            RU.UserName AS ReceivingUserName,
                            RU.UserSurname AS ReceivingUserSurname,
                            RU.UserEmail AS ReceivingUserEmail,
                            M.CreationDate AS CreationDate
                            FROM Messages M
                            INNER JOIN Users SU ON SU.Id=M.SendingUserId
                            INNER JOIN Users RU ON RU.Id=M.ReceivingUserId
                            WHERE M.ReceivingUserId='{userId}' OR M.SendingUserId='{userId}';").ToList();

            return userMessagesQuery;
        }

        public void CreateUserMessage(string messageTitle, string messageText, int sendingUserId, int receivingUserId)
        {
            _connection.Query($@"
                            INSERT INTO Messages (MessageTitle, MessageText, SendingUserId, ReceivingUserId, CreationDate)
                            Values ('{messageTitle}', '{messageText}', '{sendingUserId}', {receivingUserId}, CURRENT_TIMESTAMP);");
        }
    }
}
