import React from 'react';
import AimTraining from './components/AimTraining';
import Terms from '../General_Components/Terms';
import HiddenBerkeley
 from '../General_Components/NavBar';
function Game() {
  return (
    <div className="fondo text-white body">
      <HiddenBerkeley />
        <div className="pt-5">
          <AimTraining />
        </div>
        <hr/>
      <Terms />
    </div>
  );
}

export default Game;
