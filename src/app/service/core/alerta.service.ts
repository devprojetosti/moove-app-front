import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import { Router, NavigationStart } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  public msgs: Message[] = [];
  private subject = new Subject<any>();
  private keepAfterRouteChange = false;
  constructor(private router: Router) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          if (this.keepAfterRouteChange) {
              // only keep for a single route change
              this.keepAfterRouteChange = false;
          } else {
              // clear alert message
              this.clear();
          }
      }
    });
  }
  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
      this.keepAfterRouteChange = keepAfterRouteChange;
      this.subject.next({ type: 'success', text: message });
  }

  error(message: string, keepAfterRouteChange = false) {
    console.log('teste')
      this.keepAfterRouteChange = keepAfterRouteChange;
      this.subject.next({ type: 'Erro ao realizar login', text: message });
  }

  clear() {
      // clear by calling subject.next() without parameters
      this.subject.next();
  }

  private space = '&nbsp;';

  showSuccess(summary: string, detail: string = this.space) {
    const severity = 'success';
    this.showMessage(severity, summary, detail);
  }
  showInfo(summary: string, detail: string = this.space) {
    const severity = 'success';
    this.showMessage(severity, summary, detail);
  }
  showWarn(summary: string, detail: string = this.space) {
    const severity = 'warn';
    this.showMessage(severity, summary, detail);
  }
  showError(summary: string, detail: string = this.space) {
    const severity = 'error';
    this.showMessage(severity, summary, detail);
  }

  public showMessage(severity: string, summary: string, detail: string) {
    // this.msgs = [];
    this.msgs.push({ severity: severity, summary: summary, detail: detail });
  }
}
