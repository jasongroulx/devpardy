describe('The game board', () => {
    it('Rendrers questions', () => {
        cy.visit('http://devpardy.test/game')
        cy.get('[data-cy=title]')
            .should('contain', 'Devpardy')
    })
});
