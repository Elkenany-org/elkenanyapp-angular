import { TestBed } from '@angular/core/testing';

import { AcademyResolver } from './academy.resolver';

describe('AcademyResolver', () => {
  let resolver: AcademyResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AcademyResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
