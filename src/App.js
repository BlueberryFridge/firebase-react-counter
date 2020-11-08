import './App.css';
import React, {useState, useEffect} from 'react';
import firebase from './firebase';
import mailgun from 'mailgun-js';

//----------------------------------------------------------------- APP COMPONENT ----------------------------------------------------------//
function App() {
  const currentCount = useCount();

  return (
    <div className="App" style={{marginTop: 50}}>
      <h1 style={{height: 50}}>{currentCount}</h1>
      <button style={{marginRight: 10}} onClick={() => handleClick('dec', currentCount)}>-</button>
      <button style={{marginRight: 10}} onClick={() => handleClick('inc', currentCount)}>+</button>
      <button onClick={() => handleClick('reset', null)}>Reset</button>
    </div>
  );
}

const doc = firebase.firestore().collection('counter').doc('count');

//---------------------------------------- RETRIEVES CURRENT COUNT FROM FIRESTORE (CUSTOM HOOK) ----------------------------------------//
const useCount = () => {
  const [count, setCount] = useState(null);                                                                                     
  const mg = mailgun({ apiKey: process.env.REACT_APP_MAILGUN_API_KEY, domain: process.env.REACT_APP_MAILGUN_DOMAIN });      // SETS UP MAILGUN

  useEffect(() => doc.onSnapshot(doc => {                                                                                   // LISTENS TO DATABASE CHANGES
                      const currentVal = doc.data().current;
                      setCount(currentVal);
                      if(currentVal % 10 === 0) {
                        const data = { from: 'fb-react-counter@janinelapiz.com',                                            // PROPS OF EMAIL
                                        to: 'blueberry_fridge@yahoo.com.au',
                                        subject: 'Firebase Counter Alert',
                                        html: `<h1>Your current count is a multiple of 10!</h1>
                                              <hr>
                                              <p>Current Count: ${currentVal}</p>`
                                      };
                        mg.messages().send(data, function (error, body) {                                                   // SENDS EMAIL
                          console.log(body);
                        });
						alert('Number is multiple of 10! An email has been sent to the maker of this app. :3');                         // POPS UP ALERT WHEN COUNT IS MULTIPLE OF 10

                      }
                    }), []);
  return count;
}

//--------------------------------------------------- HANDLES BUTTONS -----------------------------------------------------------------//
const handleClick = (countType, prevVal) => {
  const handleCount = value => doc.update({current: value})

  switch(countType) {
    case 'inc':
      handleCount(prevVal + 1);
      break;
    case 'dec':
      handleCount(prevVal - 1);
      break;
    case 'reset':
      handleCount(0);
      break;
    default:
      break;
  }
}

export default App;
