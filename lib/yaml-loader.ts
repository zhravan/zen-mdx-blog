import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';

// Define the absolute path to the data directory at the project root
const DATA_DIR = path.join(process.cwd(), 'data');

/**
 * Reads and parses a YAML file from the 'data/' directory.
 * @param filename - The name of the file (e.g., 'site.yaml').
 * @returns The parsed data object.
 */
export function loadYaml<T>(filename: string): T {
  // 1. Construct the full path to the file
  const filePath = path.join(DATA_DIR, filename);

  // 2. Read the file content synchronously
  // We use readFileSync because data loading in RSCs must be blocking/synchronous.
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // 3. Parse the YAML content into a JavaScript object
  const data = yaml.load(fileContents);

  return data as T;
}