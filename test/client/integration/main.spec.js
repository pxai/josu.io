describe.only('Main Content', function () {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('cy.document() - get the document object', () => {
    cy
      .document()
      .should('have.property', 'charset')
      .and('eq', 'UTF-8');
  });

  it('has a page title', () => {
    cy.title().should('include', 'josu');
  });

  it('shows Header title', () => {
    cy.get('h3').should('have.text', 'josu.io todo app');
  });
});
