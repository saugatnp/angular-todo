import { Injectable } from '@angular/core';
import { TASKS } from '../mock-task';
import { Task } from '../Task';
import { Observable , of } from 'rxjs';
import { HttpClient , HttpHeaders} from '@angular/common/http';

const headerOptions ={
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = "http://localhost:5000/tasks"
  constructor(private http:HttpClient) { }

  getTask() : Observable<Task[]> { //this funtion gets all the task form the json server
    const tasks =  of(TASKS);
    return this.http.get<Task[]>(this.apiUrl);
  }
  deleteTask(task : Task): Observable<Task>{ // this funtion deletes the task from the json server
    const url =`${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }
  toggleTask(task : Task): Observable<Task>{ //this  funtion toggles the reminder 
    const url =`${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url , task , headerOptions);
  }
  addTask(task : Task): Observable<Task>{ //this function adds a new task to the json server
    return this.http.post<Task>(this.apiUrl , task , headerOptions);
  }
}
