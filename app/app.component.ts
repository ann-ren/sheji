import { Component,ViewChild, ViewContainerRef, ComponentFactoryResolver,Input} from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, range } from 'rxjs';
import {DialogService} from './services/dialog.service';
import { map, filter, scan } from 'rxjs/operators';
import { TreeModel } from 'ng2-tree';
import { assertPreviousIsParent } from '@angular/core/src/render3/instructions';
import { convertInjectableProviderToFactory } from '@angular/core/src/di/injectable';
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
  convert(arr) {
    if(arr.length === 1){
      return {title: arr[0]};
    }
    return {title: arr[0],child: this.convert(arr.slice(1,arr.length))}
  }
  i=-1;
  treeObj(arr) {
    if(arr.length==1){return arr[0];}
    return {[arr[0]]: this.treeObj(arr.slice(1,arr.length)};
  }
  ngOnInit() {
    // console.log(this.convert([1,2,3,4,5]))
    let listTreeData =[
      {
      "ID":"1_2_3_4_5_6",
      "Titile":"Title0",
      Main:{
      "Run":"Main.py",
      "Family":{
          "Default":"Para.json",
          "I120*20":"Para120_20.json"
        }
      },
      "Category":["1|2|3|4|5","4|5|6|7"],
      "Usage":"usage0"
    },
    {
      "ID":"1_2_3_4_5_6",
      "Titile":"Title2",
      Main:{
      "Run":"Main.py",
      "Family":{
          "Default":"Para.json",
          "I120*20":"Para120_20.json"
        }
      },
      "Category":["1|2|3|4|6","4|5|6|7"],
      "Usage":"usage0"
    },
    {
      "ID":"1_2_4",
      "Titile":"Title1",
      Main:{
      "Run":"Main.py",
      "Family":{
          "Default":"Para.json",
          "I120*20":"Para120_20.json"
        }
      },
      "Category":["aa|bb|cc","4|5"],
      "Usage":"usage1"
    }]
    
    this.treeData = listTreeData.map(data => {
      this.tree = {};
      this.tree.children = data.Category.map(datae => {
        var c = datae.split("|");
        c.push({leaf: data.Titile});
        return c
      })
      // this.tree.children.push(data.Titile);
      return this.tree;
    })
    console.log(this.treeData,88)
    this.bb=this.treeData.map(data => {
      return data.children.map(data => {
        return this.treeObj(data);
      })
    })
    console.log(this.bb,'bb')
    this.c= this.treeData.map(data => {
      return {
        title: data.title,

        children: data.children.map(data => {
          return this.convert(data);
        })
      }
    })
    // console.log(this.c)
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
  }

}



@Component({
  selector: 'child',
  template: `
    <div style="margin-left: 15px">
      <span (click)="onPress(data)">
        <span *ngIf="data&&data.child">
          <span *ngIf="data.isExpand">-</span>
          <span *ngIf="!data.isExpand">+</span>
        </span>{{data&&data.title}}
      </span>
      <div *ngIf="data.isExpand">
        <child *ngIf="data&&data.child" [data]="data.child"></child>
      </div>
    </div>  
  `
})

export class ChildComponent{
  @Input() data;
  datas=this.data;
  ngOnInit() {
    // console.log(this.data,2222)
  }
  selVal;
  onPress = (data) => {
    this.datas= {...this.data};
    // while(this.datas.child){
    //   if(this.data.child.title===this.selVal){
    //     return;
    //   }else{
    //     this.datas.isExpand=false;
    //     this.datas=this.datas.child;
    //   }
    // }
    this.selVal = data.title;
    if(!data.isExpand){
      data.isExpand=true;
    }else{
      data.isExpand=false;
    }
  }
}
