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
            var sqlParameters = new { PublicationId = publicationId };
            var publicationCommentsQuery = $@"
                            SELECT
                            PC.Id,
                            PC.CommentText,
                            U.UserName,
                            U.UserEmail,
                            PC.CreationDate
                            FROM PublicationComment PC
                            INNER JOIN Users U ON U.Id=PC.UserId
                            WHERE PC.PublicationId=@PublicationId
                            ORDER BY PC.CreationDate DESC;";

            var publicationComments = _connection.Query<PublicationComment>(publicationCommentsQuery, sqlParameters).ToList();

            return publicationComments;
        }

        public void CreatePublicationComment(string commentText, int publicationId, int userId)
        {
            var sqlParameters = new { PublicationId = publicationId, CommentText = commentText, UserId = userId, CreationDate = DateTime.Now.ToString() };
            var createPublicationCommentQuery = $@"
                             INSERT INTO PublicationComment (PublicationId, CommentText, UserId, CreationDate)
                            Values (@PublicationId, @CommentText, @UserId, @CreationDate);";

            _connection.Query<PublicationComment>(createPublicationCommentQuery, sqlParameters);
        }
    }
}
