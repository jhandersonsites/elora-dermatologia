/**
 * Lets any CTA pre-select the "area of interest" field in the appointment
 * form without prop drilling: CTAs dispatch, the form listens.
 */
const EVENT = 'elora:interest';

export function selectInterest(interest: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: interest }));
}

export function onInterestSelected(handler: (interest: string) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<string>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
