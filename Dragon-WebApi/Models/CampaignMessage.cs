namespace Dragon_WebApi.Models
{
    public class CampaignMessage
    {
        public int Id { get; set; }
        public int CampaignId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string MessageText { get; set; }
        public bool IsPrivate { get; set; }
        public DateTime CreationDate { get; set; }

        public CampaignMessage()
        {
            Id = 0;
            CampaignId = 0;
            UserId = 0;
            UserName = "";
            MessageText = "";
            IsPrivate = false;
            CreationDate = new DateTime();
        }
    }
}
