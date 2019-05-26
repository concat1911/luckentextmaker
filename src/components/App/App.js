import React, {useState} from 'react';
import { TextArea } from 'semantic-ui-react';

export default function App(){

    const [originalText, SetOriText] = useState("");
    const [inputText, SetInputText] = useState("");

    const OnStart = () => {
        SetOriText(inputText);
    }

    return (
        <div className="ui container">
            <div className="mt-3">
                <h1 className="word">LÜCKENTEXT MAKER v.0.2 <a href="mywebsite" className="ui small circular left floated image"><img src="assets/images/Melancholie_logo.png" alt="melancholie the lab luckentext maker"/></a></h1>
                <h4 className="ui header"><a href="https://en.wikipedia.org/wiki/Cloze_test">What is Lückentext / Cloze test?</a></h4>
            </div>

            <div className="ui form mt-3">
                <button className="ui red button" name="Start" >Start</button>
                <div className="field">
                    <TextArea 
                        name="textArea" autoHeight
                        placeholder={'Put your text here'}
                        onChange={(event) => SetInputText(event.target.value)}
                    />
                </div>
            </div>     
        </div>
    );
}