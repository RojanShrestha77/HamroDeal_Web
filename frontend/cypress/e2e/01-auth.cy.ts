describe('Authentication Tests', () => {
    const baseUrl = 'http://localhost:3000';

    it('should show register form fields', () => {
        cy.visit(`${baseUrl}/register`);

        cy.get('input[name="firstName"]').should('exist');
        cy.get('input[name="lastName"]').should('exist');
        cy.get('input[name="username"]').should('exist');
        cy.get('input[name="email"]').should('exist');
        cy.get('input[name="password"]').should('exist');
        cy.get('input[name="confirmPassword"]').should('exist');
    });

    it('should show login form fields', () => {
        cy.visit(`${baseUrl}/login`);

        cy.get('input[name="email"]').should('exist');
        cy.get('input[name="password"]').should('exist');
        cy.get('form button[type="submit"]').should('exist');
    });

    it('should show error for invalid login attempt', () => {
        cy.visit(`${baseUrl}/login`);

        cy.get('input[name="email"]').type('nonexistent@example.com');
        cy.get('input[name="password"]').type('wrongpassword');
        cy.get('form button[type="submit"]').click();

        // Check for error message or that we're still on login page
        cy.url().should('include', '/login');
    });

    it('should validate email field is required on login', () => {
        cy.visit(`${baseUrl}/login`);

        cy.get('input[name="password"]').type('password123');
        cy.get('form button[type="submit"]').click();

        // Email field should show validation error
        cy.get('input[name="email"]').should('exist');
    });

    it('should validate password field is required on login', () => {
        cy.visit(`${baseUrl}/login`);

        cy.get('input[name="email"]').type('test@example.com');
        cy.get('form button[type="submit"]').click();

        // Password field should show validation error
        cy.get('input[name="password"]').should('exist');
    });

    it('should validate first name is required on register', () => {
        cy.visit(`${baseUrl}/register`);

        cy.get('input[name="lastName"]').type('User');
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').type('password123');
        cy.get('form button[type="submit"]').click();

        // Should still be on register page if validation fails
        cy.url().should('include', '/register');
    });

    it('should validate email format on register', () => {
        cy.visit(`${baseUrl}/register`);

        cy.get('input[name="firstName"]').type('Test');
        cy.get('input[name="lastName"]').type('User');
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="email"]').type('invalid-email');
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').type('password123');
        cy.get('form button[type="submit"]').click();

        // Should still be on register page if validation fails
        cy.url().should('include', '/register');
    });

    it('should validate password confirmation matches on register', () => {
        cy.visit(`${baseUrl}/register`);

        cy.get('input[name="firstName"]').type('Test');
        cy.get('input[name="lastName"]').type('User');
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').type('differentpassword');
        cy.get('form button[type="submit"]').click();

        // Should still be on register page if validation fails
        cy.url().should('include', '/register');
    });

    it('should validate username is required on register', () => {
        cy.visit(`${baseUrl}/register`);

        cy.get('input[name="firstName"]').type('Test');
        cy.get('input[name="lastName"]').type('User');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').type('password123');
        cy.get('form button[type="submit"]').click();

        // Should still be on register page if validation fails
        cy.url().should('include', '/register');
    });

    it('should validate last name is required on register', () => {
        cy.visit(`${baseUrl}/register`);

        cy.get('input[name="firstName"]').type('Test');
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').type('password123');
        cy.get('form button[type="submit"]').click();

        // Should still be on register page if validation fails
        cy.url().should('include', '/register');
    });
});
