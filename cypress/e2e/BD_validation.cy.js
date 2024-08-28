describe("Age validation tests", () => {
  it("max-age-validation-test", () => {
    cy.fixture("test_data").then((data) => {
      cy.visit("https://www.ottonova.de/online-beitragsrechner"); //visit the required page

      cy.get("body").then(($body) => {
        if (
          $body.find('button[data-testid="uc-accept-all-button"]').length > 0
        ) {
          cy.get('button[data-testid="uc-accept-all-button"]').click();
        } else {
          cy.log('The "Alles akzeptieren" button was not found.');
        }
      });
      //Checks either the button is visible then click it or next step

      cy.get('[data-cy="employment-status-option-employed"] > span').click();
      //Click on Angestellt status

      cy.get('[data-cy="income-input"]').type(data.income.toString());
      // Input income of 70000

      cy.get('[data-cy="employment-status-continue"]').click();
      // click Weiter button

      cy.get('[data-cy="full-insurance"]').click();
      // Select Vollversicherung option

      cy.get('[data-cy="ingress-date"]').select("3: 2024-10-01");
      //Select a date: 01.10.2024

      cy.get('[data-cy="insurance-product-continue"]').click();
      // Click weiter button

      cy.get('[data-cy="day"]').type(data.day); //Input a day of birth
      cy.get('[data-cy="month"]').type(data.month); //Input a month of birth
      cy.get('[data-cy="year"]').type(data.max_age); //Input a year of birth
      cy.get('[data-cy="max-age-validation-message"]').should("be.visible");
    });
  });

  it("negative-age-validation-test", () => {
    cy.fixture("test_data").then((data) => {
      cy.visit("https://www.ottonova.de/online-beitragsrechner"); //visit the required page

      cy.get("body").then(($body) => {
        if (
          $body.find('button[data-testid="uc-accept-all-button"]').length > 0
        ) {
          cy.get('button[data-testid="uc-accept-all-button"]').click();
        } else {
          cy.log('The "Alles akzeptieren" button was not found.');
        }
      });
      //Checks either the button is visible then click it or next step

      cy.get('[data-cy="employment-status-option-employed"] > span').click();
      //Click on Angestellt status

      cy.get('[data-cy="income-input"]').type(data.income.toString());
      // Input income of 70000

      cy.get('[data-cy="employment-status-continue"]').click();
      // click Weiter button

      cy.get('[data-cy="full-insurance"]').click();
      // Select Vollversicherung option

      cy.get('[data-cy="ingress-date"]').select("3: 2024-10-01");
      //Select a date: 01.10.2024

      cy.get('[data-cy="insurance-product-continue"]').click();
      // Click weiter button

      cy.get('[data-cy="day"]').type(data.day); //Input a day of birth
      cy.get('[data-cy="month"]').type(data.month); //Input a month of birth
      cy.get('[data-cy="year"]').type(data.negative_age); //Input a year of birth
      cy.get('[data-cy="negative-age-validation-message"]').should(
        "be.visible"
      );
    });
  });

  it("min-age-validation-test", () => {
    cy.fixture("test_data").then((data) => {
      cy.visit("https://www.ottonova.de/online-beitragsrechner"); //visit the required page

      cy.get("body").then(($body) => {
        if (
          $body.find('button[data-testid="uc-accept-all-button"]').length > 0
        ) {
          cy.get('button[data-testid="uc-accept-all-button"]').click();
        } else {
          cy.log('The "Alles akzeptieren" button was not found.');
        }
      });
      //Checks either the button is visible then click it or next step

      cy.get('[data-cy="employment-status-option-employed"] > span').click();
      //Click on Angestellt status

      cy.fixture("test_data").then((data) => {
        cy.get('[data-cy="income-input"]').type(data.income.toString());
      });
      // Input income of 70000

      cy.get('[data-cy="employment-status-continue"]').click();
      // click Weiter button

      cy.get('[data-cy="full-insurance"]').click();
      // Select Vollversicherung option

      cy.get('[data-cy="ingress-date"]').select("3: 2024-10-01");
      //Select a date: 01.10.2024

      cy.get('[data-cy="insurance-product-continue"]').click();
      // Click weiter button

      cy.get('[data-cy="day"]').type(data.day); //Input a day of birth
      cy.get('[data-cy="month"]').type(data.month); //Input a month of birth
      cy.get('[data-cy="year"]').type(data.min_age); //Input a year of birth
      cy.get('[data-cy="min-age-validation-message"]').should("be.visible");
    });
  });

  it("invalid-age-validation-test", () => {
    cy.fixture("test_data").then((data) => {
      cy.visit("https://www.ottonova.de/online-beitragsrechner"); //visit the required page

      cy.get("body").then(($body) => {
        if (
          $body.find('button[data-testid="uc-accept-all-button"]').length > 0
        ) {
          cy.get('button[data-testid="uc-accept-all-button"]').click();
        } else {
          cy.log('The "Alles akzeptieren" button was not found.');
        }
      });
      //Checks either the button is visible then click it or next step

      cy.get('[data-cy="employment-status-option-employed"] > span').click();
      //Click on Angestellt status

      cy.get('[data-cy="income-input"]').type(data.income.toString());
      // Input income of 70000

      cy.get('[data-cy="employment-status-continue"]').click();
      // click Weiter button

      cy.get('[data-cy="full-insurance"]').click();
      // Select Vollversicherung option

      cy.get('[data-cy="ingress-date"]').select("3: 2024-10-01");
      //Select a date: 01.10.2024

      cy.get('[data-cy="insurance-product-continue"]').click();
      // Click weiter button

      cy.get('[data-cy="day"]').type(data.day); //Input a day of birth
      cy.get('[data-cy="month"]').type(data.month); //Input a month of birth
      cy.get('[data-cy="year"]').type(data.invalid_age); //Input a year of birth
      cy.get(
        ':nth-child(2) > [data-cy="invalid-age-validation-message"]'
      ).should("be.visible");
    });
  });
});
