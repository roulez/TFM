namespace Dragon_WebApi.Models
{
    public class Campaign
    {
        public int Id { get; set; }
        public string CampaignName { get; set; }
        public string CampaignImage { get; set; }
        public DateTime CreationDate { get; set; }

        public Campaign()
        {
            Id = 0;
            CampaignName = "";
            CampaignImage = "";
            CreationDate = DateTime.Now;
        }
    }
}
