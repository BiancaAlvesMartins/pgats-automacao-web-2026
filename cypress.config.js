const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          // Desativa sugestões de autofill e gestor de palavras-passe/endereços no Chrome
          launchOptions.preferences.default['credentials_enable_service'] = false;
          launchOptions.preferences.default['profile.password_manager_enabled'] = false;
          launchOptions.preferences.default['autofill.profile_enabled'] = false;
          launchOptions.preferences.default['autofill.credit_card_enabled'] = false;
        }
        return launchOptions;
      });
    },
  },
});