interface DecimalValue {
  value: bigint;
  scale: number;
}

function parseDecimal(value: string): DecimalValue {
  const [whole = "0", fraction = ""] = value.split(".");
  const digits = `${whole}${fraction}` || "0";

  return {
    value: BigInt(digits),
    scale: fraction.length,
  };
}

function formatDecimal(value: bigint, scale: number) {
  if (scale === 0) {
    return value.toString();
  }

  const divisor = 10n ** BigInt(scale);
  const whole = value / divisor;
  const fraction = (value % divisor)
    .toString()
    .padStart(scale, "0")
    .replace(/0+$/, "");

  return fraction ? `${whole}.${fraction}` : whole.toString();
}

export function multiplyEth(price: string, quantity: number) {
  const parsed = parseDecimal(price);
  const total = parsed.value * BigInt(quantity);

  return formatDecimal(total, parsed.scale);
}

export function addEth(values: string[]) {
  if (values.length === 0) {
    return "0";
  }

  const parsedValues = values.map(parseDecimal);
  const scale = Math.max(...parsedValues.map((item) => item.scale));

  const total = parsedValues.reduce((sum, item) => {
    const difference = scale - item.scale;
    const adjusted = item.value * 10n ** BigInt(difference);

    return sum + adjusted;
  }, 0n);

  return formatDecimal(total, scale);
}

export function percentageEth(value: string, percentage: number) {
  const parsed = parseDecimal(value);
  const result = parsed.value * BigInt(percentage);

  return formatDecimal(result, parsed.scale + 2);
}

export function applyDiscountEth(value: string, percentage: number) {
  const parsed = parseDecimal(value);
  const multiplier = BigInt(100 - percentage);
  const result = parsed.value * multiplier;

  return formatDecimal(result, parsed.scale + 2);
}
