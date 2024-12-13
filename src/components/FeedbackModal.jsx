import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, XCircle, X } from 'lucide-react';

export function FeedbackModal({ isOpen, onClose, type, message }) {
  if (!isOpen) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            {isSuccess ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <XCircle className="w-6 h-6 text-red-500" />
            )}
            <h3 className={`text-lg font-semibold ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
              {isSuccess ? 'Sucesso!' : 'Erro'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 text-white rounded-md transition-colors ${
              isSuccess ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

FeedbackModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  message: PropTypes.string.isRequired
};