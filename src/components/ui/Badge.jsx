function Badge({ children, variant }) {
  return (
    <div
      style={{
        backgroundColor: `rgb(var(--color-${variant}-100))`,
        color: `rgb(var(--color-${variant}-700))`,
      }}
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase"
    >
      {children}
    </div>
  );
}

export default Badge;
