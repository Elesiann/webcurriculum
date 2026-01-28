/**
 * Simple i18n implementation for vanilla JS
 * No dependencies, just fetch and DOM manipulation
 */

const i18n = {
    currentLang: localStorage.getItem('lang') || 'pt-br',
    translations: {},

    /**
     * Initialize i18n - load translations and apply to DOM
     */
    async init() {
        await this.loadTranslations(this.currentLang);
        this.applyTranslations();
        this.updateLangButton();
        document.documentElement.lang = this.translations.meta?.lang || this.currentLang;
    },

    /**
     * Load translations from JSON file
     */
    async loadTranslations(lang) {
        try {
            const response = await fetch(`./locales/${lang}.json`);
            if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
            this.translations = await response.json();
            this.currentLang = lang;
            localStorage.setItem('lang', lang);
        } catch (error) {
            console.error('i18n: Error loading translations:', error);
            // Fallback to pt-br if loading fails
            if (lang !== 'pt-br') {
                await this.loadTranslations('pt-br');
            }
        }
    },

    /**
     * Get nested value from object using dot notation
     * e.g., getValue('experience.job1.title') returns translations.experience.job1.title
     */
    getValue(key) {
        return key.split('.').reduce((obj, k) => obj?.[k], this.translations) || key;
    },

    /**
     * Apply translations to all elements with data-i18n attribute
     */
    applyTranslations() {
        // Text content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const value = this.getValue(key);
            if (value && value !== key) {
                el.textContent = value;
            }
        });


        // Attributes (title, alt, placeholder, etc.)
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.dataset.i18nTitle;
            const value = this.getValue(key);
            if (value && value !== key) {
                el.setAttribute('title', value);
            }
        });

        document.querySelectorAll('[data-i18n-alt]').forEach(el => {
            const key = el.dataset.i18nAlt;
            const value = this.getValue(key);
            if (value && value !== key) {
                el.setAttribute('alt', value);
            }
        });

        // Update page title
        if (this.translations.meta?.title) {
            document.title = this.translations.meta.title;
        }

        // Handle bullet lists (experience with multiple bullets)
        this.applyBulletLists();
    },

    /**
     * Special handling for experience bullet lists
     * Uses DOM manipulation instead of innerHTML to prevent XSS
     */
    applyBulletLists() {
        document.querySelectorAll('[data-i18n-bullets]').forEach(ul => {
            const key = ul.dataset.i18nBullets;
            const bullets = this.getValue(key);
            if (Array.isArray(bullets)) {
                // Clear existing content safely
                while (ul.firstChild) {
                    ul.removeChild(ul.firstChild);
                }
                // Create li elements with textContent (XSS-safe)
                bullets.forEach(bulletText => {
                    const li = document.createElement('li');
                    li.textContent = bulletText;
                    ul.appendChild(li);
                });
            }
        });
    },

    /**
     * Toggle language between pt-br and en
     */
    async toggleLanguage() {
        const newLang = this.currentLang === 'pt-br' ? 'en' : 'pt-br';
        await this.loadTranslations(newLang);
        this.applyTranslations();
        this.updateLangButton();
        document.documentElement.lang = this.translations.meta?.lang || newLang;
    },

    /**
     * Update the language button title
     */
    updateLangButton() {
        const langBtn = document.querySelector('.change-lang');
        if (langBtn && this.translations.buttons?.langTitle) {
            langBtn.setAttribute('title', this.translations.buttons.langTitle);
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    i18n.init();

    // Add click handler for language toggle
    const langBtn = document.querySelector('.change-lang');
    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            i18n.toggleLanguage();
        });
    }
});

// Export for use in other scripts if needed
window.i18n = i18n;
