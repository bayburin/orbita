// import { getLastHistory } from './get-last-history.function';
// import { SdRequest } from './../../entities/sd-request.interface';

// describe('getLastHistory', () => {
//   const createHistory = (id: string, date: string) => ({
//     id,
//     action: `Event ${id}`,
//     created_at: date
//   });
//   const lastHistory = createHistory('3', '2021-02-22T09:45:10.173+07:00')
//   const sdRequest = {
//     works: [
//       { histories: [createHistory('1', '2021-02-20T09:44:10.173+07:00')] },
//       {
//         histories: [
//           createHistory('2', '2021-02-21T09:44:10.173+07:00'),
//           lastHistory
//         ]
//       }
//     ]
//   } as unknown as SdRequest;

//   it('should return null if sdRequest is null', () => {
//     expect(getLastHistory(null)).toBeNull();
//   });

//   it('should return history with latest date', () => {
//     expect(getLastHistory(sdRequest)).toEqual(lastHistory);
//   });
// });

it('', () => {});
