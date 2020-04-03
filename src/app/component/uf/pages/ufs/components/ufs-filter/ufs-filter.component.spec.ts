import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UfsFilterComponent } from './ufs-filter.component';


describe('TemasFilterComponent', () => {
  let component: UfsFilterComponent;
  let fixture: ComponentFixture<UfsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UfsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UfsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
