export type SvtFilters = {
  [key in SvtFilterTypes]?: string | number;
};

export type SvtFilterTypes = 'tn' | 'fio' | 'dept' | 'invent_num' | 'barcode';
