import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { LuImage } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emojiObject) => {
    onSelect(emojiObject.emoji);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Icon Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
      >
        <span className="text-xl">
          {icon || <LuImage />}
        </span>
        <span className="text-sm text-gray-600">
          Pick icon
        </span>
      </button>

      {/* Popup */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Emoji Picker */}
          <div className="absolute top-12 left-0 z-50">
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-2 -right-2 z-10 w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-gray-700 transition-colors shadow-lg"
              >
                ×
              </button>
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                width={350}
                height={400}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmojiPickerPopup;