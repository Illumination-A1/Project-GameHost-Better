document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('gameSearch');
    const cards = document.querySelectorAll('.card');
    const body = document.body;

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm) {
            body.classList.add('search-active');
        } else {
            body.classList.remove('search-active');
        }

        cards.forEach(card => {
            const gameTitle = card.querySelector('.card-title h2').textContent.toLowerCase();
            
            if (gameTitle.includes(searchTerm)) {
                card.classList.remove('hidden');
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                card.classList.add('hidden');
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
            }
        });

        const visibleCards = document.querySelectorAll('.card:not(.hidden)');
        const container = document.querySelector('.container');
        
        if (visibleCards.length === 0) {
            let noResults = document.querySelector('.no-results');
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.style.textAlign = 'center';
                noResults.style.color = '#E2DFD2';
                noResults.style.padding = '20px';
                noResults.style.fontFamily = "'Courier New', Courier, monospace";
                container.appendChild(noResults);
            }
            noResults.textContent = `No games found matching "${searchTerm}"`;
        } else {
            const noResults = document.querySelector('.no-results');
            if (noResults) {
                noResults.remove();
            }
        }
    });

    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            body.classList.remove('search-active');
            this.dispatchEvent(new Event('input'));
        }
    });

    cards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
});