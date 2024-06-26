function format_value(decimal) {
    if (decimal.abs().lt('1000000')) {
        return decimal.toFixed(0, Decimal.ROUND_DOWN);
    }

    var exponent_suffix = decimal.e;
    var mantissa = decimal.div(new Decimal(10).pow(exponent_suffix));
    mantissa = mantissa.toFixed(2, Decimal.ROUND_DOWN);
    return mantissa + " &times; 10<sup>" + exponent_suffix + "</sup>";
}

function format_value_with_decimal(decimal) {
    if (decimal.abs().gte('1000')) {
        return format_value(decimal);
    }

    if (decimal.abs().eq('0')) {
        return "0";
    }

    if (decimal.abs().lt('0.001')) {
        var exponent_suffix = decimal.e;
        var mantissa = decimal.div(new Decimal(10).pow(exponent_suffix));
        mantissa = mantissa.toFixed(2, Decimal.ROUND_DOWN);
        return mantissa + " &times; 10<sup>" + exponent_suffix + "</sup>";
    }

    return decimal.toFixed(2, Decimal.ROUND_DOWN);
}