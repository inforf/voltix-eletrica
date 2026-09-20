(function () {
  const CONSENT_KEY = 'voltix-analytics-consent';

  const cookieBanners = document.querySelectorAll('.cookie-banner');
  const acceptButtons = document.querySelectorAll('.cookie-accept');
  const rejectButtons = document.querySelectorAll('.cookie-reject');
  const resetButtons = document.querySelectorAll('.privacy-reset');

  function sendClarityConsent(choice) {
    const analyticsStorage = choice === 'accepted' ? 'granted' : 'denied';

    window.clarity('consentv2', {
      ad_Storage: 'denied',
      analytics_Storage: analyticsStorage
    });
  }

  function showConsentBanner() {
    cookieBanners.forEach((banner) => {
      banner.hidden = false;
    });
  }

  function hideConsentBanner() {
    cookieBanners.forEach((banner) => {
      banner.hidden = true;
    });
  }

  function saveConsent(choice) {
    localStorage.setItem(CONSENT_KEY, choice);
    sendClarityConsent(choice);
    hideConsentBanner();
  }

  acceptButtons.forEach((button) => {
    button.addEventListener('click', () => {
      saveConsent('accepted');
    });
  });

  rejectButtons.forEach((button) => {
    button.addEventListener('click', () => {
      saveConsent('rejected');
    });
  });

  resetButtons.forEach((button) => {
    button.addEventListener('click', () => {
      localStorage.removeItem(CONSENT_KEY);
      sendClarityConsent('rejected');
      showConsentBanner();
    });
  });

  const savedConsent = localStorage.getItem(CONSENT_KEY);
  sendClarityConsent(savedConsent === 'accepted' ? 'accepted' : 'rejected');

  if (savedConsent !== 'accepted' && savedConsent !== 'rejected') {
    showConsentBanner();
  }
})();
