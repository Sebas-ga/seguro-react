export const COBERTURAS = [
  {
    id: 1,
    nombre: "Básica",
    descripcion: "Protección esencial para tu propiedad",
    precioBase: 100,
    coberturasIncluidas: [
      "Incendio",
      "Robo básico",
      "Daños por agua",
      "Responsabilidad civil"
    ],
    icono: "🛡️",
    color: "#3b82f6"
  },
  {
    id: 2,
    nombre: "Estándar",
    descripcion: "Cobertura balanceada para mayor tranquilidad",
    precioBase: 180,
    coberturasIncluidas: [
      "Incendio",
      "Robo ampliado",
      "Daños por agua",
      "Responsabilidad civil",
      "Vandalismo",
      "Cristales"
    ],
    icono: "⭐",
    color: "#8b5cf6"
  },
  {
    id: 3,
    nombre: "Premium",
    descripcion: "Protección completa y máxima seguridad",
    precioBase: 280,
    coberturasIncluidas: [
      "Incendio",
      "Robo total",
      "Daños por agua",
      "Responsabilidad civil ampliada",
      "Vandalismo",
      "Cristales",
      "Desastres naturales",
      "Equipos electrónicos",
      "Asistencia en el hogar"
    ],
    icono: "👑",
    color: "#f59e0b"
  }
];

export const FACTORES_AJUSTE = {
  edad: {
    joven: 1.3,      // 18-24 años
    adulto: 1.0,     // 25-60 años
    mayor: 1.2       // 61+ años
  },
  tipoPropiedad: {
    casa: 1.0,
    apartamento: 0.9,
    local: 1.4
  },
  ubicacion: {
    urbana: 1.1,
    rural: 0.9
  },
  historialReclamaciones: {
    0: 1.0,
    1: 1.2,
    2: 1.4,
    "3+": 1.6
  },
  metrosCuadrados: {
    factor: 0.1  // Por cada m² adicional
  }
};