import {Feature, ParseError, Pickle} from '@cucumber/messages';

export interface CliOptions {
  format: string
  ignore: string[]
  config: string
  rulesdir: string[]
  maxWarnings: number
}

export interface Rules {
  [key: string]: Rule
}

export interface Rule {
  name: string
  availableConfigs?: Record<string, unknown> | string[]
  run: (gherkinData: GherkinData, config: RuleSubConfig) => RuleError[]
}

export interface RulesConfig {
  [key: string]: RuleConfig
}

export type RuleConfig = string | [string, RuleSubConfig]
export type RuleSubConfig = string | object;

export interface RuleError {
  message: string
  rule: string
  line: number
  column: number
  level: number
}

export type GherkinError = Partial<ParseError>

export interface Errors {
  errors: GherkinError[]
  errorMsgs: RuleError[]
}

export interface ErrorsByFile {
  filePath: string
  errors: RuleError[]
}

export interface GherkinData {
  feature: Feature
  pickles: Pickle[]
  file: FileBlob
}

export interface FileBlob {
  relativePath: string
  lines: string[]
}
