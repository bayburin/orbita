import { Component, forwardRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User, UserGroup } from '@orbita/orbita-ui/domain-logic';
import { WorkForm } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-worker-form-control',
  templateUrl: './worker-form-control.component.html',
  styleUrls: ['./worker-form-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WorkerFormControlComponent),
      multi: true,
    },
  ],
})
export class WorkerFormControlComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() userGroups: UserGroup[];
  /**
   * Список исполнителей, который выбирает пользователь (хранится в виде плоского массива)
   */
  users = new FormControl();
  valueChanges: Subscription;
  /**
   * "Предыдущий" объект данных, сохраненный для его заполенения перед тем как вернуть в форму
   */
  private workForms: WorkForm[];
  /**
   * "Предыдущий" список исполнителей. Используется для получения изменений.
   */
  private oldUsers: User[];

  ngOnInit(): void {
    this.valueChanges = this.users.valueChanges.subscribe((data) => {
      if (!this.oldUsers) {
        return;
      }

      this.toFormMode(data);
      this.onChange(JSON.parse(JSON.stringify(this.workForms)));
      this.onTouched();
      this.oldUsers = data;
    });
  }

  ngOnDestroy(): void {
    this.valueChanges.unsubscribe();
  }

  /**
   * Записывает новое значение в элемент формы из модели формы.
   *
   * @param works - список работ
   */
  writeValue(value: WorkForm[]) {
    if (!value || !(value instanceof Array) || JSON.stringify(value) === JSON.stringify(this.workForms)) {
      return;
    }

    this.workForms = JSON.parse(JSON.stringify(value));
    const users = this.toArrayMode(value);
    this.users.setValue(users);
    this.oldUsers = users;
    this.onChange(value);
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
   * Преобразует одномерный список исполнителей в  форму работ со списком исполнителей
   *
   * @param users - список исполнителей
   */
  private toFormMode(users: User[]) {
    // Далее добавляет новых исполнителей
    const newWorkers = this.newWorkers(users);

    if (newWorkers.length) {
      newWorkers.forEach((user) => {
        // Проверяет, существует ли работа для исполнлителя
        const workForm = this.workForms.find((workForm) => workForm.group_id === user.group_id);

        if (workForm) {
          const workerForm = workForm.workers.find((workerForm) => workerForm.user_id === user.id);

          if (workerForm) {
            // Если работа есть и исполнитель задан, снимает флаг удаления
            workerForm._destroy = false;
          } else {
            // Если работа есть и исполнитель не задан, добавляет исполнителя
            workForm.workers.push({ user_id: user.id });
          }
        } else {
          // Добавляем новую работу и исполнителя
          this.workForms.push({
            group_id: user.group_id,
            workers: [{ user_id: user.id }],
          });
        }
      });
    }

    // Далее удаляет исполнителей
    const removedWorkers = this.removedWorkers(users);

    if (removedWorkers.length) {
      removedWorkers.forEach((user) => {
        const workForm = this.workForms.find((workForm) => workForm.group_id === user.group_id);
        const workerForm = workForm.workers.find((workerForm) => workerForm.user_id === user.id);

        if (workerForm.id) {
          // Если исполнитель сохранен в БД, устанавливает флаг _destroy
          workerForm._destroy = true;
        } else {
          // Если исполнитель еще не сохранен в БД, удаляет его из списка
          workForm.workers = workForm.workers.filter((worker) => worker.id !== workerForm.id);
        }
      });
    }
  }

  /**
   * Преобразует форму работ со списком исполнителей в одномерный список исполнителей
   *
   * @param workForms - форма работ
   */
  private toArrayMode(workForms: WorkForm[]): User[] {
    const filteredGroups = this.userGroups.filter((userGroup) =>
      workForms.some((workForm) => workForm.group_id === userGroup.id)
    );

    return filteredGroups.reduce((acc, userGroup) => {
      const work = workForms.find((workForm) => workForm.group_id === userGroup.id);
      const users = userGroup.users.filter((user) => work.workers.some((worker) => worker.user_id === user.id));

      return acc.concat(users);
    }, []);
  }

  /**
   * Возвращает список добавленных исполнителей
   *
   * @param newArr - новый полный список исполнителей
   */
  private newWorkers(newArr: User[]): User[] {
    return newArr.filter((u) => !this.oldUsers.includes(u));
  }

  /**
   * Возвращает список удаленных исполнителей
   *
   * @param newArr - новый полный список исполнителей
   */
  private removedWorkers(newArr: User[]): User[] {
    return this.oldUsers.filter((u) => !newArr.includes(u));
  }
}
