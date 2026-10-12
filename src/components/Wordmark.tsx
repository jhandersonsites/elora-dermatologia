import { site } from '../config/site';

export function Wordmark({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <span className={`wordmark wordmark--${tone}`}>
      <span className="wordmark__name">{site.brand}</span>{' '}
      <span className="wordmark__suffix">{site.brandSuffix}</span>
    </span>
  );
}
