import * as Yup from 'yup';

export const esquemaValidacion = Yup.object().shape({
  nombre: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .required('El nombre es obligatorio'),
  
  edad: Yup.number()
    .typeError('La edad debe ser un número válido')
    .min(18, 'Debes ser mayor de 18 años')
    .max(100, 'La edad debe ser menor a 100 años')
    .required('La edad es obligatoria'),
  
  tipoPropiedad: Yup.string()
    .oneOf(['casa', 'apartamento', 'local'], 'Tipo de propiedad no válido')
    .required('El tipo de propiedad es obligatorio'),
  
  ubicacion: Yup.string()
    .oneOf(['urbana', 'rural'], 'Ubicación no válida')
    .required('La ubicación es obligatoria'),
  
  historialReclamaciones: Yup.number()
    .typeError('Las reclamaciones deben ser un número válido')
    .min(0, 'No puede ser negativo')
    .max(10, 'Máximo 10 reclamaciones')
    .required('Este campo es obligatorio'),
  
  metrosCuadrados: Yup.number()
    .typeError('Los metros cuadrados deben ser un número válido')
    .min(20, 'Mínimo 20 m²')
    .max(2000, 'Máximo 2000 m²')
    .required('Los metros cuadrados son obligatorios')
});