// import * as moment from 'moment';

// import { SdRequest } from './../../entities/models/sd-request.interface';
// import { History } from './../../entities/history.interface';

// /**
//  * Возвращает последнее событие (историю), произошедшее в указанной заявке
//  *
//  * @param sdRequest - заявка
//  */
// export const getLastHistory = function(sdRequest: SdRequest): History {
//   if (!sdRequest || !sdRequest.works) {
//     return null;
//   }

//   // TODO: Исправить
//   // let result: History = null;

//   // sdRequest.works.forEach(work => {
//   //   const lastHistory = work.histories[work.histories.length - 1];
//   //   result = result || lastHistory;

//   //   if (lastHistory && moment(lastHistory.created_at).isSameOrAfter(result.created_at)) {
//   //     result = lastHistory;
//   //   }
//   // });

//   // return result;
// }
