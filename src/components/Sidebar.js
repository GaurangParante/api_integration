import React from "react";

function Sidebar(){
    return(
       <div style={{ width: '200px', backgroundColor: '#2c3e50', color: 'white', padding: '1rem' }}>
      <h2>Dashboard</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>Overview</li>
        <li>Reports</li>
        <li>Settings</li>
      </ul>
    </div>
    );

}

export default Sidebar;