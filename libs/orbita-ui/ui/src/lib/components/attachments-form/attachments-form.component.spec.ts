import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AttachmentsFormComponent } from './attachments-form.component';
import { FormArray, ReactiveFormsModule } from '@angular/forms';

describe('AttachmentsFormComponent', () => {
  let component: AttachmentsFormComponent;
  let fixture: ComponentFixture<AttachmentsFormComponent>;
  let file: File;
  let fileList: FileList;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AttachmentsFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    file = new File([new Blob()], 'image.png');
    fileList = {
      0: file,
      length: 1,
      item: (index: number) => file,
    };

    fixture = TestBed.createComponent(AttachmentsFormComponent);
    component = fixture.componentInstance;
    component.attachmentsForm = new FormArray([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('fileHandler', () => {
    it('should add selected file to form', () => {
      const event = new Event('change');

      Object.defineProperty(event, 'target', { value: { files: fileList } });
      component.fileHandler(event);

      expect(component.attachmentsForm.value.length).toEqual(1);
    });
  });

  describe('removeAttachment', () => {
    it('should remove file from form', () => {
      component.onFileDropped(fileList);
      component.removeAttachment(0);

      expect(component.attachmentsForm.value.length).toEqual(0);
    });
  });
});
