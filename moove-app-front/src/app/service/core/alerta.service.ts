import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  public msgs: Message[] = [];
  constructor() { }

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
