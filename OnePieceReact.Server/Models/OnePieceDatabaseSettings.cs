namespace OnePieceReact.Server.Models
{
    public class OnePieceDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string PiratesCollectionName { get; set; } = null!;
    }
}
