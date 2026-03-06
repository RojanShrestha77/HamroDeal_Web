describe('Shopping Tests', () => {
    const baseUrl = 'http://localhost:3000';

    beforeEach(() => {
        // Login before each test
        cy.visit(`${baseUrl}/login`);
        cy.get('input[name="email"]').type('testuser@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('form button[type="submit"]').click();
        cy.url().should('not.include', '/login');
    });

    it('should view product details', () => {
        cy.visit(`${baseUrl}/products`);
        cy.get('a').first().click();

        cy.contains('Add to Cart').should('exist');
    });

    it('should add product to cart', () => {
        cy.visit(`${baseUrl}/products`);
        cy.get('a').first().click();

        cy.get('button').contains('Add to Cart').click();
        cy.contains('Added to cart').should('exist');
    });

    it('should remove product from cart', () => {
        cy.visit(`${baseUrl}/cart`);

        cy.get('button').contains('Remove').first().click();
        cy.contains('removed').should('exist');
    });

    it('should search for products', () => {
        cy.visit(`${baseUrl}/products`);

        cy.get('input[placeholder*="search"]').type('electronics');
        cy.get('button').contains('Search').click();

        cy.get('a').should('have.length.greaterThan', 0);
    });

    it('should filter products by category', () => {
        cy.visit(`${baseUrl}/products`);

        cy.get('button').contains('Electronics').click();
        cy.get('a').should('have.length.greaterThan', 0);
    });

    it('should checkout successfully', () => {
        cy.visit(`${baseUrl}/cart`);

        cy.get('button').contains('Checkout').click();
        cy.url().should('include', '/checkout');

        cy.get('input[placeholder*="name"]').type('John Doe');
        cy.get('input[placeholder*="phone"]').type('1234567890');
        cy.get('input[placeholder*="address"]').type('123 Main St');
        cy.get('input[placeholder*="city"]').type('Test City');
        cy.get('input[placeholder*="zip"]').type('12345');

        cy.get('button').contains('Place Order').click();
        cy.contains('Order').should('exist');
    });
});
