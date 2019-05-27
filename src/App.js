import React, {useState, useContext, useReducer} from 'react';
import { TextArea } from 'semantic-ui-react';

import InputData from './context/';
import InputDataReducer from './reducer/';

export default function App(){

    const inputData = useContext(InputData);
    const [state, dispatch] = useReducer(InputDataReducer, inputData);
    
    //Message
    const [message, SetMessage] = useState("");

    // const hiddenChar = "#";

    const OnChange = () => {
        //Check if Input Text is empty
        // if(inputText === ''){
        //     SetMessage("Input text is empty")
        //     return;
        // }


        //Transfer the text
        
    }

    const OnReset = () => {

    }

    const OnTest = () => {

    }

    return (
        <InputData.Provider>
            <div className="ui container">
                <div className="mt-3">
                    <h1 className="word">LÜCKENTEXT MAKER v.0.2 <a href="mywebsite" className="ui small circular left floated image"><img src="assets/images/Melancholie_logo.png" alt="melancholie the lab luckentext maker"/></a></h1>
                    <h4 className="ui header"><a href="https://en.wikipedia.org/wiki/Cloze_test">What is Lückentext / Cloze test?</a></h4>
                </div>

                <div className="ui form mt-3">
                    <div class="ui medium buttons">
                        <button className="ui green button" name="ChangeBtn" onClick={() => OnChange()}>Change</button>
                        <button className="ui red button"   name="ClearBtn" onClick={() => OnReset()}>Clear</button>
                        <button className="ui blue button"  name="TestBtn" onClick={() => OnTest()}>Test</button>
                    </div>
                    {/* <h1 className="ui red header">{message}</h1> */}

                    <div className="field">
                        <TextArea 
                            name="textArea" autoHeight
                            placeholder={'Put your text here'}
                        />
                    </div>
                </div>     
            </div>
        </InputData.Provider>
    );
}