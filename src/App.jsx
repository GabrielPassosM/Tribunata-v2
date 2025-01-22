import React, { useState, useEffect } from 'react';
import { PlayerForm } from './components/PlayerForm';
import { PlayerGrid } from './components/PlayerGrid';
import { SortControls } from './components/SortControls';
import { StatsForm } from './components/StatsForm';
import { MenuSelector } from './components/MenuSelector';
import { FeedbackModal } from './components/FeedbackModal';
import { sortPlayers } from './utils/sortPlayers';
import Loading from './components/Loading/Loading.jsx';
import ErrorPage from "./components/ErrorPage";
import { LoginModal } from './components/LoginModal';
import { LogIn, LogOut } from 'lucide-react';
import { apiFetchPlayers, apiCreatePlayer, apiDeletePlayer, apiIncrementPlayerStats, checkDatabaseStatus } from './apiService';

function App() {
  const [players, setPlayers] = useState([]);
  const [sortCategory, setSortCategory] = useState('none');
  const [activeMenu, setActiveMenu] = useState('add');
  const [feedbackModal, setFeedbackModal] = useState({ isOpen: false, type: 'success', message: '' });
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);
  const [maxDbRetriesExceeded, setMaxDbRetriesExceeded] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let attempts = 0;

    const maxRetries = import.meta.env.VITE_MAX_DB_RETRIES;
    const retrySleepTime = import.meta.env.VITE_RETRY_SLEEP_TIME;
  
    const waitForDatabase = async () => {
      while (isMounted && attempts < maxRetries) {
        attempts++;
        const status = await checkDatabaseStatus();
        if (status === "ready") {
          setIsDatabaseReady(true);
          return;
        } else {
          await new Promise(resolve => setTimeout(resolve, retrySleepTime));
        }
      }

      if (isMounted && attempts >= maxRetries) {
        setMaxDbRetriesExceeded(true);
      }
    };
  
    waitForDatabase();
  
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    apiFetchPlayers()
      .then((data) => setPlayers(data))
      .catch((error) => {
        setFeedbackModal({
          isOpen: true,
          type: 'error',
          message: error.message
        })
      })
  }, [])

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddPlayer = async (playerInfo) => {
    try {
      const player = await apiCreatePlayer(playerInfo)
      setFeedbackModal({
        isOpen: true,
        type: 'success',
        message: `Jogador ${player.name} adicionado com sucesso!`
      })
      setPlayers(prev => [...prev, player])
    } catch(error) {
      setFeedbackModal({
        isOpen: true,
        type: 'error',
        message: error.message
      })
    }
  };

  const handleDeletePlayer = async (id, name) => {
    try {
      await apiDeletePlayer(id)
      setFeedbackModal({
        isOpen: true,
        type: 'success',
        message: `Jogador ${name} deletado com sucesso!`
      })
      setPlayers(prev => prev.filter(player => player.id !== id));
    } catch(error) {
      setFeedbackModal({
        isOpen: true,
        type: 'error',
        message: error.message
      })
    }
  };

  const handleUpdateStats = async ({ playerId, stats }) => {
    try {
      const playerUpdated = await apiIncrementPlayerStats(playerId, stats)
      setFeedbackModal({
        isOpen: true,
        type: 'success',
        message: `Estatísticas do jogador atualizadas com sucesso!`
      })
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.id === playerUpdated.id ? playerUpdated : player
        )
      )
    } catch(error) {
      setFeedbackModal({
        isOpen: true,
        type: 'error',
        message: error.message
      })
    }
  };

  const sortedPlayers = sortPlayers(players, sortCategory);

  
  if (maxDbRetriesExceeded) {
    return <ErrorPage onRetry={() => window.location.reload()} />;
  } else if (!isDatabaseReady) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <img src='/images/tribulogo.png' alt='logo do site' style={{width: "6rem"}}/>
            <h1 className="text-4xl font-bold text-gray-800 text-center">
              Tribunata Team Manager
            </h1>
          </div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                Logado como <span className="font-medium">{user.email}</span>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sair</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </button>
          )}
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
      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        onClose={() => setFeedbackModal(prev => ({ ...prev, isOpen: false }))}
        type={feedbackModal.type}
        message={feedbackModal.message}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;