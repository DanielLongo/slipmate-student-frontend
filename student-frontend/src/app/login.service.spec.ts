
import { TestBed } from '@angular/core/testing';

import { LoginServicess } from './login.service';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginServicess = TestBed.get(LoginServicess);
    expect(service).toBeTruthy();
  });
});
