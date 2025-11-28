export const validarFormulario = (datos) => {
  const errores = {};
  
  // Validar nombre
  if (!datos.nombre.trim()) {
    errores.nombre = "El nombre es obligatorio";
  } else if (datos.nombre.trim().length < 2) {
    errores.nombre = "El nombre debe tener al menos 2 caracteres";
  }
  
  // Validar edad
  const edad = parseInt(datos.edad);
  if (!datos.edad) {
    errores.edad = "La edad es obligatoria";
  } else if (isNaN(edad)) {
    errores.edad = "La edad debe ser un número válido";
  } else if (edad < 18) {
    errores.edad = "Debes ser mayor de 18 años";
  } else if (edad > 100) {
    errores.edad = "La edad debe ser menor a 100 años";
  }
  
  // Validar metros cuadrados
  const metros = parseInt(datos.metrosCuadrados);
  if (!datos.metrosCuadrados) {
    errores.metrosCuadrados = "Los metros cuadrados son obligatorios";
  } else if (isNaN(metros)) {
    errores.metrosCuadrados = "Los metros cuadrados deben ser un número válido";
  } else if (metros < 20) {
    errores.metrosCuadrados = "Mínimo 20 m²";
  } else if (metros > 2000) {
    errores.metrosCuadrados = "Máximo 2000 m²";
  }
  
  // Validar historial de reclamaciones
  const reclamaciones = parseInt(datos.historialReclamaciones);
  if (!isNaN(reclamaciones) && reclamaciones < 0) {
    errores.historialReclamaciones = "No puede ser negativo";
  }
  
  return errores;
};

export const formularioEsValido = (datos) => {
  const errores = validarFormulario(datos);
  return Object.keys(errores).length === 0;
};