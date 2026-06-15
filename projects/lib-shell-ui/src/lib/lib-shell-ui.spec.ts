import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibShellUi } from './lib-shell-ui';

describe('LibShellUi', () => {
  let component: LibShellUi;
  let fixture: ComponentFixture<LibShellUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibShellUi],
    }).compileComponents();

    fixture = TestBed.createComponent(LibShellUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
