import { Injectable } from '@angular/core';
import { Log } from '../models/log'
import { BehaviorSubject, Observable, of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LogService {
logs: Log[];
private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});
selectedLog = this.logSource.asObservable()

private stateSource = new BehaviorSubject<boolean>(true);
stateClear = this.stateSource.asObservable();

  constructor() {
    // this.logs = [
    //   {id: "1", text: "Generated Component", date: new Date('03/27/2020 9:20:23')},
    //   {id: "2", text: "Added Bootstrap", date: new Date('03/28/2020 10:12:45')},
    //   {id: "3", text: "Added logs Component", date: new Date('03/29/2020 12:32:54')}
    // ]
    this.logs = [];
   }
   getLogs(): Observable<Log[]>{
  
    if (localStorage.getItem('logs') == null){
      this.logs = []
    }else{
      this.logs = JSON.parse(localStorage.getItem('logs', ));
    }
    
    return of(this.logs.sort((a, b) =>{
      return b.date = a.date;
    }));
   }
   setFormLog(log: Log){
    this.logSource.next(log);
   }
   addLog(log: Log){
     this.logs.push(log)

     //Add to local storage
     localStorage.setItem('logs', JSON.stringify(this.logs))
   }
   updateLog(log: Log){
      this.logs.forEach((cur, index)=>{
        if(log.id == cur.id){
          this.logs.splice(index, 1)
        }
      })
      this.logs.unshift(log);
      localStorage.setItem('logs', JSON.stringify(this.logs)) // update log
   }
   deleteLog(log: Log){
     this.logs.forEach((cur, index)=>{
        if(log.id == cur.id){
          this.logs.splice(index, 1)
        }
     })
     localStorage.setItem('logs', JSON.stringify(this.logs)) //delete log
   }
   clearState(){
     this.stateSource.next(true);
   }
}
