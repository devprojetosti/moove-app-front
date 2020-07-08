import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RelatorioClientesComponent } from './relatorio-clientes.component';


describe('PedidosFilterComponent', () => {
  let component: RelatorioClientesComponent;
  let fixture: ComponentFixture<RelatorioClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
