import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ORBITA_UI_ENV_TOKEN, orbitaUiEnvironmentStub } from '@orbita/shared/environment';

import { AttachmentApi } from './attachment.api';
import { Attachment } from '../../../entities/models/attachment.interface';

describe('AttachmentApi', () => {
  let service: AttachmentApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AttachmentApi,
        {
          provide: ORBITA_UI_ENV_TOKEN,
          useValue: orbitaUiEnvironmentStub,
        },
      ],
    });

    service = TestBed.inject(AttachmentApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('download()', () => {
    const api = `${orbitaUiEnvironmentStub.serverApiUrl}/claims`;
    const attachment = { id: 2, claim_id: 1 } as Attachment;
    const response = new Blob(['test'], { type: 'application/json' });

    it('should return requests', () => {
      service.download(attachment).subscribe((result) => {
        expect(result).toEqual(response);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: `${api}/1/attachments/2`,
        })
        .flush(response);
    });
  });
});
