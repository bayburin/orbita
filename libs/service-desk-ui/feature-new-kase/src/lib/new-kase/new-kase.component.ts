import { Component, OnInit, ViewChild, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { KaseFacade, ServiceFacade, SvtItem } from '@orbita/service-desk-ui/domain-logic';
import { filter, take, takeWhile, map, withLatestFrom } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Observable, merge, Subject } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'lib-new-kase',
  templateUrl: './new-kase.component.html',
  styleUrls: ['./new-kase.component.scss'],
})
export class NewKaseComponent implements OnInit, OnDestroy {
  form: FormGroup;
  svtItems$ = this.kaseFacade.formSvtItems$;
  services$ = this.serviceFacade.entities$;
  loading$ = this.kaseFacade.loading$;
  loadingParams$ = this.kaseFacade.formLoadingParams$;
  errorParams$ = this.kaseFacade.formErrorParams$;
  submitted = false;
  onService = new Subject<string>();
  @ViewChild('serviceTypeahead') serviceTypeahead: NgbTypeahead;
  @ViewChild('fileView') fileView: ElementRef;
  private alive = true;

  get formService(): FormControl {
    return this.form.get('service') as FormControl;
  }

  get formDesc(): FormControl {
    return this.form.get('desc') as FormControl;
  }

  get formItem(): FormControl {
    return this.form.get('item') as FormControl;
  }

  get formFiles(): FormControl {
    return this.form.get('files') as FormControl;
  }

  constructor(
    private kaseFacade: KaseFacade,
    private serviceFacade: ServiceFacade,
    private fb: FormBuilder,
    private location: Location,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.kaseFacade.initNewForm();
    this.form = this.fb.group({
      id_tn: [],
      user_tn: [{ value: '', disabled: true }],
      fio: [{ value: '', disabled: true }],
      dept: [{ value: '', disabled: true }],
      email: [],
      phone: [],
      mobile: [],
      service: [null, Validators.required],
      desc: ['', Validators.required],
      without_service: [false],
      item: [null, Validators.required],
      without_item: [false],
      files: [[]],
      additional: [],
    });

    // Заполняет данные формы из хранилища
    this.kaseFacade.formEntity$
      .pipe(
        filter((data) => !!data),
        take(1)
      )
      .subscribe((formData) => {
        this.form.patchValue(formData, { emitEvent: false });

        if (formData.without_item) {
          this.toggleFormControl(this.formItem);
        }

        if (formData.without_service) {
          this.toggleFormControl(this.formService);
        }
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  /**
   * Выбор услуги.
   */
  searchService = (searchTerm: Observable<string>) => {
    const focusWithClosedPopup = this.onService.pipe(filter(() => !this.serviceTypeahead.isPopupOpen()));

    return merge(searchTerm, focusWithClosedPopup).pipe(
      takeWhile(() => this.alive),
      withLatestFrom(this.services$),
      map(([term, services]) =>
        term === '' ? services : services.filter((s) => s.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
      )
    );
  };

  /**
   * Формат вывода услуги.
   *
   * @param val - преобразуемый объект
   */
  formatter = (val: { name: string }) => val.name;

  /**
   * Событие отправки формы.
   */
  submitForm(): void {
    console.log('submit');
  }

  /**
   * Событие возврата на предыдущую страницу.
   *
   * @param event - объект события.
   */
  cancelForm(event: Event): void {
    event.preventDefault();
    this.location.back();
  }

  /**
   * Активировать/отключить указанное поле
   *
   * @param control - поле, которое будет активировано/отключено
   */
  toggleFormControl(control: FormControl): void {
    if (control.disabled) {
      control.enable();
      control.setValidators([Validators.required]);
      control.updateValueAndValidity();
    } else {
      control.disable();
      control.setValidators(null);
    }
  }

  trackByItem(index: number, item: SvtItem) {
    return item.item_id;
  }

  /**
   * Преобразует загружаемый файл в base64.
   *
   * @param fileInput - событие выбора файла.
   */
  convertToBase64(fileInput: any) {
    const filenames: string[] = [];

    for (const file of fileInput.target.files) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const currentFiles = this.formFiles.value.slice();

        currentFiles.push({ filename: file.name, file: reader.result });
        filenames.push(file.name);
        this.formFiles.setValue(currentFiles);
        this.renderer.setProperty(this.fileView.nativeElement, 'value', filenames.join('; '));
      };
      reader.readAsDataURL(file);
    }
  }
}
