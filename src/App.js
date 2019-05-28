import React, {useState, useContext} from 'react';

//CONTEXT + REDUCER
import InputData from './context/index';
// import InputDataReducer from './reducer/';

//COMPONENTS
import TextAreaInput from './components/TextAreaInput'

export default function App(){

    const inputData = useContext(InputData);
    // const [state, dispatch] = useReducer(InputDataReducer, inputData);
    
    // //Message
    // const [message, SetMessage] = useState("");

    return (
        <InputData.Provider>
            <div className="ui container">
                <div className="mt-3">
                    <h1 className="word">LÜCKENTEXT MAKER v.0.2 <a href="mywebsite" className="ui small circular left floated image"><img src="assets/images/Melancholie_logo.png" alt="melancholie the lab luckentext maker"/></a></h1>
                    <h4 className="ui header"><a href="https://en.wikipedia.org/wiki/Cloze_test">What is Lückentext / Cloze test?</a></h4>
                </div>

                <TextAreaInput></TextAreaInput>
            </div>
        </InputData.Provider>
    );
}