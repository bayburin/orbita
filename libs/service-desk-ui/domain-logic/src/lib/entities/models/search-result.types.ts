import { Category } from './category.interface';
import { QuestionOverviewVM } from '../view-models/question-overview-vm.interface';
import { ServiceVM } from '../view-models/service-vm.interface';

export type SearchResultTypes = Category | ServiceVM | QuestionOverviewVM;
