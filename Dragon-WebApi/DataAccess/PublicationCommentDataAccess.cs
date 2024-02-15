using Dapper;
using Dragon_WebApi.Models;
using Microsoft.Data.SqlClient;

namespace Dragon_WebApi.DataAccess
{
    public class PublicationCommentDataAccess
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;
        private SqlConnection _connection;

        public PublicationCommentDataAccess(IConfiguration config)
        {
            _config = config;
            _connectionString = _config.GetConnectionString("DefaultConnection");
            _connection = new SqlConnection(_connectionString);
        }

        public List<PublicationComment> GetPublicationComments(int publicationId)
        {
            var publicationCommentsQuery = _connection.Query<PublicationComment>($@"
                            SELECT
                            PC.Id,
                            PC.CommentText,
                            U.UserName,
                            U.UserEmail,
                            PC.CreationDate
                            FROM PublicationComment PC
                            INNER JOIN Users U ON U.Id=PC.UserId
                            WHERE PC.PublicationId='{publicationId}'
                            ORDER BY PC.CreationDate DESC;").ToList();

            return publicationCommentsQuery;
        }

        public void CreatePublicationComment(string commentText, int publicationId, int userId)
        {
            _connection.Query<PublicationComment>($@"
                             INSERT INTO PublicationComment (PublicationId, CommentText, UserId, CreationDate)
                            Values ('{publicationId}', '{commentText}', '{userId}', CURRENT_TIMESTAMP);");
        }
    }
}
