using OnePieceReact.Server.Models; // Importing the Pirate model
using Microsoft.Extensions.Options; // For accessing application settings
using MongoDB.Driver; // MongoDB driver for interacting with the database

namespace OnePieceReact.Services
{
    // Service class for managing operations related to pirate objects
    public class PiratesService
    {
        // Private field for the MongoDB collection of pirates
        private readonly IMongoCollection<Pirate> _piratesCollection;

        // Constructor to initialize the PiratesService with database settings
        public PiratesService(
            IOptions<OnePieceDatabaseSettings> onePieceDatabaseSettings)
        {
            // Create a new MongoDB client using the connection string from settings
            var mongoClient = new MongoClient(
                onePieceDatabaseSettings.Value.ConnectionString);

            // Get the specified database from the MongoDB client
            var mongoDatabase = mongoClient.GetDatabase(
                onePieceDatabaseSettings.Value.DatabaseName);

            // Get the pirates collection from the database
            _piratesCollection = mongoDatabase.GetCollection<Pirate>(
                onePieceDatabaseSettings.Value.PiratesCollectionName);
        }

        // Asynchronously retrieves all pirates from the collection
        public async Task<List<Pirate>> GetAsync() =>
            await _piratesCollection.Find(_ => true).ToListAsync();

        // Asynchronously retrieves pirates that match the search filters
        public async Task<List<Pirate>> GetAsyncFiltered(FilterDefinition<Pirate> filter) =>
            await _piratesCollection.Find(filter).ToListAsync();

        // Asynchronously retrieves a pirate by its unique identifier (id)
        public async Task<Pirate?> GetAsync(string id) =>
            await _piratesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        // Asynchronously adds a new pirate to the collection
        public async Task CreateAsync(Pirate newPirate) =>
            await _piratesCollection.InsertOneAsync(newPirate);

        // Asynchronously updates an existing pirate's information by its id
        public async Task UpdateAsync(string id, Pirate updatedPirate) =>
            await _piratesCollection.ReplaceOneAsync(x => x.Id == id, updatedPirate);

        // Asynchronously removes a pirate from the collection by its id
        public async Task RemoveAsync(string id) =>
            await _piratesCollection.DeleteOneAsync(x => x.Id == id);
    }
}
