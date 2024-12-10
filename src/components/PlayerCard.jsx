import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Hash, Activity, Trash2 } from 'lucide-react';
import { PlayerStats } from './PlayerStats';
import { ConfirmationModal } from './ConfirmationModal';

export function PlayerCard({ player, onDelete, rank }) {
  const [showModal, setShowModal] = useState(false);

  const getPositionInPortuguese = (position) => {
    const positions = {
      'goalkeeper': 'Goleiro',
      'defender': 'Zagueiro',
      'midfielder': 'Meio-campo',
      'forward': 'Atacante'
    };
    return positions[position] || position;
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <div className="relative">
          <img
            src={player.image_url}
            alt={player.name}
            className="w-full h-48 object-cover"
          />
          {rank && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
              #{rank}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{player.name}</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Hash className="w-4 h-4" />
              <span>{player.shirt_number}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Activity className="w-4 h-4" />
              <span>{getPositionInPortuguese(player.position)}</span>
            </div>
          </div>
          
          <PlayerStats
            goals={player.goals}
            assists={player.assists}
            mvpPoints={player.mvps}
            yellowCards={player.yellow_cards}
            redCards={player.red_cards}
          />

          <button
            onClick={() => setShowModal(true)}
            className="mt-4 w-8 h-8 mx-auto flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
            aria-label="Remover Jogador"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => onDelete(player.id)}
        playerName={player.name}
      />
    </>
  );
}

PlayerCard.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    goals: PropTypes.number.isRequired,
    assists: PropTypes.number.isRequired,
    mvpPoints: PropTypes.number.isRequired,
    yellowCards: PropTypes.number.isRequired,
    redCards: PropTypes.number.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  rank: PropTypes.number
};