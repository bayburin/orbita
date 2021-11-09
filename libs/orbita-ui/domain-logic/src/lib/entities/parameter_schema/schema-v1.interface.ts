export interface SchemaV1 {
  /**
   * Общие параметры
   */
  readonly common: {
    /**
     * Ключ
     */
    readonly key: string;

    /**
     * Описание ключа
     */
    readonly key_desc: string;

    /**
     * Значение
     */
    readonly value: string;

    /**
     * Наименование зачения
     */
    readonly value_desc: string;

    /**
     * Порядок следования параметров
     */
    readonly order: number;
  }[];

  /**
   * Табличные параметры
   */
  readonly table: {
    /**
     * Метаданные столбцов
     */
    readonly columns: {
      /**
       * Ключ
       */
      readonly key: string;

      /**
       * Описание ключа
       */
      readonly desc: string;

      /**
       * Порядок следования столбцов
       */
      readonly order: string;
    }[];

    /**
     * Данные столбцов
     */
    readonly data: {
      /**
       * Данные ключа
       */
      readonly [key: string]: {
        /**
         * Значение
         */
        readonly value: string;

        /**
         * Описание значения
         */
        readonly desc: string;
      };
    }[];
  };
}
