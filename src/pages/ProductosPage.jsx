import { useState } from 'react';
import Layout from '../components/layout/Layout';
import ProductList from '../components/productos/ProductList';
import ProductForm from '../components/productos/ProductForm';
import Modal from '../components/ui/Modal';
import AlertModal from '../components/ui/AlertModal';
import Button from '../components/ui/Button';
import { useProductStore } from '../store/useProductStore';
import toast from 'react-hot-toast';

export default function ProductosPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = products.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (data) => {
    if (editing) {
      updateProduct(editing.id, data);
      toast.success('Producto actualizado');
    } else {
      addProduct(data);
      toast.success('Producto creado');
    }
    setFormOpen(false);
    setEditing(null);
  };

  const handleEdit = (p) => {
    setEditing(p);
    setFormOpen(true);
  };

  const handleNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  return (
    <Layout title="Productos">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-coffee-400">
              search
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full rounded-xl border border-coffee-200 bg-white py-2.5 pl-11 pr-4 text-sm outline-none focus:border-coffee-500"
            />
          </div>
          <Button variant="primary" icon="add" onClick={handleNew}>
            Nuevo
          </Button>
        </div>

        <ProductList
          products={filtered}
          onEdit={handleEdit}
          onDelete={setToDelete}
        />
      </div>

      <Modal open={formOpen} onClose={() => { setFormOpen(false); setEditing(null); }} size="md">
        <ProductForm
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={() => {
            setFormOpen(false);
            setEditing(null);
          }}
        />
      </Modal>

      <AlertModal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        type="warning"
        title="Eliminar producto"
        message={`¿Seguro que quieres eliminar "${toDelete?.nombre}"? Esta acción no se puede deshacer.`}
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        onConfirm={() => {
          deleteProduct(toDelete.id);
          toast.success('Producto eliminado');
        }}
      />
    </Layout>
  );
}
