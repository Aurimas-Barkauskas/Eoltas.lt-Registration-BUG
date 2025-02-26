function generateRandomEmail() {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let username = '';
  for (let i = 0; i < 10; i++) {
    username += chars[Math.floor(Math.random() * chars.length)];
  }
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${username}@${domain}`;
}

// eoltas_registration.spec.js
describe('Eoltas.lt Registration Test', () => {
  it('should not allow registration with a password that contains spaces', () => {
    const randomEmail = generateRandomEmail();

    // Visit the Eoltas.lt homepage
    cy.visit('https://www.eoltas.lt/lt-lt');
    
    // Click on "Prisijungti" and then "Registruotis"
    cy.contains('Prisijungti').click();
    cy.get('.cell-btn-register > .btn').click();
    
    // Fill in the registration form
    cy.get('#login-email').type(randomEmail);
    cy.get('#login-password-1').type('invalid password');
    cy.get('#login-password-2').type('invalid password');
    cy.get(':nth-child(5) > .check-el').click('left');
    cy.get(':nth-child(9) > .width-100 > .btn').click();
    // Check if the registration is rejected due to the password containing spaces
    cy.contains('Password cannot contain spaces').should('be.visible'); // Adjust the message to match the actual validation message
  });
});
