import React from 'react';
import PropTypes from 'prop-types';
import { UserPlus, LineChart } from 'lucide-react';

export function MenuSelector({ activeMenu, onMenuChange }) {
  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => onMenuChange('add')}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          activeMenu === 'add'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <UserPlus className="w-5 h-5" />
        <span>Adicionar Jogador</span>
      </button>
      <button
        onClick={() => onMenuChange('stats')}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          activeMenu === 'stats'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <LineChart className="w-5 h-5" />
        <span>Atualizar Estatísticas</span>
      </button>
    </div>
  );
}

MenuSelector.propTypes = {
  activeMenu: PropTypes.oneOf(['add', 'stats']).isRequired,
  onMenuChange: PropTypes.func.isRequired
};