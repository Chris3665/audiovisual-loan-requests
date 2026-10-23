import React from 'react';
import type { CardDensity, LoanRequest, LoanStatus } from '../types/loan';

export interface LoanCardProps {
  loan: LoanRequest; // Prop principal requerida
  isMarkedForReview: boolean;
  onToggleReview: (code: string) => void;
  density?: CardDensity; // Prop opcional con valor por defecto
  secondaryTag?: string; // Prop opcional secundaria con valor por defecto
}

const STATUS_LABELS: Record<LoanStatus, string> = {
  pendiente: 'Pendiente de aprobación',
  aprobado: 'Aprobado para retiro',
  en_prestamo: 'En préstamo activo',
  devuelto: 'Devuelto al laboratorio',
};

export const LoanCard: React.FC<LoanCardProps> = ({
  loan,
  isMarkedForReview,
  onToggleReview,
  density = 'normal',
  secondaryTag = 'Inventario Estándar',
}) => {
  const handleReviewClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    onToggleReview(loan.code);
  };

  return (
    <article
      className={`loan-card density-${density} ${isMarkedForReview ? 'marked-review' : ''}`}
    >
      <div className="loan-card-header">
        <span className="loan-code">{loan.code}</span>
        <span className="secondary-tag">{secondaryTag}</span>
        <span className={`status-badge status-${loan.status}`}>
          {STATUS_LABELS[loan.status]}
        </span>
      </div>

      <h3 className="loan-title">{loan.resourceName}</h3>

      <div className="loan-details">
        <p>
          <strong>Solicitante:</strong> {loan.requester}
        </p>
        <p>
          <strong>Categoría:</strong> {loan.category}
        </p>
        <p>
          <strong>Fecha de devolución:</strong>{' '}
          {loan.returnDate !== null ? (
            loan.returnDate
          ) : (
            <em className="missing-date">Sin fecha confirmada</em>
          )}
        </p>
      </div>

      <div className="loan-card-actions">
        <button
          type="button"
          onClick={handleReviewClick}
          className={`btn-review ${isMarkedForReview ? 'active' : ''}`}
        >
          {isMarkedForReview ? '✓ Marcada para revisión' : 'Marcar para revisión'}
        </button>
      </div>
    </article>
  );
};