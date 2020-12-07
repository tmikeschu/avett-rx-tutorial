describe("Pharmacy", () => {
  it("can be visited from homescreen button", () => {
    cy.viewport("iphone-6").visit("/");
    cy.findByText(/get a prescription/i).click();
    cy.location("pathname").should("match", /^\/pharmacy$/);
    cy.findByRole("heading", { name: /pharmacy/i }).should("exist");
    cy.findByRole("button", { name: /back/i }).click();
    cy.location("pathname").should("match", /^\/$/);
  });
});
