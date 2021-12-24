import { Category } from './category.interface';
import { QuestionOverviewVM } from '../view-models/question-overview-vm.interface';
import { ServiceVM } from '../view-models/service-vm.interface';
import { Service } from './service.interface';

export type SearchResultTypes = Category | ServiceVM | QuestionOverviewVM;

export type DeepSearchResultTypes = Category | Service | QuestionOverviewVM;
