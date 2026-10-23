import React, { useState } from 'react';
import type { LoanStatus, SearchCriteria } from '../types/loan';

export interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<LoanStatus | 'todos'>('todos');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setStatusFilter(event.target.value as LoanStatus | 'todos');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSearch({
      query: query.trim(),
      statusFilter,
    });
  };

  const handleReset = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setQuery('');
    setStatusFilter('todos');
    onSearch({ query: '', statusFilter: 'todos' });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="search-input">Recurso o solicitante:</label>
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Ej. Sony, Ana, Micrófono..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="status-select">Estado de solicitud:</label>
        <select id="status-select" value={statusFilter} onChange={handleStatusChange}>
          <option value="todos">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="aprobado">Aprobado</option>
          <option value="en_prestamo">En préstamo</option>
          <option value="devuelto">Devuelto</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          Consultar solicitudes
        </button>
        <button type="button" onClick={handleReset} className="btn-secondary">
          Limpiar
        </button>
      </div>
    </form>
  );
};