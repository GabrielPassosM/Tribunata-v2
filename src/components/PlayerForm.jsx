import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { UserPlus } from 'lucide-react';

export function PlayerForm({ onAddPlayer }) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    number: '',
    imageUrl: '',
    goals: '0',
    assists: '0',
    mvpPoints: '0',
    yellowCards: '0',
    redCards: '0',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const player = {
      id: crypto.randomUUID(),
      name: formData.name,
      position: formData.position,
      shirt_number: parseInt(formData.number),
      image_url: formData.imageUrl || "/images/avatar-player.png",
      goals: parseInt(formData.goals),
      assists: parseInt(formData.assists),
      mvps: parseInt(formData.mvpPoints),
      yellow_cards: parseInt(formData.yellowCards),
      red_cards: parseInt(formData.redCards),
    };
    onAddPlayer(player);
    setFormData({
      name: '',
      position: '',
      number: '',
      imageUrl: '',
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
        <UserPlus className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Adicionar Novo Jogador</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Posição</label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          >
            <option value="">Selecione a posição</option>
            <option value="Goalkeeper">Goleiro</option>
            <option value="Defender">Defensor</option>
            <option value="Midfielder">Meio-campista</option>
            <option value="Forward">Atacante</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Número</label>
          <input
            type="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
            min="1"
            max="99"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">URL da Imagem (opcional)</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Gols</label>
            <input
              type="number"
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Assistências</label>
            <input
              type="number"
              name="assists"
              value={formData.assists}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Pontos MVP</label>
            <input
              type="number"
              name="mvpPoints"
              value={formData.mvpPoints}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cartões Amarelos</label>
            <input
              type="number"
              name="yellowCards"
              value={formData.yellowCards}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cartões Vermelhos</label>
            <input
              type="number"
              name="redCards"
              value={formData.redCards}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Adicionar Jogador
        </button>
      </div>
    </form>
  );
}

PlayerForm.propTypes = {
  onAddPlayer: PropTypes.func.isRequired
};