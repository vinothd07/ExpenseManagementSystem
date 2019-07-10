import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private message: NzMessageService) { }
  success(message: string) {
    this.message.create('success', message);
  }

  error(message: string) {
    this.message.create('error', message);
  }
}
