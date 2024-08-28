describe("api tests", () => {
    it("response code should be 200", () => {
        cy.request("https://pokeapi.co/api/v2/pokemon/pikachu").then((response) => {
            const status = response.status;

            assert.equal(200, status);
            assert.equal(response.body.name, "pikachu", "Pokemon name is Pikachu");
     
            const lightningRodAbility = response.body.abilities.find(
                (ability) => ability.ability.name === "lightning-rod"
            );
            assert.isNotNull(
                lightningRodAbility,
                "The ability 'lightning-rod' should be present"
            );
            assert.equal(
                lightningRodAbility.ability.name,
                "lightning-rod",
                "The ability name should be 'lightning-rod'"
            );
            assert.property(
                lightningRodAbility.ability,
                "url",
                "The ability should have a 'url' property"
            );
            assert.isTrue(
                lightningRodAbility.is_hidden,
                "'is_hidden' should be true for 'lightning-rod'"
            );
            assert.equal(
                lightningRodAbility.slot,
                3,
                "The 'slot' for 'lightning-rod' should be 3"
            );
        });

        describe('API Response Modification', () => {
            it('should modify the response to return 404 for Charmander', () => {
                // Intercept the GET request to the 'charmander' endpoint
                cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/charmander', (req) => {
                    // Modify the response to return status 404
                    req.reply({
                        statusCode: 404, // Set the status code to 404
                        body: {
                            message: "Not Found", // Custom response body (optional)
                        },
                    });
                }).as('getCharmander'); // Alias the interception for later reference

                // Make the actual request to trigger the interception
                cy.request({
                    method: 'GET',
                    url: 'https://pokeapi.co/api/v2/pokemon/charmander',
                    failOnStatusCode: false  // Prevent Cypress from failing the test automatically on 404
                }).as('charmanderRequest');

                // Verify that the response status is 404 and the body contains the expected message
                cy.get('@charmanderRequest').then((response) => {
                    expect(response.status).to.eq(404); // Assert that the status code is 404
                    expect(response.body.message).to.eq("Not Found"); // Assert that the response body contains the correct message
                });
            });
        });

    })
});
