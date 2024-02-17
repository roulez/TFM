﻿using Dapper;
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
            var publicationsQuery = _connection.Query<Publication>($@"
                            SELECT
                            P.Id,
                            P.PublicationTitle,
                            P.PublicationText,
                            P.PublicationImage,
                            U.UserName,
                            P.CreationDate AS PublicationDate
                            FROM Publications P
                            INNER JOIN Users U ON P.UserId=U.Id
                            ORDER BY P.CreationDate DESC;").ToList();

            return publicationsQuery;
        }

        public Publication GetPublicationData(int publicationId)
        {
            var publicationQuery = _connection.Query<Publication>($@"
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
                            WHERE P.Id ='{publicationId}';").FirstOrDefault();

            return publicationQuery;
        }

        public void CreatePublication(string publicationTitle, string publicationMessage, int userId)
        {
            _connection.Query($@"
                            INSERT INTO Publications (PublicationTitle, PublicationText, PublicationImage, UserId, CreationDate)
                            Values ('{publicationTitle}', '{publicationMessage}', '../../../assets/images/login-screen.jpg', '{userId}', CURRENT_TIMESTAMP);");
        }
    }
}
