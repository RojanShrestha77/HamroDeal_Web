// Cypress E2E support file
import './commands';

// Disable uncaught exception handling for development
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});
