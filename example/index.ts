import NITROUS from "../lib/index";
import Options from "@interface/options.interface";

const options: Options = { env: "production" };
const nitrous = new NITROUS(options);

(async () => {
  try {
    // Fetch and log all available categories
    console.log("Fetching all categories...");
    const categories = await nitrous.fetchCategories();
    console.log("Categories:", categories);

    // Fetch and log all modules
    console.log("Fetching all modules...");
    const allModules = await nitrous.getModules();
    console.log("All Modules:", allModules);

    // Query all modules in the 'email' category with an email address
    console.log("Querying all modules in the 'email' category with query: 'example@gmail.com'...");
    const emailCategoryResult = await nitrous.getModulesByCategory("email", "example@gmail.com");
    console.log("Email Category Result:", emailCategoryResult.data);

    // Query a specific module within the 'username' category
    console.log("Querying the 'github' module in the 'username' category with query: 'exampleUser'...");
    const specificModuleResult = await nitrous.queryModule("username", "github", "exampleUser");
    console.log("Specific Module Result:", specificModuleResult.data);

  } catch (error: any) {
    console.error("Error:", error.message);
  }
})();