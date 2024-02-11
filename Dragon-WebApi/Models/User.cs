namespace Dragon_WebApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserEmail { get; set; }
        public string UserPassword { get; set; }
        public string UserName { get; set; }
        public string UserSurname { get; set; }

        public User()
        {
            Id = 0;
            UserEmail = "";
            UserPassword = "";
            UserName = "";
            UserSurname = "";
        }
    }
}
