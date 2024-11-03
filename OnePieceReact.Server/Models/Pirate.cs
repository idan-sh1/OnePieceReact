using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace OnePieceReact.Server.Models
{
    public class Pirate
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("name")]
        [JsonPropertyName("name")]

        public string name { get; set; } = null!;

        public int? bounty { get; set; } = null!;

        public string crew { get; set; } = null!;

        public string status { get; set; } = null!;
    }
}
