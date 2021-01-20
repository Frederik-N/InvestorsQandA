describe('Ask question', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('When signed in and ask a valid question, the question should successfully save', () => {
    cy.contains('Among Investors');
    cy.contains('Unanswered Questions');
    cy.contains('Sign In').click();
    cy.url().should('include', 'auth0');
    cy.findByLabelText('Email')
      .type('Frederik-N@hotmail.dk')
      .should('have.value', 'Frederik-N@hotmail.dk');
    cy.findByLabelText('Password')
      .type('89&YazG2')
      .should('have.value', '89&YazG2');
    cy.get('form').submit();
    cy.contains('Unanswered Questions');

    // logged in, now check if you can ask a question
    cy.contains('Ask a Question').click();
    cy.contains('Ask a Question');
    var title = 'title test';
    var content = 'Lots and lots and lots and lots and lots of content test';
    cy.findByLabelText('Title').type(title).should('have.value', title);
    cy.findByLabelText('Content').type(content).should('have.value', content);
    cy.contains('Submit Your Question').click();
    cy.contains('Your question was successfully submitted');

    // sign out in the end
    cy.contains('Sign Out').click();
    cy.contains('You successfully signed out!');
  });
});
