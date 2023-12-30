var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/handler.ts
var handler_exports = {};
__export(handler_exports, {
  hello: () => hello
});
module.exports = __toCommonJS(handler_exports);
var hello = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Gsdo Serverless Webpack (Typescript) v1.0! Your function executed successfully!"
        // input: event,
      },
      null,
      2
    )
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hello
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2hhbmRsZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IEFQSUdhdGV3YXlQcm94eUhhbmRsZXIgfSBmcm9tICdhd3MtbGFtYmRhJztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuZXhwb3J0IGNvbnN0IGhlbGxvOiBBUElHYXRld2F5UHJveHlIYW5kbGVyID0gYXN5bmMgKGV2ZW50LCBfY29udGV4dCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShcbiAgICAgIHtcbiAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAnR3NkbyBTZXJ2ZXJsZXNzIFdlYnBhY2sgKFR5cGVzY3JpcHQpIHYxLjAhIFlvdXIgZnVuY3Rpb24gZXhlY3V0ZWQgc3VjY2Vzc2Z1bGx5IScsXG4gICAgICAgIC8vIGlucHV0OiBldmVudCxcbiAgICAgIH0sXG4gICAgICBudWxsLFxuICAgICAgMlxuICAgICksXG4gIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHTyxJQUFNLFFBQWdDLE9BQU8sT0FBTyxhQUFhO0FBQ3RFLFNBQU87QUFBQSxJQUNMLFlBQVk7QUFBQSxJQUNaLE1BQU0sS0FBSztBQUFBLE1BQ1Q7QUFBQSxRQUNFLFNBQ0U7QUFBQTtBQUFBLE1BRUo7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
