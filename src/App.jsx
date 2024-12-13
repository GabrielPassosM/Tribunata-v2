import React, { useState, useEffect } from 'react';
import { PlayerForm } from './components/PlayerForm';
import { PlayerGrid } from './components/PlayerGrid';
import { SortControls } from './components/SortControls';
import { StatsForm } from './components/StatsForm';
import { MenuSelector } from './components/MenuSelector';
import { sortPlayers } from './utils/sortPlayers';
import { apiFetchPlayers, apiCreatePlayer, apiDeletePlayer, apiIncrementPlayerStats } from './apiService';

function App() {
  const [players, setPlayers] = useState([]);
  const [sortCategory, setSortCategory] = useState('none');
  const [activeMenu, setActiveMenu] = useState('add');

  useEffect(() => {
    apiFetchPlayers()
      .then((data) => setPlayers(data))
  }, [])

  const handleAddPlayer = async (playerInfo) => {
    const player = await apiCreatePlayer(playerInfo)
    setPlayers(prev => [...prev, player]);
  };

  const handleDeletePlayer = async (id) => {
    await apiDeletePlayer(id)
    setPlayers(prev => prev.filter(player => player.id !== id));
  };

  const handleUpdateStats = async ({ playerId, stats }) => {
    const playerUpdated = await apiIncrementPlayerStats(playerId, stats)
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerUpdated.id ? playerUpdated : player
      )
    );
  };

  const sortedPlayers = sortPlayers(players, sortCategory);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <img src='/images/tribulogo.png' alt='logo do site' style={{width: "6rem"}}/>
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Tribunata Team Manager
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <MenuSelector activeMenu={activeMenu} onMenuChange={setActiveMenu} />
            {activeMenu === 'add' ? (
              <PlayerForm onAddPlayer={handleAddPlayer} />
            ) : (
              <StatsForm players={players} onUpdateStats={handleUpdateStats} />
            )}
          </div>
          
          <div className="lg:w-2/3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Jogadores do Time</h2>
              <SortControls
                onSortChange={setSortCategory}
                currentSort={sortCategory}
              />
            </div>
            
            {players.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-gray-600">Nenhum jogador adicionado ainda. Adicione seu primeiro jogador!</p>
              </div>
            ) : (
              <PlayerGrid
                players={sortedPlayers}
                onDeletePlayer={handleDeletePlayer}
                showRanks={sortCategory !== 'none'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;