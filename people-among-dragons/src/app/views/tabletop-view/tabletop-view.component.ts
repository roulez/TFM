import { Component, OnInit } from '@angular/core';
import { TabletopMessages } from 'src/models/tabletop-messages';

@Component({
  selector: 'app-tabletop-view',
  templateUrl: './tabletop-view.component.html',
  styleUrls: ['./tabletop-view.component.css']
})
export class TabletopViewComponent implements OnInit {
  _numberOfRolls: number = 1;
  _campaignName: string = "Test";
  _sendPrivateMessage: boolean = false;
  _chatMessages: Array<TabletopMessages> = [];
  _userMessage: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  rollDice(diceSides: number): void {
    if(this._numberOfRolls > 0) {
      var rollResults = new Array<number>();
      for (let i = 0; i < this._numberOfRolls; i++)
        rollResults.push(this.generateRandomNumber(1, diceSides));

      var result = "You rolled a " + this.getRollResultsAsString(rollResults);
      var resultMessage = new TabletopMessages(result,this._sendPrivateMessage, "TestUser");
      this._chatMessages.push(resultMessage);
    }   
  }

  generateRandomNumber(minimunNumber: number, maximunNumber: number): number {
    return Math.floor(Math.random() * (maximunNumber - minimunNumber + 1) + minimunNumber);
  }

  sendMessage(): void {
    if(this._userMessage !== "") {
      var chatMessage = new TabletopMessages(this._userMessage, this._sendPrivateMessage, "TestUser");
      this._userMessage = "";
      this._chatMessages.push(chatMessage);
    }     
  }

  getRollResultsAsString(rollResults: Array<number>): string {
    var rollText = "(";
    for (let i = 0; i < rollResults.length; i++) {
      if(i !== 0)
        rollText += ",";
      rollText += rollResults[i];
    }
      
    rollText += ")";
    return rollText;
  }

}
