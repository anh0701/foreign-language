const LetterBox = ({ char, isUsed, onClick }) => {
  return (
    <div 
      className={`letter ${isUsed ? 'used' : ''}`} 
      onClick={onClick}
      style={{ 
        cursor: isUsed ? 'not-allowed' : 'pointer',
        opacity: isUsed ? 0.5 : 1 
      }}
    >
      {char}
    </div>
  );
};

export default LetterBox;