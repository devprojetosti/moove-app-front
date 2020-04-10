import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dados-cadastro',
  templateUrl: './dados-cadastro.component.html',
  styleUrls: ['./dados-cadastro.component.css']
})
export class DadosCadastroComponent implements OnInit {
  @Input()
  item;
  constructor() { }

  ngOnInit() {
  }

}
