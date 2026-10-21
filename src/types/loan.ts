// Estados estrictos permitidos para una solicitud
export type LoanStatus = 'pendiente' | 'aprobado' | 'en_prestamo' | 'devuelto';

// Categorías de equipo audiovisual
export type EquipmentCategory = 'Camaras' | 'Audio' | 'Iluminacion' | 'Proyeccion';

// Variantes visuales para comprobar props opcionales y valores por defecto
export type CardDensity = 'normal' | 'compacta';

// Modelo principal de la solicitud de préstamo
export interface LoanRequest {
  code: string;
  resourceName: string;
  category: EquipmentCategory;
  requester: string;
  returnDate: string | null; // null representa explícitamente una fecha no confirmada
  status: LoanStatus;
}

// Criterios de búsqueda emitidos por el formulario hacia el padre
export interface SearchCriteria {
  query: string;
  statusFilter: LoanStatus | 'todos';
}

// Estado consumido por la función hija del indicador
export interface FilterProcessState {
  isFiltering: boolean;
  totalMatches: number;
  lastUpdated: string;
}