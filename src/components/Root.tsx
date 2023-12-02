import React from 'react';

const Root: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <div style={{ backgroundColor: '#87CEEB', padding: '20px', borderRadius: '10px', display: 'inline-block' }}>
        <h1 style={{ fontSize: '10rem', margin: '0', color: '#FFF' }}>RUMEEZ</h1>
      </div>
      <div style={{ backgroundColor: '#FFD700', padding: '20px', borderRadius: '10px', marginTop: '10px' }}>
        <p style={{ fontSize: '1.5rem', margin: '0' }}>Find your perfect UCLA roommate!</p>
      </div>
    </div>
  );
};

export default Root;
