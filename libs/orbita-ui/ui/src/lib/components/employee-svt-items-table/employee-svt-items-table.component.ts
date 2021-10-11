import { ChangeDetectionStrategy, Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { SvtItem } from '@orbita/orbita-ui/domain-logic';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'lib-employee-svt-items-table',
  templateUrl: './employee-svt-items-table.component.html',
  styleUrls: ['./employee-svt-items-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeSvtItemsTableComponent implements OnInit {
  /**
   * Список свойств контекстного меню
   */
  contextMenuItems: MenuItem[];
  /**
   * Выбранная ВТ
   */
  selectedItem: SvtItem;
  /**
   * Массив ВТ
   */
  @Input() items: SvtItem[];
  /**
   * Индикатор загрузки
   */
  @Input() loading: boolean;
  /**
   * Событие выбора ВТ для создания заявки
   */
  @Output() createSdRequest = new EventEmitter<SvtItem>();

  ngOnInit(): void {
    this.contextMenuItems = [
      {
        label: 'Создать заявку',
        icon: 'mdi mdi-file-plus-outline mdi-18px',
        command: () => this.createSdRequest.emit(this.selectedItem),
      },
    ];
  }
}
