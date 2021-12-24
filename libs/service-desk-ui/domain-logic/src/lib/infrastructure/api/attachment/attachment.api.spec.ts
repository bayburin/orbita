import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SERVICE_DESK_UI_ENV_TOKEN, serviceDeskUiEnvironmentStub } from '@orbita/shared/environment';

import { AttachmentApi } from './attachment.api';
import { Attachment } from '../../../entities/model/attachment.interface';

describe('AttachmentApi', () => {
  let service: AttachmentApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AttachmentApi,
        {
          provide: SERVICE_DESK_UI_ENV_TOKEN,
          useValue: serviceDeskUiEnvironmentStub,
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
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/answers`;
    const attachment = { id: 2, answer_id: 1 } as Attachment;
    const response = new Blob(['test'], { type: 'application/json' });

    it('should return requests', () => {
      service.download(attachment.id, attachment.answer_id).subscribe((result) => {
        expect(result).toEqual(response);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: `${api}/1/answer_attachments/2`,
        })
        .flush(response);
    });
  });
});
