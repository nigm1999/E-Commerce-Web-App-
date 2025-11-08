import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tologinGuard } from './tologin-guard';

describe('tologinGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tologinGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
