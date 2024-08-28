describe("PokeAPI Backend Tests", () => {
  // Test 1: Send a GET request to Pikachu and verify the response
  it("should return a successful response for Pikachu", () => {
    cy.request("https://pokeapi.co/api/v2/pokemon/pikachu").then((response) => {
      // Test 2: Assert the response status
      expect(response.status).to.eq(200);

      // Test 3: Assert that the response is for a pokemon named ‘pikachu’
      expect(response.body.name).to.eq("pikachu");

      // Find the 'lightning-rod' ability in the abilities array
      const lightningRodAbility = response.body.abilities.find(
        (ability) => ability.ability.name === "lightning-rod"
      );

      // Assert that the 'lightning-rod' ability exists and is complete
      expect(lightningRodAbility).to.not.be.undefined;
      expect(lightningRodAbility.ability.name).to.eq("lightning-rod");
      expect(lightningRodAbility.ability).to.have.property("url");
      expect(lightningRodAbility.is_hidden).to.be.true;
      expect(lightningRodAbility.slot).to.eq(3);
    });
  });

  // Test 4: Intercept the GET request for Charmander and modify the response to return 404
  it("should modify the response for Charmander to return 404", () => {
    // Intercept the GET request to the 'charmander' endpoint
    cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon/charmander", {
      statusCode: 404, // Set the response status code to 404
      body: {
        message: "Not Found", // Custom response body
      },
    }).as("getCharmander");

    // Make the actual request
    cy.request({
      method: "GET",
      url: "https://pokeapi.co/api/v2/pokemon/charmander",
      failOnStatusCode: false, // Prevent Cypress from failing the test automatically on 404
    }).as("charmanderRequest");

    // Verify that the request returned a 404 status code
    cy.get("@charmanderRequest").then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.message).to.eq("Not Found");
    });
  });
});
