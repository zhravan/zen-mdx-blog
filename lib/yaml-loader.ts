import * as fs from "fs";
import * as path from "path";
import yaml from "yaml";


const DATA_DIR = path.join(process.cwd(), "data");
 
export function loadYaml<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename);
  const content = fs.readFileSync(filePath, "utf8");
  return yaml.parse(content) as T;
}

