import { Component, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WorkForm, MessageForm } from '@orbita/orbita-ui/domain-logic';
import { AuthHelper } from '@iss/ng-auth-center';

@Component({
  selector: 'lib-workflow-form-control',
  templateUrl: './workflow-form-control.component.html',
  styleUrls: ['./workflow-form-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WorkflowFormControlComponent),
      multi: true,
    },
  ],
})
export class WorkflowFormControlComponent implements ControlValueAccessor, OnInit, OnDestroy {
  /**
   * "Предыдущий" объект данных, сохраненный для его заполенения перед тем как вернуть в форму
   */
  private workForms: WorkForm[];
  /**
   * Работа, к которой относится текущий пользователь
   */
  private currentWork: WorkForm;
  /**
   * Текущий объект сообщения, который находится в массиве workForms
   */
  private workflow: MessageForm;
  /**
   * Объект подписки на изменение сообщения, которое вводит пользователь
   */
  private valueChangesSub: Subscription;
  /**
   * Текущий пользователь
   */
  private user = this.authHelper.getJwtPayload();
  /**
   * Описываемый ход работы
   */
  workflowForm = this.fb.group({
    sender_id: [this.user.id],
    message: [null],
  });

  get message(): FormControl {
    return this.workflowForm.get('message') as FormControl;
  }

  constructor(private fb: FormBuilder, private authHelper: AuthHelper) {}

  ngOnInit(): void {
    this.valueChangesSub = this.message.valueChanges.subscribe((data) => {
      if (this.workflow) {
        this.workflow.message = data;
      }
      // Если объект сообщения в форме еще не существует, создать новый на основе формы workflowForm и добавить его в список сообщений текущей работы (currentWork)
      else {
        // Ищет уже существующий объект сообщения, у которого нет id
        const oldWorkdlow = this.currentWork.workflows.find((workflow) => !workflow.id);

        //  Если объект найден - значит этот объект и является сообщение о ходе работы
        if (oldWorkdlow) {
          oldWorkdlow.message = data;
        }
        // Если нет - создается новйы объект и помещается в массив сообщений
        else {
          this.workflow = this.workflowForm.getRawValue();
          this.currentWork.workflows.push(this.workflow);
        }
      }

      this.onChange(JSON.parse(JSON.stringify(this.workForms)));
      this.onTouched();
    });
  }

  ngOnDestroy(): void {
    this.valueChangesSub.unsubscribe();
  }

  /**
   * Записывает новое значение в элемент формы из модели формы.
   *
   * @param value - список работ
   */
  writeValue(value: WorkForm[]) {
    if (!value || !(value instanceof Array) || JSON.stringify(value) === JSON.stringify(this.workForms)) {
      return;
    }

    // После этого действия ссылка на старый workForms теряется, из-за этого приходится после каждого вызова метода очищать переменную workflow, чтобы далее алгоритм создал новую и поместил сообщение целиком в объект формы
    this.workForms = JSON.parse(JSON.stringify(value));
    this.checkExistingWorks();
  }

  /**
   * Вызывает функцию обратного вызова в случае изменения значения в UI.
   *
   * @param fn - функция обратного вызова
   */
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  /**
   * Вызывает функцию обраного вызова, если пользователь затронул компонент.
   *
   * @param fn - функция обратного вызова
   */
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onChange(_val: any) {
    /** */
  }

  onTouched() {
    /** */
  }

  /**
   * Проверяет, существует ли работа, к которой должна относиться текущая запись хода работы. Если нет - создает новую работу.
   */
  private checkExistingWorks() {
    this.currentWork = this.workForms.find((workForm) => workForm.group_id === this.user.group_id);
    // Очищает текущий объект сообщения, так как был получен новый список работ (объект workForms) и нужно создавать новый обеъект workflow
    this.workflow = null;

    // Случай, когда объект работы уже имеется, но список сообщений отсутствует
    if (this.currentWork && !this.currentWork.workflows) {
      this.resetInternalData();
      this.currentWork.workflows = [];
    }
    // Случай, когда объект работы еще не создан
    else if (!this.currentWork) {
      this.resetInternalData();
      this.currentWork = {
        group_id: this.user.group_id,
        workers: [{ user_id: this.user.id }],
        workflows: [],
      };
      this.workForms.push(this.currentWork);
    }
  }

  /**
   * Очищает текущие внутренние объекты message и workflow
   */
  private resetInternalData() {
    this.message.reset(null, { emitEvent: false });
  }
}
