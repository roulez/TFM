namespace Dragon_WebApi.Models
{
    public class Publication
    {
        public int Id { get; set; }
        public string PublicationTitle { get; set; }
        public string PublicationImage { get; set; }
        public string PublicationText { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public DateTime PublicationDate { get; set; }

        public Publication()
        {
            PublicationTitle = "";
            PublicationImage = "";
            PublicationText = "";
            UserName = "";
            UserEmail = "";
            PublicationDate = DateTime.Now;
        }
    }
}
