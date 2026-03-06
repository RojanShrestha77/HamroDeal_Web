describe('Review Tests', () => {
    const baseUrl = 'http://localhost:3000';

    beforeEach(() => {
        // Login before each test
        cy.visit(`${baseUrl}/login`);
        cy.get('input[name="email"]').type('testuser@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('form button[type="submit"]').click();
        cy.url().should('not.include', '/login');
    });

    it('should submit a product review', () => {
        cy.visit(`${baseUrl}/products`);
        cy.get('a').first().click();

        cy.get('button').contains('Review').click();
        cy.get('textarea').type('This is a great product! Highly recommended.');
        cy.get('button').contains('5').click();

        cy.get('button').contains('Submit').click();
        cy.contains('Review').should('exist');
    });

    it('should view product reviews', () => {
        cy.visit(`${baseUrl}/products`);
        cy.get('a').first().click();

        cy.contains('Review').should('exist');
    });
});
