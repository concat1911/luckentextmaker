import React, { Component } from 'react';
import './App.css';
import {random} from 'lodash';
import { Button, Modal, TextArea } from 'semantic-ui-react';

import Buttons from '../Buttons';

class App extends Component {

    state = {
        originalText: '',
        textArea: '',
        luckenRate: 0.35,
        luckenPos: [],
        luckenChar: [],
        hiddenChar: '#',
        isHardMode: false,
        isDoingTest: false,
        message: '',
        time: 0,
        numsOfLucken: 0,
        numsOfFail: 0,
        modalOpen: false,
    }
    // MODAL
    handleOpen = () => this.setState({ modalOpen: true });
    handleClose = () => this.setState({ modalOpen: false });

    luckenMaker = () => {
        this.soundButtonClick();
        let { originalText, textArea } = this.state;

        //Reset 
        this.setState({
            luckenChar: [],
            luckenPos: [],
            numsOfLucken: 0,
        }, () => {
            //Check TextArea is empty or not
            if(textArea !== ''){
                if(originalText === ''){
                    originalText = textArea;
                }
                
                textArea = this.textTransfer(originalText);

                //UPDATE
                this.setState({
                    originalText,
                    textArea,
                    numsOfLucken: this.state.luckenChar.length,
                })

            }else{
                this.sendMessage('TextArea is empty. Let fill it!');
            }
        });
    }

    textTransfer = (text) => {
        //split text into smaller array
        let holder = text.split('');

        for (let i = 0; i < holder.length; i++){
            if((i === (holder.length-1) || holder[i] === ' ') && random(1, true) <= this.state.luckenRate){
                //Check if a letter with length > 3
                if(this.isLetter(holder[i - 1]) && this.isLetter(holder[i - 2]) && this.isLetter(holder[i - 3])){
                    for(let index = 0; index < 3; index++){
                        this.updatePos(i - 3 + index);
                        this.updateChar(holder[i - 3 + index]);
                        holder[i - 3 + index] = this.state.hiddenChar;
                    }
                }else if(this.isLetter(holder[i - 4]) && this.isLetter(holder[i - 3]) && this.isLetter(holder[i - 2])){
                    for(let index = 0; index < 3; index++){
                        this.updatePos(i - 4 + index);
                        this.updateChar(holder[i - 4 + index]);
                        holder[i - 4 + index] = this.state.hiddenChar;
                    }
                }
            }
        }

        return holder.join('');
    }

    //SEND MESSAGE 
    sendMessage = (message) => {
        this.setState({ message });
    }

    //Check character if a letter
    isLetter = (c) => {
        var objRegExp  = /^[a-z\u00C0-\u00ff]+$/;
        return objRegExp.test(c);
    }

    updatePos = (pos) => {
        const {luckenPos} = this.state;
        luckenPos.push(pos);
        this.setState({ luckenPos });
    }
    updateChar = (char) => {
        const {luckenChar} = this.state;
        luckenChar.push(char);
        this.setState({ luckenChar });
    }

    reset = () => {
        this.soundButtonClick();

        clearInterval(this.interval); 

        this.setState({
            originalText: '',
            textArea: '',
            luckenPos: [],
            luckenChar: [],
            isDoingTest: false,
            isHardMode: false,
            message: '',
            time: 0,
            numsOfLucken: 0,
            numsOfFail: 0,
            modalOpen: false
        });
    }

    //DOING TEST
    doingTest = () => {
        this.soundButtonClick();
        if(this.state.luckenChar.length !== 0){
            this.setState({
                isDoingTest: true,
                message: 'Click on text panel and then fill the luckens',
            });
    
            //SHOW TIME CLOCK
            this.startTimer();
        }else{
            this.setState({ message: 'Click on Change Button First!'});
        }
    }

    startTimer = () => {
        this.interval = setInterval(() => {
            this.setState(prevState => ({
                time: prevState.time + 1
            }));
        }, 1000);
    }

    handleKeyDown = (event) => {
        if(this.state.isDoingTest){
            //FOR DEBUG
            //console.log(this.state.luckenChar);
            if(this.state.luckenChar[0] === event.key){

                event.preventDefault();

                this.soundRight();
                //Clone
                let luckenChar = [...this.state.luckenChar];
                let luckenPos = [...this.state.luckenPos];
                let textArea = [...this.state.textArea];

                //Replay
                textArea[luckenPos[0]] = luckenChar[0]; 

                //POP
                luckenChar.shift();
                luckenPos.shift();
                
                if(luckenChar.length === 0){
                    //play sound
                    this.soundFinish();
                    //stop time
                    clearInterval(this.interval); 
                    //Show Modal
                    this.setState({ modalOpen: true, isDoingTest: false });
                }else{
                    //Update
                    this.setState({
                        textArea: textArea.join(''),
                        luckenChar,
                        luckenPos
                    });
                }
            }else{
                let numsOfFail = this.state.numsOfFail;
                numsOfFail++;
                this.setState({numsOfFail});
                this.soundWrong();
            }
        }
    }
    
