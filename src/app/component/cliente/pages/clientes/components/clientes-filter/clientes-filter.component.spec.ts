import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientesFilterComponent } from './clientes-filter.component';


describe('ClientesFilterComponent', () => {
  let component: ClientesFilterComponent;
  let fixture: ComponentFixture<ClientesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
