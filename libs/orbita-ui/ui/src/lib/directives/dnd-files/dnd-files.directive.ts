import { Directive, HostListener, EventEmitter, Output, HostBinding } from '@angular/core';

@Directive({
  selector: '[libDndFiles]',
})
export class DndFilesDirective {
  @Output() fileDropped = new EventEmitter<FileList>();

  @HostBinding('class.fileover') fileOver: boolean;

  @HostListener('dragover') onDragOver(): void {
    this.fileOver = true;
  }

  @HostListener('dragleave') onDragLeave(): void {
    this.fileOver = false;
  }

  // FIXME: тип события event: DragEvent. Но jest выдает ошибку "ReferenceError: DragEvent is not defined"
  @HostListener('drop', ['$event']) onDrop(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;

    this.fileOver = false;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
