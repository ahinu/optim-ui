import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibPermissions } from './lib-permissions';

describe('LibPermissions', () => {
  let component: LibPermissions;
  let fixture: ComponentFixture<LibPermissions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibPermissions],
    }).compileComponents();

    fixture = TestBed.createComponent(LibPermissions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
