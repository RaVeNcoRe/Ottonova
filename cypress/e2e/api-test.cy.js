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
  });
});



