using OnePieceReact.Server.Models; // Importing the Pirate model
using OnePieceReact.Services; // Importing the PiratesService for business logic
using Microsoft.AspNetCore.Mvc;
using OnePieceReact.Server.DTOs;
using MongoDB.Driver; // Importing MVC components for API controller

namespace OnePieceReact.Controllers
{
    // Controller for managing pirate-related API endpoints
    [ApiController]
    [Route("[controller]")] // Base route for all pirate-related endpoints
    public class PiratesController : ControllerBase
    {
        // Private field for accessing the PiratesService
        private readonly PiratesService _piratesService;

        // Constructor to initialize the controller with the PiratesService
        public PiratesController(PiratesService piratesService) =>
            _piratesService = piratesService;

        // GET: /pirates - Retrieves a list of all pirates
        [HttpGet]
        public async Task<List<Pirate>> Get() =>
            await _piratesService.GetAsync();

        // GET: /pirates/{id} - Retrieves a specific pirate by id
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Pirate>> Get(string id)
        {
            // Fetch the pirate from the service
            var pirate = await _piratesService.GetAsync(id);

            // If no pirate is found, return a 404 Not Found response
            if (pirate is null)
            {
                return NotFound();
            }

            // Return the found pirate with a 200 OK response
            return Ok(pirate);
        }

        // POST: /pirates/serach - Retrieves pirates based on search data
        [HttpPost("search")]
        public async Task<ActionResult<List<Pirate>>> GetFiltered([FromBody] SearchDataDTO searchDataDTO)
        {
            // Create a filter definition builder
            var filterBuilder = Builders<Pirate>.Filter;
            var filters = new List<FilterDefinition<Pirate>>();

            // Add filters based on the provided search criteria

            // Name
            if (!string.IsNullOrWhiteSpace(searchDataDTO.Name))
            {
                filters.Add(filterBuilder.Regex(x => x.name, new MongoDB.Bson.BsonRegularExpression(searchDataDTO.Name, "i"))); // Case-insensitive search
            }

            // Min. bounty
            if (searchDataDTO.Min_Bounty.HasValue)
            {
                filters.Add(filterBuilder.Gte(x => x.bounty, searchDataDTO.Min_Bounty.Value));
            }

            // Max. bounty
            if (searchDataDTO.Max_Bounty.HasValue)
            {
                filters.Add(filterBuilder.Lte(x => x.bounty, searchDataDTO.Max_Bounty.Value));
            }

            // Status
            if (!string.IsNullOrWhiteSpace(searchDataDTO.Status))
            {
                filters.Add(filterBuilder.Eq(x => x.status, searchDataDTO.Status));
            }

            // Crew
            if (!string.IsNullOrWhiteSpace(searchDataDTO.Crew))
            {
                filters.Add(filterBuilder.Regex(x => x.crew, new MongoDB.Bson.BsonRegularExpression(searchDataDTO.Crew, "i"))); // Case-insensitive search
            }

            // Combine all filters into a single filter
            var finalFilter = filterBuilder.And(filters);

            // Query the database for pirates that match the filters
            var pirates = await _piratesService.GetAsyncFiltered(finalFilter);

            // If no pirates are found, return a 404 Not Found response
            if (pirates == null || !pirates.Any())
            {
                return NotFound();
            }

            // Return the found pirates with a 200 OK response
            return Ok(pirates);
        }


        // POST: /pirates - Creates a new pirate
        [HttpPost]
        public async Task<IActionResult> Post(Pirate newPirate)
        {
            // Add the new pirate using the service
            await _piratesService.CreateAsync(newPirate);

            // Return a 201 Created response with a link to the new resource
            return CreatedAtAction(nameof(Get), new { id = newPirate.Id }, newPirate);
        }

        // PUT: /pirates/{id} - Updates an existing pirate by id
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Pirate updatedPirate)
        {
            // Fetch the existing pirate to verify it exists
            var pirate = await _piratesService.GetAsync(id);

            // If no pirate is found, return a 404 Not Found response
            if (pirate is null)
            {
                return NotFound();
            }

            // Set the id of the updated pirate to match the existing pirate
            updatedPirate.Id = pirate.Id;

            // Update the pirate using the service
            await _piratesService.UpdateAsync(id, updatedPirate);

            // Return the updated pirate with a 200 OK response
            return Ok(updatedPirate);
        }

        // DELETE: /pirates/{id} - Deletes a pirate by id
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            // Fetch the existing pirate to verify it exists
            var pirate = await _piratesService.GetAsync(id);

            // If no pirate is found, return a 404 Not Found response
            if (pirate is null)
            {
                return NotFound();
            }

            // Remove the pirate using the service
            await _piratesService.RemoveAsync(id);

            // Return a 204 No Content response indicating successful deletion
            return NoContent();
        }
    }
}
