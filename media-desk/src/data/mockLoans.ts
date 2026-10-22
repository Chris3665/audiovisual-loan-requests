import type { LoanRequest } from '../types/loan';

export const INITIAL_LOANS: LoanRequest[] = [
  {
    code: 'REQ-101',
    resourceName: 'Cámara Sony Alpha a7 IV',
    category: 'Camaras',
    requester: 'Ana Morales',
    returnDate: '2026-10-25',
    status: 'en_prestamo',
  },
  {
    code: 'REQ-102',
    resourceName: 'Micrófono Direccional Rode NTG4+',
    category: 'Audio',
    requester: 'Carlos Gómez',
    returnDate: null, // Ausencia explícita de fecha de devolución confirmada
    status: 'pendiente',
  },
  {
    code: 'REQ-103',
    resourceName: 'Kit de Paneles LED Aputure Amaran',
    category: 'Iluminacion',
    requester: 'Lucía Fernández',
    returnDate: '2026-10-24',
    status: 'aprobado',
  },
  {
    code: 'REQ-104',
    resourceName: 'Proyector Láser Epson PowerLite',
    category: 'Proyeccion',
    requester: 'Diego Herrera',
    returnDate: '2026-10-18',
    status: 'devuelto',
  },
  {
    code: 'REQ-105',
    resourceName: 'Grabadora Portátil Zoom H6',
    category: 'Audio',
    requester: 'Sofía Castro',
    returnDate: '2026-10-27',
    status: 'en_prestamo',
  },
];