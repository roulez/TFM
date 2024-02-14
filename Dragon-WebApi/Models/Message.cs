namespace Dragon_WebApi.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string MessageTitle { get; set; }
        public string MessageText { get; set; }
        public int SendingUserId { get; set; }
        public string SendingUserName { get; set; }
        public string SendingUserSurname { get; set; }
        public string SendingUserEmail { get; set; }
        public int ReceivingUserId { get; set; }
        public string ReceivingUserName { get; set; }
        public string ReceivingUserSurname { get; set; }
        public string ReceivingUserEmail { get; set; }
        public DateTime CreationDate { get; set; }

        public Message()
        {
            Id = 0;
            MessageTitle = "";
            MessageText = "";
            SendingUserId = 0;
            SendingUserName = "";
            SendingUserSurname = "";
            SendingUserEmail = "";
            ReceivingUserId = 0;
            ReceivingUserName = "";
            ReceivingUserSurname = "";
            ReceivingUserEmail = "";
            CreationDate = new DateTime();
        }
    }
}
