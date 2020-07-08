import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosFilterComponent } from './pedidos-filter.component';


describe('PedidosFilterComponent', () => {
  let component: PedidosFilterComponent;
  let fixture: ComponentFixture<PedidosFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
