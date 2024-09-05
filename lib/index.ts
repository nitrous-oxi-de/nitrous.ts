import axios, { AxiosInstance } from "axios";
import Options from "@interface/options.interface";
import Environment from "@enum/api/environment.enum";

interface Endpoint {
  name: string;
  description: string;
  route: string;
  type: string;
}

interface Module {
  category: string;
  endpoints: Endpoint[];
}

/* 
 * @class NITROUS
 * @description A library for interacting with the Nitrous OSINT API
 */
class NITROUS {
  private axios: AxiosInstance;
  private baseUrl: string;
  private categories: Set<string> = new Set(); 

  constructor(options: Options) {
    this.baseUrl =
      options.env && options.env in Environment
        ? Environment[options.env as keyof typeof Environment]
        : Environment.production;

    this.axios = axios.create({
      baseURL: `https://${this.baseUrl}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /* 
   * @method get
   * @param {string} url - The endpoint to query
   * @description Performs a GET request and returns the response data only
   */
  async get(url: string): Promise<any> {
    try {
      const response = await this.axios.get(url);
      return response.data; // Only return the data from the response
    } catch (error: any) {
      console.error(`[NITROUS] | Error fetching data from ${url}:`, error.message);
      throw new Error(error.message);
    }
  }

  /* 
   * @method queryModule
   * @param {string} category - The category to query (e.g., 'username')
   * @param {string} module - The module to query within the category (e.g., 'github')
   * @param {string} query - The query parameter (e.g., a username, email, or IP address)
   * @description Queries a specific OSINT module with a given query
   */
  async queryModule(category: string, module: string, query: string): Promise<any> {
    await this.ensureCategoriesLoaded();

    if (!this.categories.has(category)) {
      throw new Error(`[NITROUS] | Invalid category: ${category}. Check available categories.`);
    }

    const url = `/${category}/${module}?query=${query}`;
    return await this.get(url);
  }

  /* 
   * @method queryModulesByCategory
   * @param {string} category - The category to query (e.g., 'email', 'domain', etc.)
   * @param {string} query - The query parameter (e.g., 'email@example.com', 'domain.com')
   * @description Queries all modules for a specific category with a given query
   */
  async queryModulesByCategory(category: string, query: string): Promise<any> {
    await this.ensureCategoriesLoaded();

    if (!this.categories.has(category)) {
      throw new Error(`[NITROUS] | Invalid category: ${category}. Check available categories.`);
    }

    const url = `/${category}?query=${query}`;
    return await this.get(url);
  }

  /* 
   * @method getModulesByCategory
   * @param {string} category - The category to retrieve modules from
   * @description Fetches and returns the names of all available modules within a specific category
   */
  async getModulesByCategory(category: string): Promise<string[]> {
    await this.ensureCategoriesLoaded();

    const modules = await this.getModules();
    const categoryModules = modules.find((mod) => mod.category === category);
    if (!categoryModules) {
      throw new Error(`[NITROUS] | No modules found for category: ${category}`);
    }

    return categoryModules.endpoints.map((endpoint) => endpoint.name);
  }

  /* 
   * @method getModules
   * @description Fetches and returns all available modules across all categories
   */
  async getModules(): Promise<Module[]> {
    const url = "/";
    const modules = await this.get(url);
    this.extractCategories(modules);
    return modules;
  }

  /* 
   * @method fetchCategories
   * @description Fetches and returns all available categories as a string[]
   */
  async fetchCategories(): Promise<string[]> {
    await this.ensureCategoriesLoaded();
    return Array.from(this.categories);
  }

  /* 
   * @method ensureCategoriesLoaded
   * @description Ensures that the categories have been loaded before querying
   */
  private async ensureCategoriesLoaded(): Promise<void> {
    if (this.categories.size === 0) {
      await this.getModules();
    }
  }

  /* 
   * @method extractCategories
   * @param {Module[]} modules - The modules data
   * @description Extracts and stores the unique categories from the fetched modules
   */
  private extractCategories(modules: Module[]): void {
    modules.forEach((module) => {
      this.categories.add(module.category);
    });
  }
}

export default NITROUS;

// path: lib/index.ts