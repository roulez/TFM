namespace Dragon_WebApi.Models
{
    public class LoginResult
    {
        public int Id { get; set; }
        public bool IsEmailCorrect { get; set; }
        public bool IsPasswordCorrect { get; set; }

        public LoginResult() 
        {
            Id = 0;
            IsEmailCorrect = true;
            IsPasswordCorrect = true;
        }
    }
}
