
import { Component, OnInit  } from '@angular/core';
import qa from 'src/assets/quiz.json'

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  jsonUrl = 'src/assets/quiz.json';
  data: any;
  recentQU: String;
  recentAS: String[];
  index = 0;
  selectedAnswer;
  userAnswers: String[] = []; 
  grade: Number;
  isDone: boolean;
  state:String;

  constructor() {
    this.data = qa.quiz;
  }
  ngOnInit(){
    this.isDone = false;
    this.recentQU = this.data[this.index].question;
    this.recentAS = this.data[this.index].options;
  }
  radioChangeHandler (e,o) {
    for(let i=0;i<this.data.length;i++)
    {      
      if (this.recentAS[i] == o )
      {
        this.data[this.index].selected = this.recentAS[i];
      } 
    }
    this.selectedAnswer = this.data[this.index].selected;
    this.userAnswers[this.index] = JSON.stringify(this.selectedAnswer);
  }

  Calculate()
  {
    var wrongAnswers=0;
    var pointsPerAnswer = 100/this.data.length; 
    for(let i=0; i<this.data.length; i++)
    {
      var goodAnswer = JSON.stringify(this.data[i].answer)
      if(this.userAnswers[i] !== goodAnswer)
        wrongAnswers++;
    }
    this.grade = 100-(wrongAnswers*pointsPerAnswer)
    this.isDone = true;
  }

  Next()
  {
   this.index += 1;
   this.Jump(this.index);
   this.selectedAnswer = this.data[this.index].selected;
   
  }

  Prev()
  {
    this.isDone = false;
    this.index -= 1;
    this.Jump(this.index);
    this.selectedAnswer = this.data[this.index].selected;
  }

  Jump(i)
  {
    this.recentQU = this.data[i].question;
    this.recentAS = this.data[i].options;
  }

  valid()
  {
    return this.index == 0;
  }
}
