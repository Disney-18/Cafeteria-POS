import Header from './Header';
import BottomNav from './BottomNav';

export default function Layout({ children, title }) {
  return (
    <div className="flex min-h-screen flex-col bg-coffee-50">
      <Header title={title} />
      <main className="flex-1 pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}
