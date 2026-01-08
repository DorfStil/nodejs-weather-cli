export function getEnviromentArgs(args: NodeJS.Process['argv']) {
  const [_executer, _file, ...rest] = args;

  const result: Record<string, string | boolean | Array<string | boolean>> = {};

  rest.forEach((arg, index, arr) => {
    if (!arg || arg === '-' || (/^-\d/.test(arg) && !arg.includes('='))) {
      return;
    }

    const hasDoubleDash = arg.startsWith('--');
    const hasSingleDash = arg.startsWith('-');
    const value = arr[index + 1];
    const flagWithValue = hasDoubleDash ? arg.slice(2) : arg.slice(1);
    const [flag, inlineValue] = flagWithValue.split('=', 2);

    if (!flag) {
      return;
    }

    if (hasSingleDash) {
      const hasInlineValue = inlineValue !== undefined;
      const isNegativeNumber = typeof value === 'string' && /^-\d/.test(value);
      const hasNextValue = index < arr.length - 1 && (isNegativeNumber || !value.startsWith('-'));
      const nextValue = hasInlineValue ? inlineValue : hasNextValue ? value : true;

      if (flag in result) {
        result[flag] = Array.isArray(result[flag])
          ? result[flag].concat(nextValue)
          : [result[flag], nextValue];
      } else {
        result[flag] = nextValue;
      }
    }
  });

  return result;
}
