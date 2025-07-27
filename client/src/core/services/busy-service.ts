import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestConunt = signal(0)

  busy(){
    this.busyRequestConunt.update(current => current + 1)
  }
  
  idle(){
    this.busyRequestConunt.update(current => Math.max(0, current - 1))
  }
}
