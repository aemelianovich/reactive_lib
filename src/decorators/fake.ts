/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */

function fake(methodName: string): Function {
  return function (target: Function) {
    if (
      Object.getOwnPropertyDescriptor(target.prototype, methodName) ===
      undefined
    ) {
      Object.defineProperty(target.prototype, methodName, {
        configurable: true,
        writable: true,
        enumerable: true,
        value: function (...args: any) {
          throw new Error(`Method "${methodName}" was not defined`);
        },
      });
    }

    return target;
  };
}

export default fake;
