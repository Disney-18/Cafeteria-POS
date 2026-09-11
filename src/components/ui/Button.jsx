export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}) {
  const variants = {
    primary:
      'bg-coffee-500 text-white hover:bg-coffee-600 active:bg-coffee-700 shadow-sm',
    secondary:
      'bg-coffee-100 text-coffee-700 hover:bg-coffee-200 active:bg-coffee-300',
    outline:
      'border border-coffee-300 text-coffee-700 hover:bg-coffee-50 active:bg-coffee-100',
    danger:
      'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm',
    success:
      'bg-green-500 text-white hover:bg-green-600 active:bg-green-700 shadow-sm',
    ghost:
      'text-coffee-700 hover:bg-coffee-100 active:bg-coffee-200'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2'
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="material-icons text-[18px]">{icon}</span>}
      {children}
    </button>
  );
}
