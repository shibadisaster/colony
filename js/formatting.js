function format_value(decimal) {
    if (decimal.lt('1000000')) {
        return decimal.toFixed(0, Decimal.ROUND_DOWN);
    }

    var exponent_suffix = decimal.e;

    var mantissa = decimal.div(new Decimal(10).pow(exponent_suffix));
    mantissa = mantissa.toFixed(2, Decimal.ROUND_DOWN);

    return mantissa + " &times; 10<sup>" + exponent_suffix + "</sup>";
}