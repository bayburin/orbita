import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { contentBlockAnimation } from '../../../../../core/animations/content.animation';
import { Question } from '../../../models/question/question.model';
import { Answer } from '../../../models/answer/answer.model';

@Component({
  selector: 'service-desk-ui-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.sass'],
  animations: [contentBlockAnimation],
})
export class QuestionFormComponent implements OnInit {
  preview: any[] = [];
  @Input() questionForm: FormGroup;
  @Input() question: Question;
  @Input() submitted: boolean;

  constructor(private formBuilder: FormBuilder) {}

  get form() {
    return this.questionForm.controls;
  }

  get ticketForm() {
    return this.form.ticket as FormGroup;
  }

  get answersForm() {
    return this.form.answers as FormArray;
  }

  ngOnInit() {
    if (this.question) {
      this.question.answers.forEach((answer) => this.answersForm.push(this.createAnswer(answer)));
    }
  }

  /**
   * Переключает состояние "is_hidden" у указанного объекта.
   *
   * @param object - изменяемый объект
   */
  toggleHidden(object: AbstractControl): void {
    const currentValue = (object as FormGroup).controls.is_hidden.value;

    (object as FormGroup).controls.is_hidden.setValue(!currentValue);
  }

  /**
   * Добавляет шаблон ответа к вопросу.
   */
  addAnswer(): void {
    (this.form.answers as FormArray).push(this.createAnswer());
  }

  /**
   * Удаляет ответ.
   *
   * @param answer - ответ
   */
  deleteAnswer(answer: AbstractControl): void {
    if (answer.value.id) {
      (answer as FormGroup).controls._destroy.setValue(true);

      return;
    }

    const index = (this.form.answers as FormArray).controls.indexOf(answer);

    (this.form.answers as FormArray).removeAt(index);
  }

  private createAnswer(answer: Answer = {} as Answer): FormGroup {
    return this.formBuilder.group({
      id: [answer.id],
      question_id: [answer.questionId],
      reason: [answer.reason],
      answer: [answer.answer, Validators.required],
      link: [answer.link],
      is_hidden: [answer.isHidden || false],
      _destroy: [false],
    });
  }
}
