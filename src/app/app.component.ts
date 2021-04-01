import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'websockets';
  connected = false;
  messages = [];
  message = "";

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    
  }
  connection: WebSocket;

  openSocket() {
    const url = 'ws://localhost:8081';
    this.connection = new WebSocket(url);
    this.connection.onopen = () => {
      this.connected = true;
    }
    this.connection.onmessage = (evt) => {
      console.log(evt);
      this.messages.push(evt.data);
    }
  }

  sendMessage() {
    this.httpClient.get(`http://localhost:8080/message?message=${this.message}`).subscribe((data) => {
      console.log(data);
      this.message = "";
    });
  }
}
