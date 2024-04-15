import {expect} from 'chai';
import {getRuleLevel} from '../src/rules.js';
import * as sinon from 'sinon';
import { SinonSpy } from 'sinon';

describe('Levels config', () => {
  it('name to number', () => {
    [
      ['off', 0],
      ['warn', 1],
      ['error', 2],
    ].forEach(([val, expected]) => expect(getRuleLevel(val, 'foo-bar')).to.be.equals(expected));
  });

  it('number as string to number', () => {
    [
      ['0', 0],
      ['1', 1],
      ['2', 2],
    ].forEach(([val, expected]) => expect(getRuleLevel(val, 'foo-bar')).to.be.equals(expected));
  });

  it('number to number', () => {
    [
      0,
      1,
      2,
    ].forEach((val) => expect(getRuleLevel(val, 'foo-bar')).to.be.equals(val));
  });

  it('unexpected value', () => {
    [
      [-5, 'pure-number-rule'],
      ['3', 'str-number-rule'],
      ['foo', 'string-rule'],
    ].map(([val, rule]: [string | number, string]) => expect(() => getRuleLevel(val, rule)).to.throws(`Unknown level ${val} for ${rule}.`));
  });

  describe('deprecations', () => {
    beforeEach(() => {
      console.warn = sinon.fake();
    });

    it('on as error', () => {
      expect(getRuleLevel('on', 'foo-bar')).to.be.equals(2);

      sinon.assert.calledOnce(console.warn as SinonSpy);
    });
  });
});
