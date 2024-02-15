namespace Dragon_WebApi.Models
{
    public class PublicationComment
    {
        public int Id { get; set; }
        public string CommentText { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public DateTime CreationDate { get; set; }

        public PublicationComment()
        {
            CommentText = "";
            UserName = "";
            UserEmail = "";
            CreationDate = DateTime.Now;
        }
    }
}
