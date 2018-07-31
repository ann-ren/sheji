import { Component,ViewChild, ViewContainerRef, ComponentFactoryResolver,Input} from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, range } from 'rxjs';
import {DialogService} from './services/dialog.service';
import { map, filter, scan } from 'rxjs/operators';
import { TreeModel } from 'ng2-tree';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('alertContainer',{read: ViewContainerRef}) container: ViewContainerRef;
  @ViewChild('div',{read: ViewContainerRef}) div: ViewContainerRef;
  constructor(
    private resolver: ComponentFactoryResolver,
    private DialogService: DialogService
  ){}

  ngAfterViewInit() {
    console.log(this.div,'2322323')
  }
  current = {};
  currentFolder = {};
  title = 'app';
  folders = [
    {
      text: '文件夹1',
      children: [
        {
          text: 'child1'
        },
        {text: 'child2'}
      ]
    },
    {
      text: '文件夹2',
      children: [
        {text: 'child2'},
        {text: 'child2'}
      ]
    },
    {text: '文件夹3'},
    {text: '文件夹4'},
    {text: '文件夹5'},
  ];



  list = [
    {
      src: 'assets/images/1.png',
      text: '结构样例项目1'
    },
    {
      src: 'assets/images/1.png',
      text: '结构样例项目2'
    },
    {
      src: 'assets/images/1.png',
      text: '结构样例项目3'
    },
    {
      src: 'assets/images/1.png',
      text: '结构样例项目4'
    },
    {
      src: 'assets/images/1.png',
      text: '结构样例项目5'
    }
  ]
  pressItem = (item,$event) => {
    console.log($event,'event');
    $event.stopPropagation();
    this.current = item;
    this.DialogService.addDialog(AlertComponent, {x: $event.clientX,y:$event.clientY});
    // this.componentRef = this.container.createComponent(factory);
  }
  expand = (item) => {
    this.container.clear();
    this.currentFolder = item;
  }
  treeData = [];
  ngOnInit() {
    let listTreeData =[
      {
      "ID":"1_2_3",
      "Titile":"Title0",
      Main:{
      "Run":"Main.py",
      "Family":{
          "Default":"Para.json",
          "I120*20":"Para120_20.json"
        }
      },
      "Category":["1|2|3","4|5"],
      "Usage":"usage0"
    },
    {
      "ID":"1_2_4",
      "Titile":"Title1"
      Main:{
      "Run":"Main.py",
      "Family":{
          "Default":"Para.json",
          "I120*20":"Para120_20.json"
        }
      },
      "Category":["1|2|4","4|5"],
      "Usage":"usage1"
    }]

    this.treeData = listTreeData.map(data => {
      let tree = {title: data.Titile};
      tree.children = data.Category.map(data => {
        return data.split("|")
      })
      return tree;
    })
    console.log(this.treeData,'tree')
  };
  add() {

  }
}

@Component({
  selector: 'exe-alert',
  template: `<div [ngStyle]="{position: 'absolute',left: style.x+45+'px',top: style.y-30+'px'}">
    <div style="background-color: #337ab7;border-radius: 5px;">
      <div style="font-size: 14px;padding: 5px;color: #ffffff">运行</div>
      <div style="font-size: 14px;padding: 5px;color: #ffffff">删除</div>
    </div>
  </div>`
})
export class AlertComponent{
  @Input() style;
  ngOnInit() {
    console.log(this.style,888)
  }

}
