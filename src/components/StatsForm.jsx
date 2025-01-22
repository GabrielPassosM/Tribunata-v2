import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LineChart } from 'lucide-react';

export function StatsForm({ players, onUpdateStats }) {
  const [formData, setFormData] = useState({
    playerId: '',
    goals: '0',
    assists: '0',
    mvpPoints: '0',
    yellowCards: '0',
    redCards: '0',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStats({
      playerId: formData.playerId,
      stats: {
        goals: parseInt(formData.goals),
        assists: parseInt(formData.assists),
        mvps: parseInt(formData.mvpPoints),
        yellow_cards: parseInt(formData.yellowCards),
        red_cards: parseInt(formData.redCards),
      },
    });
    setFormData({
      playerId: '',
      goals: '0',
      assists: '0',
      mvpPoints: '0',
      yellowCards: '0',
      redCards: '0',
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
      <div className="flex items-center gap-2 mb-6">
        <LineChart className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Adicionar Estatísticas</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Jogador</label>
          <select
            name="playerId"
            value={formData.playerId}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          >
            <option value="">Selecione o jogador</option>
            {players.map(player => (
              <option key={player.id} value={player.id}>
                {player.name} (#{player.shirt_number})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{"Gols (+)"}</label>
            <input
              type="number"
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              min="0"
              max="10000"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{"Assistências (+)"}</label>
            <input
              type="number"
              name="assists"
              value={formData.assists}
              onChange={handleChange}
              min="0"
              max="10000"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{"Pontos de MVP (+)"}</label>
            <input
              type="number"
              name="mvpPoints"
              value={formData.mvpPoints}
              onChange={handleChange}
              min="0"
              max="10000"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{"Cartões Amarelos (+)"}</label>
            <input
              type="number"
              name="yellowCards"
              value={formData.yellowCards}
              onChange={handleChange}
              min="0"
              max="10000"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{"Cartões Vermelhos (+)"}</label>
            <input
              type="number"
              name="redCards"
              value={formData.redCards}
              onChange={handleChange}
              min="0"
              max="10000"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Adicionar Estatísticas
        </button>
      </div>
    </form>
  );
}

StatsForm.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
  })).isRequired,
  onUpdateStats: PropTypes.func.isRequired
};