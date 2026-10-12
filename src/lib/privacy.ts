/** Opens the privacy dialog from anywhere (form consent, footer). */
export const PRIVACY_EVENT = 'elora:privacy';

export function openPrivacyPolicy() {
  window.dispatchEvent(new Event(PRIVACY_EVENT));
}
