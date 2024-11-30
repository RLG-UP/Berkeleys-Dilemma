import React, { useState } from 'react';
import { useBerkeleysContext, stateTop } from '../../../src/context/DirectoryProvider';
var first = true;

function TopPlayersTable() {
  const {state, dispatch} = useBerkeleysContext();
  const [limit, setLimit] = useState(5);

  console.log("*#*#*#*#*#*#");
  console.log(state.topUsers);
  
  if(first){
    stateTop(dispatch);
    first = false;
  }

  const users = Object.values(state.topUsers);

  const handleFilter = (filter) => {
    stateTop(dispatch);
    setLimit(filter);
  };

  const displayedUsers = limit === 'all' ? users : users.slice(0, limit);

  return (
    <div className="retro_container">
      <h1 className="retro_title">🏆 Top Players 🏆</h1>
      <div className="button_group">
        <button onClick={() => handleFilter(3)} className="retro_button">Top 3</button>
        <button onClick={() => handleFilter(5)} className="retro_button">Top 5</button>
        <button onClick={() => handleFilter('all')} className="retro_button">All Players</button>
      </div>
      <table className="retro_table">
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.bestScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopPlayersTable;
