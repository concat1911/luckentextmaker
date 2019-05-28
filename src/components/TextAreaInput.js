import React, {useContext, useState} from 'react';
import { TextArea } from 'semantic-ui-react';

import InputData from '../context/index';

export default function TextAreaInput (){
    
    const {dispatch} = useContext(InputData);
    const [textArea, SetTextArea] = useState('');

    const OnChange = () => {
        //Debug.log
    }

    return (
        <div className="ui form mt-3">
            <div class="ui medium buttons">
                <button className="ui green button" name="ChangeBtn" onClick={() => OnChange}>Change</button>
                <button className="ui red button"   name="ClearBtn"  onClick={() => SetTextArea('')}>Clear</button>
                <button className="ui blue button"  name="TestBtn"  >Test</button>
            </div>
            {/* <h1 className="ui red header">{message}</h1> */}

            <div className="field">
                <TextArea
                    name="textArea" autoHeight
                    placeholder={'Put your text here'}
                    onChange={(event) => SetTextArea(event.target.value)}
                    value={textArea}
                />
            </div>
        </div>     
    );
}