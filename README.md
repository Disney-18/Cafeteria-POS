# Punto de Venta - Cafetería

Aplicación web de punto de venta diseñada específicamente para cafeterías y pequeños negocios de alimentos. Funciona de forma totalmente offline, con persistencia local de datos y una interfaz moderna optimizada para dispositivos táctiles y de escritorio.

---

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Capturas](#capturas)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Modelos de Datos](#modelos-de-datos)
- [Scripts Disponibles](#scripts-disponibles)
- [Roadmap](#roadmap)
- [Casos de Uso](#casos-de-uso)
- [Privacidad](#privacidad)
- [Licencia](#licencia)
- [Autor](#autor)

---

## Características

### Catálogo de Productos

- Visualización en cuadrícula responsiva
- Iconos Material Icons personalizables por producto
- Indicadores visuales de stock (disponible, bajo, agotado)
- Precios formateados según la moneda configurada

### Búsqueda y Filtros

- Buscador en tiempo real por nombre
- Filtros por categorías: Cafés, Bebidas, Postres, Sandwiches, Otros
- Chips de categoría con scroll horizontal
- Contador de productos por categoría

### Carrito de Compras

- Botón flotante con badge de cantidad
- Panel deslizante desde abajo con detalle completo
- Control de cantidades con botones + y -
- Cálculo automático de subtotal, impuestos y total
- Validación de stock disponible
- Limpieza de carrito con confirmación

### Proceso de Cobro

- Métodos de pago: Efectivo, Tarjeta, Transferencia
- Asignación opcional a mesa o venta para llevar
- Campo para nombre del cliente
- Cálculo automático de cambio para pagos en efectivo
- Generación de ticket imprimible tipo térmico (80 mm)

### Ticket de Venta

- Datos del negocio (nombre, dirección, teléfono)
- Fecha y hora de la transacción
- Número de ticket único
- Detalle de productos con cantidades y precios
- Subtotal, impuestos y total
- Método de pago y cambio
- Información de mesa y cliente

### Gestión de Mesas

- Cuadrícula de 12 mesas configurables
- Indicadores visuales de estado (libre u ocupada)
- Mesas ocupadas muestran el total acumulado
- Filtros por estado: Todas, Libres, Ocupadas
- Operaciones: consultar, agregar productos, liberar con confirmación

### Gestión de Productos

- Creación, edición y eliminación de productos
- Campos: nombre, categoría, precio, stock, icono
- Confirmación antes de eliminar

### Control de Stock

- Indicadores visuales por nivel
  - Verde: stock mayor a 10 unidades
  - Amarillo: stock entre 1 y 10 unidades
  - Rojo: sin stock
- Descuento automático al realizar ventas
- Validación antes de agregar al carrito
- Alertas al intentar exceder el stock disponible

### Reportes e Historial

- Total de ventas del día actual
- Número de órdenes procesadas
- Cantidad de productos en inventario
- Ticket promedio por venta
- Historial de las últimas 10 ventas con número de ticket, fecha, método de pago y total

### Configuración

- Datos del negocio: nombre, dirección, teléfono
- Moneda configurable
  - CUP - Peso Cubano (por defecto)
  - USD - Dólar Americano
  - EUR - Euro
  - MXN - Peso Mexicano
  - COP - Peso Colombiano
  - ARS - Peso Argentino
  - CLP - Peso Chileno
  - PEN - Sol Peruano
  - BRL - Real Brasileño
- Porcentaje de impuesto configurable
- Acceso a la guía paso a paso

### Guía Interactiva

- 8 pantallas explicativas
- Navegación con indicadores de progreso
- Botones de Omitir y Siguiente/Comenzar
- Se puede reactivar desde la configuración

### Componentes UI

- Modal unificado con 4 tipos de alertas: success, error, warning, info
- Botones con efectos hover y active
- Tarjetas con elevación al pasar el cursor
- Panel deslizante para el carrito
- Chips de categoría con estados
- Switches para opciones binarias

---

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Estilos | Tailwind CSS 3 |
| Estado Global | Zustand 4 con persistencia |
| Rutas | React Router 6 |
| Iconos | Material Icons (Google Fonts) |
| Notificaciones | React Hot Toast |
| Fechas | date-fns |
| Persistencia | localStorage |

---

## Capturas

> Próximamente se añadirán capturas de pantalla de las vistas principales: catálogo, carrito, cobro, mesas, reportes y configuración.

---

## Instalación

### Requisitos

- Node.js 18 o superior
- npm o yarn

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/cafeteria-pos.git
cd cafeteria-pos

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en http://localhost:5173.

---

Uso

Primer inicio

Al abrir la aplicación por primera vez, se muestra una guía interactiva de 8 pasos. Puedes omitirla o completarla. Se puede reactivar desde la sección de Configuración.

Flujo recomendado

1. Configurar los datos del negocio, la moneda y el impuesto
2. Revisar o ajustar el inventario de productos
3. Seleccionar productos del catálogo para agregarlos al carrito
4. Abrir el carrito flotante y verificar cantidades
5. Presionar Cobrar
6. Elegir método de pago, asignar mesa si corresponde y confirmar
7. Imprimir el ticket si es necesario
8. Consultar reportes del día e historial de ventas

Venta para llevar

Seleccionar productos, abrir el carrito, presionar Cobrar, elegir la opción Para llevar y confirmar.

Venta en mesa

Seleccionar productos, abrir el carrito, presionar Cobrar, elegir la opción En mesa, seleccionar la mesa correspondiente y confirmar. Los productos se acumularán en esa mesa hasta liberarla.

Liberar mesa

Ir a la sección Mesas, seleccionar la mesa ocupada y presionar Liberar. Se solicitará confirmación antes de eliminar la cuenta.

---

Estructura del Proyecto

```
cafeteria-pos/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── productos/
│   │   ├── carrito/
│   │   ├── checkout/
│   │   ├── mesas/
│   │   ├── historial/
│   │   ├── reportes/
│   │   └── onboarding/
│   ├── pages/
│   ├── store/
│   ├── hooks/
│   ├── utils/
│   ├── data/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

Descripción de Carpetas

· components/ui: Componentes reutilizables como Button, Modal, Chip, Badge
· components/layout: Layout principal, header y navegación inferior
· components/productos: Tarjetas, grid, formulario y lista de productos
· components/carrito: Botón flotante, panel y elementos del carrito
· components/checkout: Modal de cobro, métodos de pago y previsualización de ticket
· components/mesas: Grid, tarjeta y detalle de mesa
· components/historial: Listado de ventas
· components/reportes: Tarjetas y estadísticas del día
· components/onboarding: Guía interactiva paso a paso
· pages: Vistas principales asociadas a cada ruta
· store: Estados globales con Zustand y persistencia en localStorage
· utils: Funciones puras para formato, cálculos y generación de ticket
· data: Datos iniciales de productos, mesas, monedas y guía
· styles: Estilos globales y estilos de impresión

---

Modelos de Datos

Producto

```js
{
  id: "p_001",
  nombre: "Capuchino",
  categoria: "Cafés",
  precio: 250,
  stock: 25,
  icono: "coffee",
  activo: true
}
```

Mesa

```js
{
  id: 1,
  estado: "libre" | "ocupada",
  items: [{ id, nombre, precio, icono, stock, cantidad }],
  total: 0,
  cliente: "",
  abiertaEn: null
}
```

Venta

```js
{
  id: "s_123456789",
  numero: "T-20250115-143022-482",
  fecha: "2025-01-15T14:32:00.000Z",
  items: [{ id, nombre, precio, cantidad, icono }],
  subtotal: 500,
  impuesto: 50,
  total: 550,
  metodoPago: "efectivo" | "tarjeta" | "transferencia",
  recibido: 600,
  cambio: 50,
  mesa: 3 | null,
  cliente: "Juan",
  tipo: "mesa" | "llevar"
}
```

Configuración

```js
{
  negocio: { nombre, direccion, telefono },
  moneda: "CUP",
  impuestoPorcentaje: 10
}
```

Claves de Persistencia

Clave Descripción
pos-config Datos del negocio, moneda e impuesto
pos-products Catálogo de productos
pos-cart Carrito actual
pos-tables Estado de las mesas
pos-sales Historial de ventas
pos-onboarding Estado de la guía interactiva

---

Scripts Disponibles

Comando Descripción
npm run dev Inicia el servidor de desarrollo en http://localhost:5173
npm run build Genera la versión de producción en la carpeta dist
npm run preview Previsualiza la versión de producción

---

Roadmap

☑ Catálogo de productos con búsqueda y filtros
☑ Carrito de compras con validación de stock
☑ Proceso de cobro con múltiples métodos de pago
☑ Ticket imprimible tipo térmico
☑ Gestión de mesas con acumulación de cuentas
☑ Control de inventario y stock
☑ Reportes del día e historial
☑ Configuración de negocio, moneda e impuestos
☑ Guía interactiva paso a paso
☐ Exportación de reportes a CSV y PDF
☐ Copia de seguridad y restauración de datos
☐ Múltiples usuarios con roles
☐ Sincronización opcional con backend
☐ Modo oscuro
☐ Soporte multi-idioma

---

Casos de Uso

Esta aplicación está pensada para:

· Cafeterías
· Panaderías
· Heladerías
· Restaurantes pequeños
· Kioscos
· Tiendas de abarrotes
· Negocios de comida rápida
· Food trucks

---

Privacidad

· Todos los datos se almacenan localmente en el navegador del dispositivo
· No se envían datos a servidores externos
· No se requiere cuenta de usuario
· No se utilizan cookies de rastreo
· La única conexión externa es la descarga inicial de las fuentes de Google (Inter, JetBrains Mono) y los iconos de Material Icons. Una vez cargados, el navegador los cachea y la aplicación funciona completamente offline

---

Rendimiento

· Carga instantánea gracias a Vite
· Animaciones fluidas con CSS puro
· Sin tiempos de espera en operaciones
· Optimizado para pantallas táctiles y de escritorio

---

Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

---

Autor

Desarrollado como solución completa de punto de venta para pequeños negocios de alimentos.

Si te resulta útil, considera darle una estrella al repositorio.

---

Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes, por favor abre primero un issue para discutir qué te gustaría cambiar.

1. Haz un fork del proyecto
2. Crea una rama con tu feature (git checkout -b feature/nueva-funcionalidad)
3. Haz commit de tus cambios (git commit -m 'Añadir nueva funcionalidad')
4. Haz push a la rama (git push origin feature/nueva-funcionalidad)
5. Abre un Pull Request

```

---

**Nota:** recuerda reemplazar `tu-usuario` en la sección de instalación por tu usuario real de GitHub, y añadir un archivo `LICENSE` con el texto de la licencia MIT si vas a publicar el repositorio abiertamente. También puedes crear el archivo `LICENSE` rápidamente desde la interfaz de GitHub al crear el repositorio.