    //Change Mode
    changeMode = () => {
        this.state.isHardMode ? this.setState({ luckenRate : 0.35, isHardMode: false }) : this.setState({ luckenRate : 1, isHardMode: true });
    }

    //Play Sound Effect
    soundButtonClick = () => {
        this.soundClick.play();
    }

    soundRight = () => {
        this.soundCorrect.load();
        this.soundCorrect.play();
    }

    soundWrong = () => {
        this.soundFalse.play();
    }

    soundFinish = () => {
        this.soundFinished.play();
    }

    //GETRATE
    getRate = () => {
        const rate = ((1 - (this.state.numsOfFail / this.state.numsOfLucken))*100).toFixed(2);

        return rate;
    }

    //OnInputChange
    onInputChange = (e) => {
        this.setState({[e.target.name] : e.target.value});       
    }

    render() { 
        return (
            <div className='ui container'>

                <div className="mt-3">
                    <h1 className="word">LÜCKENTEXT MAKER v.0.2 <a href="mywebsite" className="ui small circular left floated image"><img src="assets/images/Melancholie_logo.png" alt="melancholie the lab luckentext maker"/></a></h1>
                    <h4 className="ui header"><a href="https://en.wikipedia.org/wiki/Cloze_test">What is Lückentext / Cloze test?</a></h4>
                </div>

                <div>
                    <h1 className="ui header right floated">NUMS OF LÜCKEN: {this.state.numsOfLucken}</h1>
                    <h1 className="ui header right floated">TIME: {this.state.time}s</h1>
                    <h1 className="ui red header left floated">{this.state.message}</h1>
                    <Button toggle active={this.state.isHardMode} onClick={this.changeMode}>
                        Hard Mode
                    </Button>
                </div>  
                
                <div className="ui form mt-3">
                    <div className="field">
                        <TextArea 
                            readOnly={this.state.isDoingTest ? true : false} 
                            name="textArea" autoHeight value={this.state.textArea}
                            onKeyDown={(event) => this.handleKeyDown(event)}    
                            onChange={(event) => this.onInputChange(event)}
                            placeholder={'Put your text here'}
                        />
                    </div>
                </div>

                <div className="ui container center aligned">
                    <Buttons 
                        isDoingTest={this.state.isDoingTest}
                        luckenMaker={this.luckenMaker}
                        reset={this.reset}
                        doingTest={this.doingTest}
                    />
                </div>

                <audio ref={(soundCorrect) => { this.soundCorrect = soundCorrect; }}>
                    <source src="assets/sounds/soundRight.wav" type="audio/mpeg" ></source>
                </audio>
                <audio ref={(soundFalse) => { this.soundFalse = soundFalse; }}>
                    <source src="assets/sounds/soundWrong.wav" type="audio/mpeg" ></source>
                </audio>
                <audio ref={(soundFinished) => { this.soundFinished = soundFinished; }}>
                    <source src="assets/sounds/soundFinish.wav" type="audio/mpeg" ></source>
                </audio>
                <audio ref={(soundClick) => { this.soundClick = soundClick; }}>
                    <source src="assets/sounds/soundClick.wav" type="audio/mpeg" ></source>
                </audio>

                <Modal
                    open={this.state.modalOpen}
                    closeOnEscape={false}
                    closeOnDimmerClick={false}
                    onClose={this.handleClose}
                >
                    <Modal.Header>WOW! you made it.</Modal.Header>
                    <Modal.Content>
                        <div  className="ui header center aligned">
                            <h1 className="ui huge green header">COMPLETE IN {this.state.time} seconds.</h1>
                            <h1 className="ui small header">Nums of Lücken: {this.state.numsOfLucken}</h1>
                            <h1 className="ui small header">Nums of Fail: {this.state.numsOfFail}</h1>
                            <h1 className="ui small header">Your Rate: {this.getRate()} %</h1>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            onClick={this.reset}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='OK'
                        />
                    </Modal.Actions>
                </Modal>

                <div className="ui header center aligned">
                    <h5>Built with React & love, DD 2019. <a href="http://nhatlinh.de">CONTACT</a></h5>
                </div>
            </div>
        );
    }
}

export default App;