import { twMerge } from 'tailwind-merge';

function Badge({ children, variant, className = '' }) {
  return (
    <div
      style={{
        backgroundColor: `rgb(var(--color-${variant}-100))`,
        color: `rgb(var(--color-${variant}-700))`,
      }}
      className={twMerge(
        'inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase',
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Badge;
