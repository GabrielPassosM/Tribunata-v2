import React from "react";
import { Frown } from 'lucide-react';

const ErrorPage = ({ onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="flex justify-center items-center text-red-500 mb-4">
          <Frown className="w-12 h-12" />
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Ops!
        </h1>
        <p className="text-gray-600 mb-6">
          Estamos enfrentando problemas para carregar o site. Por favor, tente novamente mais tarde.
        </p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
