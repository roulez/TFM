namespace Dragon_WebApi.Models
{
    public class User
    {
        public string UserEmail { get; set; }
        public string UserPassword { get; set; }
        public string UserName { get; set; }
        public string UserSurname { get; set; }

        public User()
        {
            UserEmail = "";
            UserPassword = "";
            UserName = "";
            UserSurname = "";
        }
    }
}
