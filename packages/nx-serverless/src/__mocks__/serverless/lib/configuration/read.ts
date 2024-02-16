// export default () => jest.fn().mockImplementation(() => {
//     return { 
//       service: {},
//       provider: {
//         runtime: 'nodejs18.x',
//       }
//     };
// });

export = jest.fn().mockImplementation(() => {
  return { 
    service: {},
    provider: {
      runtime: 'nodejs18.x',
    }
  };
});