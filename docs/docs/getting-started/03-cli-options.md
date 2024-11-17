# Cli Options

## Configuration File

> Parameter: `--config` or `-c`

> Default: ".gplintrc"

If you are using a file with a different name or a file in a different folder, you can specify the `-c` or `--config`
option and pass in the relative path to your configuration file.

```shell
gplint -c path/to/configuration/file.extension
```

## Auto fix problems

> Parameter: `--fix`

If the parameter `--fix` is used, all problems found that have autofix enabled, will apply the corrections
automatically. On documentation, rules with autofix enabled are marked with "🪄".

```shell
gplint --fix
```
## Report output format

> Parameter: `--format` or `-f`

> Default: "stylish"

Select which output format will be used to report the issues found. The available output formats are `json`, `stylish`
and `xunit`.

```shell
gplint --format xunit
```

## Ignoring Feature Files

> Parameter: `--ignore` or `-i`

Use the command line option`-i` or `--ignore`, pass in a comma separated list of glob patterns. If specified, the
command line option will override the `.gplintignore` file.

```shell
gplint --ignore "**/wip/**/*.feature,foo/ignore.feature" "tests/features"
```

## Max warnings allowed

> Parameter: `--max-warnings`

> Default: "-1"

Sets the maximum allowed warnings. If the amount of warnings i higher to the defined number, the validation
will fail, even if all violations are only warnings. A negative values implies there is not a maximum number.

```shell
# Means that should not be more than 4 warnings
gplint --max-warnings 4

# Means that should not be any warning. Is basically the same as configuring all rules to "error" level.
gplint --max-warnings 0
```

## Custom rules directory

> Parameter: `--rulesdir` or `-r`

You can specify one more custom rules directories by using the `-r` or `--rulesdir` command line option. Rules in the
given directories will be available additionally to the default rules.

Example:

```shell
gplint --rulesdir "/path/to/my/rulesdir" --rulesdir "from/cwd/rulesdir"
```

Paths can either be absolute or relative to the current working directory.
Have a look at the `src/rules/` directory for examples. The `no-empty-file` rule is a good example to start with.
