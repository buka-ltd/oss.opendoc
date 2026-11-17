import { Operator } from '~/constants/operator.enum'


export function encodeReserved(str: string): string {
  return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
    if (!/^%[0-9A-Fa-f]{2}$/.test(part)) {
      part = encodeURI(part)
        .replace(/%5B/g, '[')
        .replace(/%5D/g, ']')
    }
    return part
  })
    .join('')
}

export function encodeUnreserved(str: string): string {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16)
      .toUpperCase()
  })
}

/**
 * Encodes a variable name per RFC 6570: unreserved characters and valid
 * percent-encoded triplets pass through unchanged, everything else is
 * percent-encoded.
 */
export function encodeName(str: string): string {
  return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
    return /^%[0-9A-Fa-f]{2}$/.test(part) ? part : encodeUnreserved(part)
  })
    .join('')
}

export function encodeValue(operator: Operator, value: string, key?: string): string {
  value = (operator === Operator.PLUS || operator === Operator.HASH)
    ? encodeReserved(value)
    : encodeUnreserved(value)

  if (key) {
    return encodeName(key) + '=' + value
  } else {
    return value
  }
}

