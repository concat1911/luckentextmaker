import React from 'react';
import { TextArea } from 'semantic-ui-react';

export default function TextAreaInput (){
    
    return (
        <div className="ui form mt-3">
        <div class="ui medium buttons">
            <button className="ui green button" name="ChangeBtn" >Change</button>
            <button className="ui red button"   name="ClearBtn" >Clear</button>
            <button className="ui blue button"  name="TestBtn" >Test</button>
        </div>
        {/* <h1 className="ui red header">{message}</h1> */}

        <div className="field">
            <TextArea 
                name="textArea" autoHeight
                placeholder={'Put your text here'}
            />
        </div>
    </div>     
    );
}