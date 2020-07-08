import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RelatorioEsquadriasComponent } from '../pages/relatorio-esquadrias/relatorio-esquadrias.component';


describe('PedidosFilterComponent', () => {
  let component: RelatorioEsquadriasComponent;
  let fixture: ComponentFixture<RelatorioEsquadriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioEsquadriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioEsquadriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
