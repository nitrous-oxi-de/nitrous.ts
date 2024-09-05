import NITROUS from "../lib/index";
import Options from "@interface/options.interface";

const options: Options = { env: "production" };
const nitrous = new NITROUS(options);

(async () => {
  try {
    // Query all modules in the 'email' category with an email address
    const result = await nitrous.getModulesByCategory("email", "example@gmail.com");
    console.log(result.data);
  } catch (error: any) {
    console.error("Error:", error.message);
  }
})();