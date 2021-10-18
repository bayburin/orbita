import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

import { maxFileSizeValidator } from '../../validators/max-file-size.validator';

@Component({
  selector: 'lib-attachments-form',
  templateUrl: './attachments-form.component.html',
  styleUrls: ['./attachments-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachmentsFormComponent {
  @Input() attachmentsForm: FormArray;

  /**
   * Обрабатывает загруженные файлы.
   *
   * @param fileInput - событие выбора файла.
   */
  fileHandler(event: Event): void {
    const files = (event.target as HTMLInputElement).files;

    this.addAttachments(files);
  }

  /**
   * Обрабатывает файлы, полученные через механизм Drag & Drop.
   *
   * @param files - список полученных файлов.
   */
  onFileDropped(files: FileList): void {
    this.addAttachments(files);
  }

  /**
   * Удаляет файл из формы по указанному индексу
   *
   * @param index - индекс файла
   */
  removeAttachment(index: number): void {
    this.attachmentsForm.removeAt(index);
  }

  /**
   * Добавляет указанные файлы к форме.
   *
   * @param files - массив файлов
   */
  private addAttachments(files: FileList): void {
    for (const file of Array.from(files)) {
      // Максимальный размер 50 Мб
      this.attachmentsForm.push(new FormControl(file, [maxFileSizeValidator(50 * 1024 * 1024)]));
    }
  }
}
