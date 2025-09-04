// src/data/mock.js
export const ingresosMensuales = [
  { name: 'Ene', ingresos: 1200 },
  { name: 'Feb', ingresos: 1600 },
  { name: 'Mar', ingresos: 900 },
  { name: 'Abr', ingresos: 1800 },
  { name: 'May', ingresos: 2200 },
  { name: 'Jun', ingresos: 2000 },
]

export const proyectos = [
  { nombre: 'Tienda Sport', cliente: 'JACV TOBE SPORT', contacto: '3001234567', inicio: '2025-07-10', entrega: '2025-09-20', estado: 'Activo' },
  { nombre: 'Landing Clínica', cliente: 'SaludPlus', contacto: '3019876543', inicio: '2025-06-01', entrega: '2025-08-15', estado: 'Pendiente Pago' },
  { nombre: 'Ecommerce Mosaicos', cliente: 'Tecno Mosaico', contacto: '3005558888', inicio: '2025-05-01', entrega: '2025-07-10', estado: 'En Pausa' },
  { nombre: 'Web Inmobiliaria', cliente: 'CasaApp', contacto: '3114445566', inicio: '2025-04-05', entrega: '2025-06-30', estado: 'Activo' },
  { nombre: 'Portal Noticias', cliente: 'TownNews', contacto: '3102223344', inicio: '2025-03-12', entrega: '2025-05-30', estado: 'Activo' },
]

export const clientes = [
  { nombre: 'Carlos López', empresa: 'Independiente', telefono: '3001234567', email: 'carlos@mail.com', proyectos: 2 },
  { nombre: 'Ana Martínez', empresa: 'SaludPlus', telefono: '3019876543', email: 'ana@saludplus.com', proyectos: 1 },
  { nombre: 'Tecno Mosaico', empresa: 'Tecno Mosaico', telefono: '3005558888', email: 'contacto@tecnomosaico.co', proyectos: 1 },
  { nombre: 'JACV TOBE SPORT', empresa: 'JACV TOBE SPORT', telefono: '3129990000', email: 'ventas@jacvtobesport.com', proyectos: 1 },
]

export const pagos = [
  { concepto: 'Mantenimiento mensual — JACV TOBE SPORT', monto: '$80.000', vencimiento: '2025-09-10', cliente: 'JACV TOBE SPORT', estado: 'Vence pronto' },
  { concepto: 'Hosting anual — SaludPlus', monto: '$240.000', vencimiento: '2025-09-25', cliente: 'SaludPlus', estado: 'Pendiente Pago' },
  { concepto: 'Dominio — Tecno Mosaico', monto: '$55.000', vencimiento: '2025-08-15', cliente: 'Tecno Mosaico', estado: 'Vencido' },
  { concepto: 'Web Inmobiliaria — Entrega final', monto: '$1.800.000', vencimiento: '2025-09-05', cliente: 'CasaApp', estado: 'Pendiente Pago' },
  { concepto: 'Soporte — TownNews', monto: '$150.000', vencimiento: '2025-09-18', cliente: 'TownNews', estado: 'Pagado' },
]
