import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/get_prices', {mode:'cors'})
    .then(res => res.json())
    .then(data => {
      data.prices.forEach(e => { //joku nopee homma et kaikki date stringit läpi ettei oo nii surkeit
        var start = e.startDate;
        var end = e.endDate;
        start = start.slice(0,16);
        start = start.replace("T", " ");
        end = end.slice(0,16);
        end = end.replace("T", " ");
        e.startDate = start;
        e.endDate = end;
      });
      setData(data.prices); 
      console.log(data);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div style={{margin:'auto', width:"90%"}}>
    <Table striped bordered hover size="sm" style={{margin:'auto',textAlign:'center',width:'80%'}}>
      <thead>
        <tr>
          <th>Time</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
          {data.map((item, index) => (
            <>
            <tr>
              <td key={index}>{item.startDate} - {item.endDate}</td>
              <td key={index}>{item.price}</td>
            </tr>
            </>
          ))}
      </tbody>
    </Table>
    </div>
  );
}

export default App;