import React from 'react';
import PropTypes from 'prop-types';
import { Trophy, Goal, Award, AlertTriangle, AlertOctagon } from 'lucide-react';

export function PlayerStats({ goals, assists, mvpPoints, yellowCards, redCards }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-1 gap-2 mt-4 border-t pt-4">
      <div className="flex items-center gap-2 text-gray-600">
        <Goal className="w-4 h-4 text-green-600" />
        <span>Gols: {goals}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Trophy className="w-4 h-4 text-blue-600" />
        <span>Assistências: {assists}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Award className="w-4 h-4 text-yellow-600" />
        <span>MVP: {mvpPoints}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <AlertTriangle className="w-4 h-4 text-yellow-500" />
        <span>Amarelos: {yellowCards}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <AlertOctagon className="w-4 h-4 text-red-600" />
        <span>Vermelhos: {redCards}</span>
      </div>
    </div>
  );
}

PlayerStats.propTypes = {
  goals: PropTypes.number.isRequired,
  assists: PropTypes.number.isRequired,
  mvpPoints: PropTypes.number.isRequired,
  yellowCards: PropTypes.number.isRequired,
  redCards: PropTypes.number.isRequired
};