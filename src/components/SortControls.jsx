import React from 'react';
import PropTypes from 'prop-types';

export function SortControls({ onSortChange, currentSort }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="text-gray-700 font-medium">Classificar por:</span>
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
      >
        <option value="none">Sem classificação</option>
        <option value="goals">Gols</option>
        <option value="assists">Assistências</option>
        <option value="mvps">Pontos MVP</option>
        <option value="yellow_cards">Cartões Amarelos</option>
        <option value="red_cards">Cartões Vermelhos</option>
      </select>
    </div>
  );
}

SortControls.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  currentSort: PropTypes.oneOf(['none', 'goals', 'assists', 'mvps', 'yellow_cards', 'red_cards']).isRequired
};