import { NavLink } from 'react-router-dom';

const ITEMS = [
  { to: '/', icon: 'point_of_sale', label: 'Venta' },
  { to: '/mesas', icon: 'table_restaurant', label: 'Mesas' },
  { to: '/productos', icon: 'inventory_2', label: 'Productos' },
  { to: '/reportes', icon: 'bar_chart', label: 'Reportes' },
  { to: '/config', icon: 'settings', label: 'Ajustes' }
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-coffee-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl justify-around">
        {ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2 text-xs transition-colors ${
                isActive ? 'text-coffee-600' : 'text-coffee-400'
              }`
            }
          >
            <span className="material-icons text-[22px]">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
