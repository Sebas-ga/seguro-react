# Cotizador de seguro
Es un cotizador de seguros para propiedades que:

* Toma datos del usuario (edad, tipo de propiedad, ubicación, etc.)

* Calcula 3 opciones de cobertura con precios personalizados

* Permite seleccionar una cobertura y guardarla en el historial

* Muestra un historial persistente de todas las cotizaciones realizadas


## Estructura del proyecto
src/
├── 🎨 components/     # Componentes de UI reutilizables
├── 🎣 hooks/         # Lógica personalizada de React
├── 🌐 context/       # Estado global de la aplicación  
├── 📄 pages/         # Vistas/páginas principales
├── 🛠️ utils/         # Funciones auxiliares
├── 📊 data/          # Datos estáticos
└── 🎯 main/App       # Archivos principales

## TECNOLOGÍAS IMPLEMENTADAS
   Tecnología	Función en el proyecto
   React 18	Framework principal
   React Router	Navegación entre páginas
   Formik + Yup	Formularios y validación
   Bootstrap 5	Diseño y responsive
   Context API	Estado global del historial
   LocalStorage	Persistencia de datos
   Custom Hooks	Lógica reutilizable
   
## CICLO DE VIDA DE UNA COTIZACIÓN
 Ingreso de datos → Formulario
 Cálculo → useCotizacion + calculos.js
 Visualización → ListaCoberturas
 Guardado → HistorialContext + localStorage
 Consulta → HistorialPage


