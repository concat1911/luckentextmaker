import {random} from 'lodash';

export default function  textTransfer (text, luckenRate) {
    //split text into smaller array
    let holder = text.split('');

    //Check character if a letter
    const isLetter = (c) => {
        var objRegExp  = /^[a-z\u00C0-\u00ff]+$/;
        return objRegExp.test(c);
    }

    for (let i = 0; i < holder.length; i++){
        if((i === (holder.length-1) || holder[i] === ' ') && random(1, true) <= luckenRate){
            //Check if a letter with length > 3
            if(this.isLetter(holder[i - 1]) && this.isLetter(holder[i - 2]) && isLetter(holder[i - 3])){
                for(let index = 0; index < 3; index++){
                    this.updatePos(i - 3 + index);
                    this.updateChar(holder[i - 3 + index]);
                    holder[i - 3 + index] = this.state.hiddenChar;
                }
            }else if(this.isLetter(holder[i - 4]) && this.isLetter(holder[i - 3]) && isLetter(holder[i - 2])){
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