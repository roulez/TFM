using Dapper;
using Dragon_WebApi.Models;
using Microsoft.Data.SqlClient;

namespace Dragon_WebApi.DataAccess
{
    public class PublicationDataAccess
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;
        private SqlConnection _connection;

        public PublicationDataAccess(IConfiguration config)
        {
            _config = config;
            _connectionString = _config.GetConnectionString("DefaultConnection");
            _connection = new SqlConnection(_connectionString);
        }

        public List<Publication> GetPublications()
        {
            var publicationsQuery = $@"
                            SELECT
                            P.Id,
                            P.PublicationTitle,
                            P.PublicationText,
                            P.PublicationImage,
                            U.UserName,
                            P.CreationDate AS PublicationDate
                            FROM Publications P
                            INNER JOIN Users U ON P.UserId=U.Id
                            ORDER BY P.CreationDate DESC;";

            var publications = _connection.Query<Publication>(publicationsQuery).ToList();

            return publications;
        }

        public Publication GetPublicationData(int publicationId)
        {
            var sqlParameters = new { PublicationId = publicationId };

            var publicationDataQuery = $@"
                            SELECT
                            P.Id,
                            P.PublicationTitle,
                            P.PublicationText,
                            P.PublicationImage,
                            U.UserName,
                            U.UserEmail,
                            P.CreationDate AS PublicationDate
                            FROM Publications P
                            INNER JOIN Users U ON P.UserId=U.Id
                            WHERE P.Id=@PublicationId;";

            var publicationData = _connection.Query<Publication>(publicationDataQuery, sqlParameters).FirstOrDefault();

            return publicationData;
        }

        public void CreatePublication(string publicationTitle, string publicationMessage, int userId)
        {
            var sqlParameters = new { PublicationTitle = publicationTitle, PublicationText = publicationMessage, PublicationImage = "../../../assets/images/login-screen.jpg", UserId = userId, CreationDate = DateTime.Now.ToString() };
            var createPublicationQuery = $@"
                            INSERT INTO Publications (PublicationTitle, PublicationText, PublicationImage, UserId, CreationDate)
                            Values (@PublicationTitle, @PublicationText, @PublicationImage, @UserId, @CreationDate);";

            _connection.Query(createPublicationQuery, sqlParameters);
        }
    }
}
