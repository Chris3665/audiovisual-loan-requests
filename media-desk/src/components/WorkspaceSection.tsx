import React from 'react';

export interface WorkspaceSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const WorkspaceSection: React.FC<WorkspaceSectionProps> = ({
  title,
  subtitle = 'Sección general del panel MediaDesk',
  children,
}) => {
  return (
    <section className="workspace-section">
      <header className="workspace-header">
        <h2>{title}</h2>
        <p className="workspace-subtitle">{subtitle}</p>
      </header>
      <div className="workspace-body">{children}</div>
    </section>
  );
};