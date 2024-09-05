 NITROUS OSINT Library

The official NITROUS OSINT API wrapper written in TypeScript using Axios. This library provides an interface for interacting with open-source intelligence modules via the Nitrous OSINT API.

## Installation

```bash
npm install nitrous.ts
```

## Example Usage

```typescript
import NITROUS from "nitrous.ts";

const nitrous = new NITROUS({ env: 'production' });

async function main(): Promise<void> {
  const modules = await nitrous.getModules();
  console.log(modules);
}

main();
```

## Interfaces

Interfaces are located in `lib/sdk/interface/` and aliased as `@interface`.

### API Options

```typescript
interface Options {
  env ? : string;  // API environment: 'production' (default) or 'sandbox'
}
```

## Enums

Enums are located in `lib/sdk/enum/` and aliased as `@enum`.

### API Environments

```typescript
enum Environment {
  production = 'osint.nitrous-oxi.de',
  sandbox    = 'sandbox.nitrous-oxi.de',
}
```

## Methods

- **Get all modules**:  
  Fetch all available OSINT modules across all categories.

  ```typescript
  await getModules(): Promise<any>;
  ```

- **Query a specific module**:  
  Query a specific module within a category using a query (e.g., a username, email, IP, etc.).

  ```typescript
  await queryModule(category: string, module: string, query: string): Promise<any>;
  ```

- **Query all modules in a category**:  
  Query all modules within a specific category with a given query.

  ```typescript
  await getModulesByCategory(category: string, query: string): Promise<any>;
  ```