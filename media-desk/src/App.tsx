import React, { useState } from 'react';
import { INITIAL_LOANS } from './data/mockLoans';
import type { FilterProcessState, LoanRequest, SearchCriteria } from './types/loan';
import { WorkspaceSection } from './components/WorkspaceSection';
import { StatusIndicator } from './components/StatusIndicator';
import { SearchForm } from './components/SearchForm';
import { LoanCard } from './components/LoanCard';
import './App.css';

export function App(): React.ReactElement {
  const [loans] = useState<LoanRequest[]>(INITIAL_LOANS);
  const [filteredLoans, setFilteredLoans] = useState<LoanRequest[]>(INITIAL_LOANS);
  const [markedCodes, setMarkedCodes] = useState<string[]>([]);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>(
    new Date().toLocaleTimeString()
  );

  // Firma explícita para recibir criterios desde el formulario hijo
  const handleSearchCriteria = (criteria: SearchCriteria): void => {
    setIsFiltering(true);

    // Transición observable breve (250ms) para evidenciar el cambio en StatusIndicator
    window.setTimeout(() => {
      const normalizedQuery = criteria.query.toLowerCase();

      const results = loans.filter((item) => {
        const matchesQuery =
          normalizedQuery === '' ||
          item.resourceName.toLowerCase().includes(normalizedQuery) ||
          item.requester.toLowerCase().includes(normalizedQuery) ||
          item.code.toLowerCase().includes(normalizedQuery);

        const matchesStatus =
          criteria.statusFilter === 'todos' || item.status === criteria.statusFilter;

        return matchesQuery && matchesStatus;
      });

      setFilteredLoans(results);
      setLastUpdated(new Date().toLocaleTimeString());
      setIsFiltering(false);
    }, 250);
  };

  // Alterna (toggle) la marca de revisión de forma inmutable al pulsar una o dos veces
  const handleToggleReview = (code: string): void => {
    setMarkedCodes((prevCodes) =>
      prevCodes.includes(code)
        ? prevCodes.filter((itemCode) => itemCode !== code)
        : [...prevCodes, code]
    );
  };

  const indicatorState: FilterProcessState = {
    isFiltering,
    totalMatches: filteredLoans.length,
    lastUpdated,
  };

  return (
    <div className="mediadesk-container">
      <header className="main-header">
        <h1>MediaDesk</h1>
        <p>Panel de Préstamo de Equipo Audiovisual — Laboratorio Universitario</p>
      </header>

      {/* Primer uso de WorkspaceSection: agrupa buscador, indicador y resultados */}
      <WorkspaceSection
        title="Consulta y Revisión de Solicitudes"
        subtitle="Filtra por nombre de equipo, estudiante solicitante o estado operativo."
      >
        <SearchForm onSearch={handleSearchCriteria} />

        {/* Uso de StatusIndicator con Function as a Child */}
        <StatusIndicator state={indicatorState}>
          {(currentState) =>
            currentState.isFiltering ? (
              <span className="status-processing">
                ⏳ Procesando criterios y filtrando inventario audiovisual...
              </span>
            ) : (
              <span className="status-ready">
                ✅ Lista disponible: <strong>{currentState.totalMatches}</strong>{' '}
                {currentState.totalMatches === 1 ? 'resultado encontrado' : 'resultados encontrados'}{' '}
                (Actualizado a las {currentState.lastUpdated})
              </span>
            )
          }
        </StatusIndicator>

        <div className="results-counter-banner">
          <span>Mostrando {filteredLoans.length} de {loans.length} solicitudes registradas</span>
          <span>Marcadas para revisión: <strong>{markedCodes.length}</strong></span>
        </div>

        {filteredLoans.length === 0 ? (
          <div className="empty-results">
            <p>No se encontraron solicitudes que coincidan con los criterios de búsqueda.</p>
          </div>
        ) : (
          <div className="loans-grid">
            {filteredLoans.map((loan, index) => {
              const isMarked = markedCodes.includes(loan.code);

              // Comprobación del Paso 3:
              // El primer elemento (index === 0) omite las props opcionales 'density' y 'secondaryTag'
              // para demostrar que toma los valores predeterminados ('normal' e 'Inventario Estándar').
              // Los demás elementos proporcionan explícitamente las props opcionales.
              if (index === 0) {
                return (
                  <LoanCard
                    key={loan.code}
                    loan={loan}
                    isMarkedForReview={isMarked}
                    onToggleReview={handleToggleReview}
                  />
                );
              }

              return (
                <LoanCard
                  key={loan.code}
                  loan={loan}
                  isMarkedForReview={isMarked}
                  onToggleReview={handleToggleReview}
                  density="compacta"
                  secondaryTag="Verificación Prioritaria"
                />
              );
            })}
          </div>
        )}
      </WorkspaceSection>

      {/* Segundo uso de WorkspaceSection con contenido distinto (Resumen y Guía) */}
      <WorkspaceSection
        title="Resumen de Revisión y Guía Rápida del Laboratorio"
        subtitle="Panel informativo independiente compuesto mediante React.ReactNode"
      >
        <div className="help-summary-block">
          <p>
            <strong>Solicitudes marcadas actualmente ({markedCodes.length}):</strong>{' '}
            {markedCodes.length > 0 ? markedCodes.join(', ') : 'Ninguna seleccionada.'}
          </p>
          <ul>
            <li>
              <strong>Fechas ausentes:</strong> Las solicitudes en estado <em>Pendiente</em> pueden
              no tener fecha de devolución confirmada hasta su aprobación en ventanilla.
            </li>
            <li>
              <strong>Acción de revisión:</strong> Pulsar el botón en una tarjeta alterna su marca en
              la colección de seguimiento sin alterar el registro original.
            </li>
          </ul>
        </div>
      </WorkspaceSection>
    </div>
  );
}

export default App;