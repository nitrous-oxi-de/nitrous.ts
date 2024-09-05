/* 
 * @interface Options
 * @description Interface for Nitrous API options, such as environment
 */
interface Options {
  env?: string; // Optional environment, defaults to 'production', can also be 'sandbox'
}

export default Options;

// path: lib/sdk/interface/options.interface.ts