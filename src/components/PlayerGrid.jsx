import React from 'react';
import PropTypes from 'prop-types';
import { PlayerCard } from './PlayerCard';

export function PlayerGrid({ players, onDeletePlayer, showRanks = false }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {players.map((player, index) => (
        <PlayerCard
          key={player.id}
          player={player}
          onDelete={onDeletePlayer}
          rank={showRanks ? index + 1 : undefined}
        />
      ))}
    </div>
  );
}

PlayerGrid.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  onDeletePlayer: PropTypes.func.isRequired,
  showRanks: PropTypes.bool
};