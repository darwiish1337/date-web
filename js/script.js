/**
 * Project: Will You?
 * Author: Darwish
 * License: MIT
 * All rights reserved. No part of this code may be removed or altered without attribution.
 */

/**
 * ValentineApp Class
 * Manages the interactive "Will You Go On a Date" experience.
 * Follows OOP principles for maintainability and scalability.
 */
class ValentineApp {
    constructor() {
        // Initialize state
        this.isFloating = false;
        this.noHoverCount = 0;
        this.hoverThreshold = 3;

        // Cache DOM elements
        this.noBtn = document.getElementById('noBtn');
        this.yesBtn = document.getElementById('yesBtn');
        this.card = document.getElementById('card');
        this.yesOverlay = document.getElementById('yesOverlay');
        this.noOverlay = document.getElementById('noOverlay');
        this.backBtn = document.getElementById('backBtn');

        // Bind methods to maintain context
        this.handleNoHover = this.handleNoHover.bind(this);
        this.handleYesClick = this.handleYesClick.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleNoClick = this.handleNoClick.bind(this);
        this.closeNoOverlay = this.closeNoOverlay.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);

        this.init();
    }

    /**
     * Initializes event listeners and setup
     */
    init() {
        if (this.noBtn) {
            this.noBtn.addEventListener('mouseenter', this.handleNoHover);
            this.noBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleNoHover();
            }, { passive: false });
            this.noBtn.addEventListener('click', this.handleNoClick);
        }

        if (this.yesBtn) {
            this.yesBtn.addEventListener('click', this.handleYesClick);
        }

        if (this.backBtn) {
            this.backBtn.addEventListener('click', this.handleBackClick);
        }

        window.addEventListener('resize', this.handleResize);
        document.addEventListener('keydown', this.handleKeydown);

        // Global function hooks for HTML inline onclick (legacy support if needed)
        window.onYes = this.handleYesClick;
        window.onNo = this.handleNoClick;
        window.closeNoOverlay = this.closeNoOverlay;
        window.closeYesOverlay = this.handleBackClick; // Fallback for Back button
    }

    /**
     * Calculates a safe random position within the card boundaries
     * @returns {Object} {x, y} coordinates
     */
    getRandomPos() {
        const margin = 15;
        const btnW = this.noBtn.offsetWidth || 80;
        const btnH = this.noBtn.offsetHeight || 40;

        // Elements to avoid to prevent overlapping
        const avoidElements = [
            document.querySelector('.cat-wrapper'),
            document.querySelector('.headline'),
            this.yesBtn
        ];

        const cardRect = this.card.getBoundingClientRect();
        const avoidRects = avoidElements.map(el => {
            if (!el) return null;
            const r = el.getBoundingClientRect();
            const pad = 15;
            return {
                left: r.left - cardRect.left - pad,
                top: r.top - cardRect.top - pad,
                right: r.right - cardRect.left + pad,
                bottom: r.bottom - cardRect.top + pad
            };
        }).filter(r => r !== null);

        const maxX = Math.max(0, this.card.clientWidth - btnW - margin);
        const maxY = Math.max(0, this.card.clientHeight - btnH - margin);

        let x, y, overlaps;
        let attempts = 0;

        do {
            x = margin + Math.random() * (maxX - margin > 0 ? maxX - margin : 0);
            y = margin + Math.random() * (maxY - margin > 0 ? maxY - margin : 0);
            
            overlaps = avoidRects.some(rect => {
                return !(x + btnW < rect.left || 
                         x > rect.right || 
                         y + btnH < rect.top || 
                         y > rect.bottom);
            });
            attempts++;
        } while (overlaps && attempts < 150);

        return { x, y };
    }

    /**
     * Switches the "No" button to floating state
     */
    enableFloating() {
        if (this.isFloating) return;
        this.isFloating = true;

        this.card.appendChild(this.noBtn);
        this.noBtn.classList.add('floating');
        this.noBtn.style.width = '100px';
        this.noBtn.style.margin = '0';
        this.moveNoBtn();
    }

    /**
     * Moves the "No" button to a new random position
     */
    moveNoBtn() {
        if (!this.isFloating) this.enableFloating();
        
        const { x, y } = this.getRandomPos();
        this.noBtn.style.left = `${x}px`;
        this.noBtn.style.top = `${y}px`;
    }

    /**
     * Handles hover/touch interaction on "No" button
     */
    handleNoHover() {
        this.noHoverCount++;
        
        if (this.noHoverCount >= this.hoverThreshold) {
            this.showNoOverlay();
        }

        this.moveNoBtn();
    }

    /**
     * Handles explicit click on "No" button (if managed to click)
     */
    handleNoClick() {
        this.moveNoBtn();
    }

    /**
     * Handles click on "Date Me" button
     */
    handleYesClick() {
        if (this.yesOverlay) {
            this.yesOverlay.classList.add('show');
        }
    }

    /**
     * Handles click on "Back" button in the "Yes" overlay
     */
    handleBackClick() {
        if (this.yesOverlay) {
            this.yesOverlay.classList.remove('show');
        }
    }

    /**
     * Shows the warning overlay
     */
    showNoOverlay() {
        if (this.noOverlay) {
            this.noOverlay.classList.add('show');
            this.noHoverCount = 0; 
        }
    }

    /**
     * Closes the warning overlay
     */
    closeNoOverlay() {
        if (this.noOverlay) {
            this.noOverlay.classList.remove('show');
        }
    }

    /**
     * Handles window resize to keep button in bounds
     */
    handleResize() {
        if (this.isFloating) {
            this.moveNoBtn();
        }
    }

    /**
     * Handles keyboard interactions
     * @param {KeyboardEvent} e 
     */
    handleKeydown(e) {
        if (e.key === 'Escape') {
            this.yesOverlay?.classList.remove('show');
            this.noOverlay?.classList.remove('show');
        }
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log("ValentineApp initialized by Darwish");
    new ValentineApp();
});
