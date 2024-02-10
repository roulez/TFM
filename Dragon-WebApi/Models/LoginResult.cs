namespace Dragon_WebApi.Models
{
    public class LoginResult
    {
        public bool IsEmailCorrect { get; set; }
        public bool IsPasswordCorrect { get; set; }

        public LoginResult() 
        {
            IsEmailCorrect = true;
            IsPasswordCorrect = true;
        }
    }
}
