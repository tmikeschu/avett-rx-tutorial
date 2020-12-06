describe("Mobile UI", () => {
  const getFontSize = ($el: JQuery<HTMLElement>): number =>
    parseInt($el.css("font-size"), 10);

  it("has a smaller header size on mobile", () => {
    cy.viewport("iphone-6").visit("/");
    cy.findByRole("heading", { name: /avett rx/i }).then(($el) => {
      const fontOnMobile = getFontSize($el);

      cy.viewport("macbook-13")
        .findByRole("heading", { name: /avett rx/i })
        .then(($el) => {
          const fontOnLaptop = getFontSize($el);

          expect(fontOnMobile).to.be.lessThan(fontOnLaptop);
        });
    });
  });
});
