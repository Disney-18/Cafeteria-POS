import ProductCard from './ProductCard';

export default function ProductGrid({ products, onAdd, onEdit }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-coffee-400">
        <span className="material-icons text-5xl">search_off</span>
        <p className="mt-3 text-sm">No se encontraron productos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} onEdit={onEdit} />
      ))}
    </div>
  );
}
