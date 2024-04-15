import {
  Examples,
  Feature,
  Location,
  ParseError,
  Pickle,
  Rule as CucumberRule,
  Scenario,
  TableRow,
  Step,
  Background,
} from '@cucumber/messages';

export interface Rules {
  [key: string]: Rule
}

export interface Rule {
  name: string
  availableConfigs?: Record<string, unknown> | string[]
  run: (gherkinData: GherkinData, config: RuleSubConfig<unknown>) => RuleError[]
}

export interface RulesConfig {
  [key: string]: RuleConfig
}

export type RuleConfig = string | number | RuleConfigArray;
export type RuleConfigArray = [string | number , ...RuleSubConfig<any>[]] // eslint-disable-line @typescript-eslint/no-explicit-any

export type RuleSubConfig<T> = T;

export interface RuleError extends Location {
  message: string
  rule: string
}

export interface RuleErrorLevel extends RuleError {
  level: number
}

export type GherkinError = Partial<ParseError>

export interface Errors {
  errors: GherkinError[]
  errorMsgs: RuleError[]
}

export interface ErrorsByFile {
  filePath: string
  errors: RuleErrorLevel[]
}

export interface GherkinData {
  feature?: Feature
  pickles?: Pickle[]
  file?: FileData
}

export interface FileData {
  relativePath: string
  lines: string[]
}

export type GherkinTaggable = Feature | CucumberRule | Scenario | Examples;
export type GherkinKeyworded = GherkinTaggable | Background | Step;
export type GherkinNode = GherkinKeyworded | TableRow;
