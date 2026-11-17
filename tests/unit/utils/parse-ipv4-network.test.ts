import { describe, it, expect } from 'vitest';
import { parseIPv4Network } from '$lib/utils/ip-validation';

describe('parseIPv4Network', () => {
  it('parses CIDR prefix notation', () => {
    expect(parseIPv4Network('192.168.1.0/24')).toEqual({ valid: true, ip: '192.168.1.0', prefix: 24 });
  });

  it('parses dotted subnet mask notation', () => {
    expect(parseIPv4Network('192.168.1.0/255.255.255.0')).toEqual({ valid: true, ip: '192.168.1.0', prefix: 24 });
    expect(parseIPv4Network('10.0.0.5 255.255.240.0')).toEqual({ valid: true, ip: '10.0.0.5', prefix: 20 });
    expect(parseIPv4Network('10.0.0.0/0.0.0.0').prefix).toBe(0);
    expect(parseIPv4Network('1.2.3.4/255.255.255.255').prefix).toBe(32);
  });

  it('rejects invalid input', () => {
    expect(parseIPv4Network('1.2.3.4/255.0.255.0').valid).toBe(false);
    expect(parseIPv4Network('1.2.3.4/33').valid).toBe(false);
    expect(parseIPv4Network('1.2.3.4/').valid).toBe(false);
    expect(parseIPv4Network('1.2.3.4/24x').valid).toBe(false);
    expect(parseIPv4Network('300.1.1.1/24').valid).toBe(false);
    expect(parseIPv4Network('').valid).toBe(false);
  });
});
